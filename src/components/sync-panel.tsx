import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLink, joinLink, stopLink, useSyncUi } from "@/lib/sync";

export function SyncEngine() {
  useEffect(() => {
    let dead = false;
    let stop = () => {};
    void import("@/lib/sync").then((mod) => {
      if (dead) return;
      stop = mod.startSync();
    });
    return () => {
      dead = true;
      stop();
    };
  }, []);
  return null;
}

export function SyncPanel() {
  const code = useSyncUi((s) => s.code);
  const phase = useSyncUi((s) => s.phase);
  const message = useSyncUi((s) => s.message);
  const [draft, setDraft] = useState("");
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("atelier-hs4-sync-code") ?? "";
    if (saved) useSyncUi.setState((s) => (s.code ? s : { ...s, code: saved }));
  }, []);

  useEffect(() => {
    if (!code || typeof window === "undefined") return;
    const link = `${window.location.origin}/?sync=${code}`;
    let cancel = false;
    void import("qrcode").then((QR) =>
      QR.toDataURL(link, {
        margin: 1,
        width: 220,
        color: { dark: "#3a261c", light: "#f6ead8" },
      }).then((url) => {
        if (!cancel) setQr(url);
      }),
    );
    return () => {
      cancel = true;
    };
  }, [code]);

  return (
    <section className="mt-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
      <h2 className="text-2xl">PC et téléphone</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Les fiches, le kilométrage et les contrôles se recopient tout seuls
        entre les deux appareils.
      </p>

      {code ? (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          {qr ? (
            <img
              src={qr}
              alt="Code pour relier le téléphone"
              className="h-40 w-40 rounded-lg bg-[#f6ead8] p-2"
            />
          ) : null}
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Code à garder
            </p>
            <p className="mt-1 font-display text-3xl tracking-[0.08em]">{code}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {message || "Relié"}
              {phase === "error" ? "" : ". Le même code sur les deux appareils."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = `${window.location.origin}/?sync=${code}`;
                  void navigator.clipboard.writeText(link).then(() => {
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1500);
                  });
                }}
              >
                {copied ? "Copié" : "Copier le lien"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => stopLink()}>
                Arrêter
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-end">
          <Button
            onClick={() => {
              setError("");
              void createLink().catch(() => setError("Impossible de créer le lien."));
            }}
          >
            Créer le lien
          </Button>
          <Input
            placeholder="HS4-XXXX-XXXX"
            value={draft}
            onChange={(e) => setDraft(e.target.value.toUpperCase())}
            autoCapitalize="characters"
          />
          <Button
            variant="outline"
            onClick={() => {
              setError("");
              void joinLink(draft).catch(() => setError("Code incomplet."));
            }}
          >
            Relier
          </Button>
          {error ? <p className="text-sm text-muted-foreground sm:col-span-3">{error}</p> : null}
        </div>
      )}
    </section>
  );
}
