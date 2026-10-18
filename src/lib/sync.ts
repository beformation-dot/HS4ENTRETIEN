import { create } from "zustand";
import { useGarage } from "@/lib/store";
import type { Account } from "@/lib/accounts";
import type { Inspection, Vehicle } from "@/lib/types";

const CODE_KEY = "atelier-hs4-sync-code";
const BROKER = "wss://broker.hivemq.com:8884/mqtt";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export type SyncSnapshot = {
  v: 1;
  vehicle: Vehicle;
  vehicleUpdatedAt: string;
  inspections: Inspection[];
  tombstones: Record<string, string>;
  accounts: Account[];
  accountTombstones: Record<string, string>;
  updatedAt: string;
};

type Phase = "off" | "connecting" | "live" | "error";

type SyncUi = {
  code: string;
  phase: Phase;
  message: string;
};

export const useSyncUi = create<SyncUi>(() => ({
  code: "",
  phase: "off",
  message: "",
}));

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function setUi(patch: Partial<SyncUi>) {
  useSyncUi.setState(patch);
}

export function normalizeCode(input: string) {
  const fromUrl = input.match(/sync=([A-Za-z0-9-]+)/);
  const raw = (fromUrl?.[1] ?? input).toUpperCase().replace(/[^A-Z0-9]/g, "");
  const body = raw.startsWith("HS4") ? raw.slice(3) : raw;
  if (body.length < 8) return "";
  const chars = body.slice(0, 8);
  return `HS4-${chars.slice(0, 4)}-${chars.slice(4)}`;
}

export function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join("");
  return `HS4-${chars.slice(0, 4)}-${chars.slice(4)}`;
}

function localSnapshot(): SyncSnapshot {
  const s = useGarage.getState();
  return {
    v: 1,
    vehicle: s.vehicle,
    vehicleUpdatedAt: s.vehicleUpdatedAt ?? "",
    inspections: s.inspections,
    tombstones: s.tombstones ?? {},
    accounts: s.accounts ?? [],
    accountTombstones: s.accountTombstones ?? {},
    updatedAt: s.dataUpdatedAt ?? "",
  };
}

export function mergeSnapshots(a: SyncSnapshot, b: SyncSnapshot): SyncSnapshot {
  const aVehicle = a.vehicleUpdatedAt || "";
  const bVehicle = b.vehicleUpdatedAt || "";
  const vehicleIsA = aVehicle >= bVehicle;
  const tombstones: Record<string, string> = {};
  for (const src of [a.tombstones ?? {}, b.tombstones ?? {}]) {
    for (const [id, at] of Object.entries(src)) {
      if (!tombstones[id] || at > tombstones[id]) tombstones[id] = at;
    }
  }
  const byId = new Map<string, Inspection>();
  for (const item of [...(b.inspections ?? []), ...(a.inspections ?? [])]) {
    const prev = byId.get(item.id);
    if (!prev || (item.updatedAt || "") >= (prev.updatedAt || "")) byId.set(item.id, item);
  }
  const inspections = [...byId.values()]
    .filter((item) => {
      const tomb = tombstones[item.id];
      return !tomb || tomb < (item.updatedAt || "");
    })
    .sort((x, y) => (y.updatedAt || "").localeCompare(x.updatedAt || ""));
  const accountTombstones: Record<string, string> = {};
  for (const src of [a.accountTombstones ?? {}, b.accountTombstones ?? {}]) {
    for (const [id, at] of Object.entries(src)) {
      if (!accountTombstones[id] || at > accountTombstones[id]) accountTombstones[id] = at;
    }
  }
  const byName = new Map<string, Account>();
  for (const item of [...(b.accounts ?? []), ...(a.accounts ?? [])]) {
    const prev = byName.get(item.username);
    if (!prev || (item.updatedAt || "") >= (prev.updatedAt || "")) byName.set(item.username, item);
  }
  const accounts = [...byName.values()].filter((item) => {
    const tomb = accountTombstones[item.username];
    return !tomb || tomb < (item.updatedAt || "");
  });
  return {
    v: 1,
    vehicle: vehicleIsA ? a.vehicle : b.vehicle,
    vehicleUpdatedAt: vehicleIsA ? a.vehicleUpdatedAt : b.vehicleUpdatedAt,
    inspections,
    tombstones,
    accounts,
    accountTombstones,
    updatedAt: (a.updatedAt || "") >= (b.updatedAt || "") ? a.updatedAt : b.updatedAt,
  };
}

