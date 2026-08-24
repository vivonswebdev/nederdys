import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/contexts/AuthContext";
import { ChildPrefs, useChildSettings } from "@/hooks/useChildSettings";

const OPTIONS: { key: keyof ChildPrefs; title: string; desc: string }[] = [
  { key: "dark_mode", title: "🌙 Mode nuit", desc: "Réduit la luminosité de l'écran" },
  { key: "dyslexic_font", title: "📖 Police OpenDyslexic", desc: "Plus facile à lire" },
  { key: "reduced_motion", title: "🎬 Mouvements réduits", desc: "Moins d'animations" },
  { key: "sound_effects", title: "🔊 Effets sonores", desc: "Activer les sons des jeux" },
];

const ChildSettingsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { children, loading } = useChild();
  const navigate = useNavigate();
  const { prefs, isLoading, toggle } = useChildSettings(id);

  const child = children.find((c) => c.id === id) ?? null;

  useEffect(() => {
    document.title = "Mes paramètres — NederDys";
  }, []);

  useEffect(() => {
    if (authLoading || loading) return;
    if (!user) navigate("/auth");
    else if (!child) navigate("/profils", { replace: true });
  }, [authLoading, loading, user, child, navigate]);

  if (!child) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-2xl px-4 py-8">
        <button
          onClick={() => navigate(`/child/${child.id}`)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> <BilingualText {...biFromFr("Retour")} />
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">⚙️ Mes paramètres</h1>
        <p className="text-muted-foreground font-dyslexic mb-6">
          Choisis ce qui t'aide le mieux à jouer, {child.first_name} !
        </p>

        <div className="space-y-3">
          {OPTIONS.map((opt) => {
            const active = prefs[opt.key];
            return (
              <div
                key={opt.key}
                className="flex items-center justify-between gap-4 bg-card border border-border rounded-3xl p-4 kids-shadow-card"
              >
                <div>
                  <p className="font-bold text-foreground">{opt.title}</p>
                  <p className="text-sm text-muted-foreground font-dyslexic">{opt.desc}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={active}
                  aria-label={opt.title}
                  disabled={isLoading}
                  onClick={() => toggle(opt.key)}
                  className={`shrink-0 w-16 h-9 rounded-full transition-colors relative ${
                    active ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-7 h-7 rounded-full bg-card shadow transition-all ${
                      active ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ChildSettingsPage;
