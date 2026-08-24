import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { supabase } from "@/integrations/supabase/client";
import { SiblingChallengeModal } from "@/components/child/SiblingChallengeModal";
import { GAMES } from "@/lib/games";
import { ALL_CHAPTERS } from "@/lib/chapters";

interface ChallengeRow {
  id: string;
  challenger_id: string;
  challenged_id: string;
  game_type: string | null;
  chapter_id: string | null;
  status: string;
  winner_id: string | null;
  challenger_session_id: string | null;
  challenged_session_id: string | null;
  xp_reward: number;
  created_at: string;
  challenger: { first_name: string; avatar_emoji: string } | null;
  challenged: { first_name: string; avatar_emoji: string } | null;
}

function activityLabel(c: ChallengeRow) {
  if (c.game_type) {
    const g = GAMES.find((x) => x.id === c.game_type);
    return g ? `${g.icon} ${g.route.replace("/jeu/", "")}` : c.game_type;
  }
  const ch = ALL_CHAPTERS.find((x) => x.id === c.chapter_id);
  return ch ? `${ch.emoji} ${ch.name}` : c.chapter_id ?? "";
}

function activityRoute(c: ChallengeRow, childId: string) {
  if (c.game_type) {
    const g = GAMES.find((x) => x.id === c.game_type);
    if (!g) return null;
    return g.subject === "math"
      ? `/child/${childId}/math/${g.route.replace("/jeu/", "")}`
      : g.route;
  }
  const ch = ALL_CHAPTERS.find((x) => x.id === c.chapter_id);
  if (!ch) return null;
  return `/child/${childId}/${ch.subject}/chapitre/${ch.id}`;
}

export default function SiblingChallenges() {
  const { id: childId = "" } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [challenges, setChallenges] = useState<ChallengeRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = useCallback(async () => {
    if (!childId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("sibling_challenges")
      .select(
        `*, challenger:children!sibling_challenges_challenger_id_fkey(first_name, avatar_emoji), challenged:children!sibling_challenges_challenged_id_fkey(first_name, avatar_emoji)`
      )
      .or(`challenger_id.eq.${childId},challenged_id.eq.${childId}`)
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setChallenges((data as unknown as ChallengeRow[]) ?? []);
    setLoading(false);
  }, [childId]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  async function validateSession(challengeId: string) {
    const { data, error } = await supabase.rpc("complete_sibling_challenge", {
      p_challenge_id: challengeId,
      p_child_id: childId,
      p_session_id: undefined,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    const res = data as { success: boolean; reason?: string; status?: string } | null;
    if (!res?.success) {
      if (res?.reason === "no_session") {
        toast.error("Joue d'abord une partie ! / Speel eerst een spel!");
      } else {
        toast.error("Impossible de valider / Kan niet valideren");
      }
      return;
    }
    toast.success(
      res.status === "completed"
        ? "Défi terminé ! / Uitdaging voltooid! 🏁"
        : "Partie enregistrée ! / Spel opgeslagen! ✅"
    );
    fetchChallenges();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8 space-y-6">
        <Link
          to={`/child/${childId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <BilingualText {...biFromFr("Retour")} />
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            🏆 <BilingualText {...biFromFr("Défis frères et sœurs")} />
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-5 py-3 font-bold min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <BilingualText {...biFromFr("Créer un défi")} />
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">…</p>
        ) : challenges.length === 0 ? (
          <div className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
            <BilingualText {...biFromFr("Aucun défi pour le moment")} />
          </div>
        ) : (
          <div className="space-y-3">
            {challenges.map((c) => {
              const iAmChallenger = c.challenger_id === childId;
              const mySession = iAmChallenger
                ? c.challenger_session_id
                : c.challenged_session_id;
              const route = activityRoute(c, childId);
              return (
                <div key={c.id} className="rounded-2xl border border-border p-4 bg-card space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{iAmChallenger ? "📤" : "📩"}</span>
                      <div>
                        <p className="font-bold">
                          {iAmChallenger
                            ? `Tu as défié ${c.challenged?.first_name ?? ""}`
                            : `${c.challenger?.first_name ?? ""} te défie !`}
                        </p>
                        <p className="text-sm text-muted-foreground">{activityLabel(c)}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {c.status === "pending"
                        ? "⏳"
                        : c.status === "completed"
                          ? "🏁"
                          : "❌"}
                    </span>
                  </div>

                  {c.status === "completed" && (
                    <p className="text-sm font-semibold">
                      {c.winner_id
                        ? c.winner_id === childId
                          ? "🥇 Tu as gagné ! / Je hebt gewonnen!"
                          : "🥈 Bien joué ! / Goed gespeeld!"
                        : "🤝 Égalité / Gelijkspel"}
                    </p>
                  )}

                  {c.status === "pending" && (
                    <div className="flex flex-wrap gap-2">
                      {route && (
                        <button
                          onClick={() => navigate(route)}
                          className="flex-1 min-w-[140px] rounded-xl bg-secondary text-secondary-foreground px-4 py-3 font-bold min-h-[44px]"
                        >
                          🎮 <BilingualText {...biFromFr("Relever le défi")} />
                        </button>
                      )}
                      <button
                        onClick={() => validateSession(c.id)}
                        className="flex-1 min-w-[140px] rounded-xl bg-primary text-primary-foreground px-4 py-3 font-bold min-h-[44px]"
                      >
                        ✅{" "}
                        <BilingualText
                          {...biFromFr(mySession ? "Améliorer ma partie" : "Valider ma partie")}
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showModal && (
          <SiblingChallengeModal
            activeChildId={childId}
            onClose={() => setShowModal(false)}
            onCreated={fetchChallenges}
          />
        )}
      </main>
    </div>
  );
}