function contentKey(s: SyncSnapshot) {
  const inspections = [...s.inspections].sort((a, b) => a.id.localeCompare(b.id));
  const tombstones = Object.fromEntries(Object.entries(s.tombstones ?? {}).sort(([a], [b]) => a.localeCompare(b)));
  const accounts = [...(s.accounts ?? [])].sort((a, b) => a.username.localeCompare(b.username));
  const accountTombstones = Object.fromEntries(
    Object.entries(s.accountTombstones ?? {}).sort(([a], [b]) => a.localeCompare(b)),
  );
  return JSON.stringify({
    vehicle: s.vehicle,
    vehicleUpdatedAt: s.vehicleUpdatedAt,
    inspections,
    tombstones,
    accounts,
    accountTombstones,
  });
}

async function digest(label: string, code: string) {
  return crypto.subtle.digest("SHA-256", encoder.encode(`${label}:${code}`));
}

async function topicFor(code: string) {
  const bytes = new Uint8Array(await digest("topic", code));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `atelierhs4/${hex.slice(0, 24)}`;
}

function bytesToB64(bytes: Uint8Array) {
  let binary = "";
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    binary += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return btoa(binary);
}

function b64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function encrypt(code: string, payload: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey("raw", await digest("aes", code), "AES-GCM", false, ["encrypt"]);
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(payload)),
  );
  const out = new Uint8Array(iv.length + cipher.length);
  out.set(iv, 0);
  out.set(cipher, iv.length);
  return bytesToB64(out);
}

async function decrypt(code: string, payload: string) {
  const bytes = b64ToBytes(payload);
  const iv = bytes.slice(0, 12);
  const cipher = bytes.slice(12);
  const key = await crypto.subtle.importKey("raw", await digest("aes", code), "AES-GCM", false, ["decrypt"]);
  const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
  return decoder.decode(clear);
}

let users = 0;
let client: import("mqtt").MqttClient | null = null;
let currentCode = "";
let applying = false;
let pushTimer = 0;
let waitTimer = 0;
let seen = "";
let unsub = () => {};
let cancelHydration = () => {};

function applySnapshot(snapshot: SyncSnapshot) {
  const merged = mergeSnapshots(localSnapshot(), snapshot);
  const mergedKey = contentKey(merged);
  const remoteKey = contentKey(snapshot);
  if (mergedKey !== contentKey(localSnapshot())) {
    applying = true;
    useGarage.getState().replaceSynced({
      vehicle: merged.vehicle,
      vehicleUpdatedAt: merged.vehicleUpdatedAt,
      inspections: merged.inspections,
      tombstones: merged.tombstones,
      accounts: merged.accounts ?? [],
      accountTombstones: merged.accountTombstones ?? {},
      dataUpdatedAt: merged.updatedAt || new Date().toISOString(),
    });
    applying = false;
  }
  seen = mergedKey;
  if (mergedKey !== remoteKey) void publish(merged);
  else setUi({ phase: "live", message: "Synchronisé" });
}

async function publish(snapshot: SyncSnapshot) {
  if (!client || !currentCode) return;
  setUi({ phase: "connecting", message: "Envoi…" });
  const body = await encrypt(currentCode, JSON.stringify(snapshot));
  await client.publishAsync(await topicFor(currentCode), body, { qos: 1, retain: true });
  seen = contentKey(snapshot);
  setUi({ phase: "live", message: "Synchronisé" });
}

