import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAccount, normalizeUsername } from "@/lib/accounts";
import { useSession } from "@/lib/session";
import { useGarage } from "@/lib/store";

export function UsersPanel({ plain = false }: { plain?: boolean }) {
  const accounts = useGarage((s) => s.accounts ?? []);
  const saveAccount = useGarage((s) => s.saveAccount);
  const deleteAccount = useGarage((s) => s.deleteAccount);
  const current = useSession((s) => s.username);
  const me = accounts.find((account) => account.username === current);
  const isAdmin = Boolean(me?.admin);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <section
      className={
        plain
          ? "bg-card pr-8"
          : "mt-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
      }
    >
      <h2 className="text-2xl">Utilisateurs</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {isAdmin
          ? "Vous êtes administrateur : vous ajoutez et retirez les comptes."
          : "Seul l'administrateur ajoute ou retire un compte."}
      </p>
      <ul className="mt-4 divide-y divide-border">
        {accounts.map((account) => (
          <li key={account.username} className="flex items-center justify-between gap-3 py-2">
            <span>
              {account.label}
              {account.admin ? (
                <span className="ml-2 text-sm text-muted-foreground">administrateur</span>
              ) : null}
              {account.username === current ? (
                <span className="ml-2 text-sm text-muted-foreground">vous</span>
              ) : null}
            </span>
            {isAdmin && !account.admin ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (window.confirm(`Retirer ${account.label} ?`)) deleteAccount(account.username);
                }}
              >
                Retirer
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
      {isAdmin ? (
      <form
        className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
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
          if (accounts.some((account) => account.username === username)) {
            setError("Cet identifiant existe déjà.");
            return;
          }
          setBusy(true);
          void createAccount(name, password)
            .then((account) => {
              saveAccount(account);
              setName("");
              setPassword("");
            })
            .finally(() => setBusy(false));
        }}
      >
        <label className="grid gap-1.5 text-sm font-medium">
          Nouvel identifiant
          <Input value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Mot de passe
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
        </label>
        <Button type="submit" disabled={busy}>
          Ajouter
        </Button>
        {error ? <p className="text-sm text-muted-foreground sm:col-span-3">{error}</p> : null}
      </form>
      ) : null}
    </section>
  );
}
