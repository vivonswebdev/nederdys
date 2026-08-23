import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Users, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { ParentLogin } from "@/components/parent/ParentLogin";
import { isParentSessionActive, setParentSession } from "@/lib/pin";

interface Props {
  title: string;
  children: ReactNode;
}

export const ParentShell = ({ title, children }: Props) => {
  const { user, loading } = useAuth();
  const { children: kids, activeChild, setActiveChildId } = useChild();
  const navigate = useNavigate();
  const location = useLocation();
  const [unlocked, setUnlocked] = useState(() => isParentSessionActive());

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  // Vérifie l'expiration de la session toutes les 30 s
  useEffect(() => {
    const id = setInterval(() => {
      if (unlocked && !isParentSessionActive()) setUnlocked(false);
    }, 30_000);
    return () => clearInterval(id);
  }, [unlocked]);

  if (loading) return null;

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <ParentLogin onSuccess={() => setUnlocked(true)} />
      </main>
    );
  }

  const navItems = [
    { to: "/parent/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
    { to: "/parent/children", label: "Enfants", icon: Users },
    { to: "/parent/settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground" aria-label="Retour à l'accueil">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>

          {kids.length > 1 && (
            <select
              value={activeChild?.id ?? ""}
              onChange={(e) => setActiveChildId(e.target.value)}
              className="ml-2 bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground"
              aria-label="Choisir un enfant"
            >
              {kids.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.avatar_emoji} {c.first_name}
                </option>
              ))}
            </select>
          )}

          <nav className="ml-auto flex items-center gap-2">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg ${
                  location.pathname === n.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <n.icon className="w-4 h-4" /> {n.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setParentSession(false);
                setUnlocked(false);
              }}
            >
              <LogOut className="w-4 h-4" /> Verrouiller
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </main>
  );
};
