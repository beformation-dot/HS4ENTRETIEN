const encoder = new TextEncoder();

export type Account = {
  username: string;
  label: string;
  salt: string;
  hash: string;
  updatedAt: string;
};

export function normalizeUsername(raw: string) {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

function bytesToB64(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

function b64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function derive(password: string, salt: Uint8Array) {
  const saltCopy = new Uint8Array(salt.byteLength);
  saltCopy.set(salt);
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltCopy, iterations: 60000, hash: "SHA-256" },
    key,
    256,
  );
  return bytesToB64(new Uint8Array(bits));
}

export async function createAccount(label: string, password: string): Promise<Account> {
  const username = normalizeUsername(label);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    username,
    label: label.trim(),
    salt: bytesToB64(salt),
    hash: await derive(password, salt),
    updatedAt: new Date().toISOString(),
  };
}

export async function passwordMatches(account: Account, password: string) {
  const hash = await derive(password, b64ToBytes(account.salt));
  return hash === account.hash;
}
