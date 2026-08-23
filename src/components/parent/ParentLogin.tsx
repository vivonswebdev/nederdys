import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ShieldAlert, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { hasPin, setPin as savePin, setParentSession, verifyPin } from "@/lib/pin";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

const digits = (v: string) => v.replace(/\D/g, "").slice(0, 4);

export const ParentLogin = ({ onSuccess }: Props) => {
  const { user } = useAuth();
  const [mode, setMode] = useState<"loading" | "verify" | "create">("loading");
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const [busy, setBusy] = useState(false);

  const locked = lockedUntil !== null && lockedUntil > new Date();

  useEffect(() => {
    if (!user) return;
    hasPin().then((exists) => setMode(exists ? "verify" : "create"));
  }, [user]);

  const submitVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || busy || locked) return;
    if (pin.length !== 4) return setError("Le code doit contenir 4 chiffres.");
    setBusy(true);
    const res = await verifyPin(pin);
    setBusy(false);
    setPin("");
    if (res.ok === true) {
      setParentSession(true);
      onSuccess();
    } else if (res.reason === "locked") {
      setLockedUntil(new Date(res.lockedUntil));
      setError(
        `Compte bloqué. Réessayez dans ${Math.max(
          1,
          Math.ceil((new Date(res.lockedUntil).getTime() - Date.now()) / 60_000)
        )} minute(s).`
      );
    } else if (res.reason === "wrong") {
      setError(
        `Code PIN incorrect. ${res.attemptsLeft} tentative(s) restante(s) — après 3 essais, attendez 5 minutes.`
      );
    } else if (res.reason === "no_pin") {
      setMode("create");
      setError(null);
    } else {
      setError("Vérification impossible. Réessayez.");
    }
  };

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || busy) return;
    if (pin.length !== 4) return setError("Le code doit contenir 4 chiffres.");
    if (pin !== confirm) return setError("Les deux codes ne correspondent pas.");
    setBusy(true);
    const res = await savePin(pin);
    setBusy(false);
    if (res.ok) {
      setParentSession(true);
      toast.success("Code PIN enregistré");
      onSuccess();
    } else {
      setError("Impossible d'enregistrer ce code.");
    }
  };

  if (!user) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-foreground mb-4">Espace Parents</h1>
        <p className="text-muted-foreground mb-6">Connectez-vous pour accéder au suivi.</p>
        <Link to="/auth">
          <Button className="w-full">Se connecter</Button>
        </Link>
      </div>
    );
  }

  if (mode === "loading") {
    return <p className="text-muted-foreground">Chargement…</p>;
  }

  const creating = mode === "create";

  return (
    <form
      onSubmit={creating ? submitCreate : submitVerify}
      className="bg-card border border-border rounded-2xl p-8 shadow-sm max-w-sm w-full"
    >
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="bg-primary/10 rounded-full p-3 mb-3">
          {creating ? (
            <KeyRound className="w-6 h-6 text-primary" />
          ) : (
            <Lock className="w-6 h-6 text-primary" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-foreground">Espace Parents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {creating
            ? "Choisissez votre code à 4 chiffres. Il protège l'accès au suivi."
            : "Entrez votre code à 4 chiffres"}
        </p>
      </div>

      <Input
        type="password"
        inputMode="numeric"
        maxLength={4}
        autoFocus
        value={pin}
        disabled={locked}
        onChange={(e) => {
          setPin(digits(e.target.value));
          setError(null);
        }}
        className="text-center text-2xl tracking-[0.6em] tabular-nums h-14"
        aria-label="Code PIN parent"
      />

      {creating && (
        <Input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={confirm}
          onChange={(e) => {
            setConfirm(digits(e.target.value));
            setError(null);
          }}
          className="text-center text-2xl tracking-[0.6em] tabular-nums h-14 mt-3"
          aria-label="Confirmer le code PIN"
          placeholder="••••"
        />
      )}

      {error && (
        <p className="flex items-center gap-1.5 text-sm text-destructive mt-3">
          <ShieldAlert className="w-4 h-4" /> {error}
        </p>
      )}

      <Button type="submit" className="w-full mt-5" disabled={busy || locked}>
        {creating ? "Enregistrer mon code" : "Valider"}
      </Button>

      {!creating && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Code oublié ? Déconnectez-vous puis réinitialisez votre mot de passe de compte : le code
          PIN se redéfinit depuis les paramètres parent.
        </p>
      )}

      <Link
        to="/enfant"
        className="block text-center mt-6 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Retour à l'app enfant
      </Link>
    </form>
  );
};
