import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAccount, normalizeUsername, passwordMatches } from "@/lib/accounts";
import { useSession } from "@/lib/session";
import { useGarage } from "@/lib/store";
import { joinLink, useSyncUi } from "@/lib/sync";

export function LoginScreen() {
  const accounts = useGarage((s) => s.accounts ?? []);
  const saveAccount = useGarage((s) => s.saveAccount);
  const phase = useSyncUi((s) => s.phase);
  const [waited, setWaited] = useState(false);
  const [hasCode, setHasCode] = useState(false);
  const [mode, setMode] = useState<"login" | "create" | "link">("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setHasCode(Boolean(localStorage.getItem("atelier-hs4-sync-code")));
    const timer = window.setTimeout(() => setWaited(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const waitingForAccounts = hasCode && accounts.length === 0 && !waited && phase !== "error";

  useEffect(() => {
    if (accounts.length === 0) setMode("create");
    else setMode("login");
  }, [accounts.length]);

  async function submit() {
    setError("");
    const username = normalizeUsername(name);
    if (username.length < 2) {
      setError("L'identifiant est trop court.");
      return;
    }
    if (password.length < 4) {
      setError("Le mot de passe doit avoir au moins 4 caractères.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "create" || accounts.length === 0) {
        if (password !== confirm) {
          setError("Les deux mots de passe ne sont pas identiques.");
          return;
        }
        if (accounts.some((account) => account.username === username)) {
          setError("Cet identifiant existe déjà.");
          return;
        }
        const account = await createAccount(name, password);
        saveAccount(account);
        useSession.getState().login(account.username);
        return;
      }
      const account = accounts.find((item) => item.username === username);
      if (!account || !(await passwordMatches(account, password))) {
        setError("Identifiant ou mot de passe incorrect.");
        return;
      }
      useSession.getState().login(account.username);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <Logo />
        <h1 className="mt-6 text-3xl">Connexion</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {accounts.length === 0
            ? "Créez le premier compte. Vous pourrez en ajouter d'autres ensuite."
            : "Entrez avec votre identifiant. Chaque personne a le sien."}
        </p>

        {waitingForAccounts ? (
          <p className="mt-6 text-sm text-muted-foreground">Recherche des comptes…</p>
        ) : mode === "link" ? (
          <form
            className="mt-6 grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              setError("");
              setBusy(true);
              void joinLink(code)
                .then(() => {
                  setHasCode(true);
                  setMode(accounts.length === 0 ? "create" : "login");
                })
                .catch(() => setError("Code incomplet."))
                .finally(() => setBusy(false));
            }}
          >
            <label className="grid gap-1.5 text-sm font-medium">
              Code de l'atelier
              <Input
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                placeholder="HS4-XXXX-XXXX"
                autoCapitalize="characters"
              />
            </label>
            {error ? <p className="text-sm text-muted-foreground">{error}</p> : null}
            <Button type="submit" disabled={busy}>
              Relier
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-2 hover:underline"
              onClick={() => setMode(accounts.length === 0 ? "create" : "login")}
            >
              Retour
            </button>
          </form>
        ) : (
          <form
            className="mt-6 grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
          >
            <label className="grid gap-1.5 text-sm font-medium">
              Identifiant
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="username"
                autoCapitalize="none"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Mot de passe
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === "create" ? "new-password" : "current-password"}
              />
            </label>
            {mode === "create" ? (
              <label className="grid gap-1.5 text-sm font-medium">
                Confirmer le mot de passe
                <Input
                  type="password"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  autoComplete="new-password"
                />
              </label>
            ) : null}
            {error ? <p className="text-sm text-muted-foreground">{error}</p> : null}
            <Button type="submit" disabled={busy}>
              {mode === "create" ? "Créer le compte" : "Entrer"}
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-2 hover:underline"
              onClick={() => {
                setError("");
                setMode("link");
              }}
            >
              J'ai déjà un code atelier
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
