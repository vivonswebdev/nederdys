import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MistakeRow,
  fetchMistakes,
  findExercise,
  markMistakeResolved,
} from "@/lib/mistakes";
import { LEVEL_EMOJI, LEVEL_LABEL, Difficulty } from "@/lib/chapters";

export default function ReviewPage() {
  const { id: childId = "" } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState<MistakeRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!childId) return;
    fetchMistakes(childId).then((data) => {
      setRows(data);
      setLoading(false);
    });
  }, [childId]);

  const groups = useMemo(() => {
    const map = new Map<string, MistakeRow[]>();
    rows.forEach((r) => {
      const list = map.get(r.chapter_id) ?? [];
      list.push(r);
      map.set(r.chapter_id, list);
    });
    return [...map.entries()];
  }, [rows]);

  const resolve = async (id: string) => {
    const ok = await markMistakeResolved(id);
    if (!ok) return toast.error("Impossible d'enregistrer, réessaie plus tard.");
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast.success("Super, cette erreur est corrigée ! 💚");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <button
          onClick={() => navigate(`/child/${childId}`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> <BilingualText {...biFromFr("Retour")} />
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-1">🔁 Réviser</h1>
        <p className="font-dyslexic text-muted-foreground mb-6">
          <BilingualText {...biFromFr("Voici les réponses que tu n'as pas encore réussies, avec les étapes pour comprendre.")} />
        </p>

        {loading && <p className="font-dyslexic text-muted-foreground"><BilingualText {...biFromFr("Chargement…")} /></p>}

        {!loading && rows.length === 0 && (
          <div className="bg-card border-4 border-border rounded-3xl p-8 text-center kids-shadow-card">
            <span className="text-5xl block mb-3">🌟</span>
            <p className="font-dyslexic text-foreground">
              <BilingualText {...biFromFr("Aucune erreur à réviser pour l'instant. Continue comme ça !")} />
            </p>
            <Button className="mt-4" onClick={() => navigate(`/child/${childId}/jeux`)}>
              <BilingualText {...biFromFr("Aller jouer")} />
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {groups.map(([chapterId, list]) => {
            const { chapter } = findExercise(chapterId, list[0].exercise_id);
            const subject = chapter?.subject ?? list[0].subject;
            return (
              <section
                key={chapterId}
                className="bg-card border-4 border-border rounded-3xl p-5 kids-shadow-card"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-xl font-bold text-foreground">
                    {chapter?.emoji ?? "📚"} {chapter?.name ?? chapterId}
                  </h2>
                  <Button asChild variant="secondary" size="sm">
                    <Link to={`/child/${childId}/${subject}/chapitre/${chapterId}`}>
                      <RefreshCw className="w-4 h-4 mr-1" /> <BilingualText {...biFromFr("Refaire")} />
                    </Link>
                  </Button>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {list.map((row) => {
                    const { exercise } = findExercise(row.chapter_id, row.exercise_id);
                    const steps = exercise?.steps ?? [];
                    return (
                      <AccordionItem
                        key={row.id}
                        value={row.id}
                        className="border-2 border-border rounded-2xl px-3"
                      >
                        <AccordionTrigger className="font-dyslexic text-left">
                          <span>
                            {row.question}
                            <span className="block text-xs text-muted-foreground mt-1">
                              {LEVEL_EMOJI[row.difficulty as Difficulty]}{" "}
                              {LEVEL_LABEL[row.difficulty as Difficulty]}
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="font-dyslexic space-y-3 pb-4">
                          <p className="text-sm">
                            <span className="text-muted-foreground"><BilingualText {...biFromFr("Ta réponse :")} /> </span>
                            <span className="font-bold text-destructive">
                              {row.given_answer || "—"}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground"><BilingualText {...biFromFr("Bonne réponse :")} /> </span>
                            <span className="font-bold text-primary">{row.correct_answer}</span>
                          </p>

                          {steps.length > 0 ? (
                            <div className="bg-muted rounded-2xl p-3">
                              <p className="font-bold text-sm mb-2">🧠 Les étapes :</p>
                              <ol className="space-y-2">
                                {steps.map((s, i) => (
                                  <li key={i} className="text-sm">
                                    <span className="font-bold">{i + 1}. {s.operation}</span>
                                    <span className="block text-muted-foreground">
                                      {s.description}
                                    </span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          ) : (
                            exercise?.visualAid && (
                              <p className="bg-muted rounded-2xl p-3 text-sm">{exercise.visualAid}</p>
                            )
                          )}

                          <Button size="sm" onClick={() => resolve(row.id)}>
                            <CheckCircle2 className="w-4 h-4 mr-1" /> <BilingualText {...biFromFr("J'ai compris")} />
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