function schedulePush() {
  window.clearTimeout(pushTimer);
  pushTimer = window.setTimeout(() => {
    const snapshot = localSnapshot();
    if (contentKey(snapshot) === seen) return;
    void publish(snapshot).catch(() => setUi({ phase: "error", message: "Échec de l'envoi" }));
  }, 700);
}

async function connect(code: string) {
  currentCode = code;
  window.clearTimeout(waitTimer);
  client?.end(true);
  setUi({ code, phase: "connecting", message: "Connexion…" });
  const imported = await import("mqtt");
  const mqtt =
    typeof (imported as { connectAsync?: unknown }).connectAsync === "function"
      ? imported
      : (imported as unknown as { default: typeof imported }).default;
  const next = await mqtt.connectAsync(BROKER, {
    clientId: `hs4${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
    reconnectPeriod: 4000,
    connectTimeout: 8000,
    clean: true,
  });
  if (currentCode !== code) {
    next.end(true);
    return;
  }
  client = next;
  next.on("error", () => setUi({ phase: "error", message: "Pas de réseau" }));
  next.on("message", (_topic, buf) => {
    void (async () => {
      try {
        const snapshot = JSON.parse(await decrypt(code, buf.toString())) as SyncSnapshot;
        if (!snapshot || snapshot.v !== 1) return;
        applySnapshot(snapshot);
      } catch {
        setUi({ phase: "error", message: "Code incorrect" });
      }
    })();
  });
  await next.subscribeAsync(await topicFor(code), { qos: 1 });
  waitTimer = window.setTimeout(() => {
    if (seen) return;
    void publish(localSnapshot()).catch(() => setUi({ phase: "error", message: "Échec de l'envoi" }));
  }, 2500);
}

function remember(code: string) {
  localStorage.setItem(CODE_KEY, code);
  setUi({ code });
}

export async function createLink() {
  const code = generateCode();
  remember(code);
  await connect(code);
  await publish(localSnapshot());
  return code;
}

export async function joinLink(input: string) {
  const code = normalizeCode(input);
  if (!code) throw new Error("code");
  remember(code);
  await connect(code);
  return code;
}

export function stopLink() {
  window.clearTimeout(pushTimer);
  window.clearTimeout(waitTimer);
  currentCode = "";
  seen = "";
  localStorage.removeItem(CODE_KEY);
  client?.end(true);
  client = null;
  setUi({ code: "", phase: "off", message: "" });
}

export function startSync() {
  users += 1;
  if (users === 1 && typeof window !== "undefined") {
    const fromUrl = new URLSearchParams(window.location.search).get("sync");
    if (fromUrl) {
      const code = normalizeCode(fromUrl);
      if (code) localStorage.setItem(CODE_KEY, code);
      const url = new URL(window.location.href);
      url.searchParams.delete("sync");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
    const code = localStorage.getItem(CODE_KEY) ?? "";
    const boot = () => {
      if (!code) return;
      setUi({ code, phase: "connecting", message: "Connexion…" });
      void connect(code).catch(() => setUi({ phase: "error", message: "Pas de réseau" }));
    };
    if (useGarage.getState().hydrated) boot();
    else {
      cancelHydration = useGarage.subscribe((state) => {
        if (!state.hydrated) return;
        cancelHydration();
        cancelHydration = () => {};
        boot();
      });
    }
    unsub = useGarage.subscribe((state, prev) => {
      if (!currentCode || applying || !state.hydrated) return;
      if (state.dataUpdatedAt === prev.dataUpdatedAt) return;
      schedulePush();
    });
  }
  return () => {
    users -= 1;
    if (users > 0) return;
    unsub();
    unsub = () => {};
    cancelHydration();
    cancelHydration = () => {};
    window.clearTimeout(pushTimer);
    window.clearTimeout(waitTimer);
    client?.end(true);
    client = null;
  };
}
