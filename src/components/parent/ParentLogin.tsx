import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { resetPinToDefault, startParentSession, verifyPin, DEFAULT_PIN } from "@/lib/parent";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

export const ParentLogin = ({ onSuccess }: Props) => {
  const { user } = useAuth();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const [busy, setBusy] = useState(false);

  const locked = lockedUntil !== null && lockedUntil > new Date();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || busy || locked) return;
    if (pin.length !== 4) {
      setError("Le code doit contenir 4 chiffres.");
      return;
    }
    setBusy(true);
    const res = await verifyPin(user.id, pin);
    setBusy(false);
    if (res.ok === true) {
      startParentSession();
      onSuccess();
    } else if (res.reason === "locked") {
      setPin("");
      setLockedUntil(new Date(res.until));
      setError("Trop de tentatives. Réessayez dans 5 minutes.");
    } else {
      setPin("");
      setError(`Code incorrect. ${res.attemptsLeft} tentative(s) restante(s).`);
    }
  };

  const forgot = async () => {
    if (!user) return;
    await resetPinToDefault(user.id);
    setLockedUntil(null);
    setError(null);
    toast.success(`Code réinitialisé à ${DEFAULT_PIN}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
        <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-sm w-full">
          <h1 className="text-2xl font-bold text-foreground mb-4">Espace Parents</h1>
          <p className="text-muted-foreground mb-6">Connectez-vous pour accéder au suivi.</p>
          <Link to="/auth">
            <Button className="w-full">Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <form
        onSubmit={submit}
        className="bg-card border border-border rounded-2xl p-8 shadow-sm max-w-sm w-full"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-primary/10 rounded-full p-3 mb-3">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Espace Parents</h1>
          <p className="text-sm text-muted-foreground mt-1">Entrez votre code à 4 chiffres</p>
        </div>

        <Input
          type="password"
          inputMode="numeric"
          maxLength={4}
          autoFocus
          value={pin}
          disabled={locked}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
            setError(null);
          }}
          className="text-center text-2xl tracking-[0.6em] tabular-nums h-14"
          aria-label="Code PIN parent"
        />

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-destructive mt-3">
            <ShieldAlert className="w-4 h-4" /> {error}
          </p>
        )}

        <Button type="submit" className="w-full mt-5" disabled={busy || locked}>
          Valider
        </Button>

        <button
          type="button"
          onClick={forgot}
          className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground underline"
        >
          Mot de passe oublié ?
        </button>

        <Link
          to="/enfant"
          className="block text-center mt-6 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Retour à l'app enfant
        </Link>
      </form>
    </div>
  );
};
