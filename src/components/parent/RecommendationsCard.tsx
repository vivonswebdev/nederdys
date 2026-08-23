import { SubjectStat } from "@/lib/parent";
import { tierForXp } from "@/lib/gamification";

interface Props {
  stats: SubjectStat[];
  streak: number;
  childName: string;
}

export const RecommendationsCard = ({ stats, streak, childName }: Props) => {
  const by = (s: string) => stats.find((x) => x.subject === s)!;
  const nl = by("nl");
  const fr = by("fr");
  const math = by("math");
  const messages: string[] = [];

  if (nl.xp >= 500) messages.push("✅ Excellente progression en néerlandais !");
  else if (nl.sessions > 0)
    messages.push(`✅ ${childName} a joué ${nl.sessions} partie(s) en néerlandais.`);

  if (math.sessions < 3)
    messages.push(`⚠️ Les mathématiques sont peu jouées (${math.sessions} session(s) cette période).`);
  if (fr.sessions < 3)
    messages.push(`⚠️ Le français mérite un peu plus d'attention (${fr.sessions} session(s)).`);

  const weakest = [...stats].sort((a, b) => a.sessions - b.sessions)[0];
  const labels: Record<string, string> = { nl: "néerlandais", fr: "français", math: "mathématiques" };
  messages.push(`💡 Suggestion : proposer un jeu de ${labels[weakest.subject]} après l'école.`);

  if (streak < 3)
    messages.push(`🔥 Série actuelle : ${streak} jour(s). Une courte session quotidienne aide beaucoup.`);
  else messages.push(`🔥 Belle régularité : ${streak} jours d'affilée !`);

  const tier = tierForXp(nl.xp);
  if (tier.max !== Infinity)
    messages.push(
      `🎯 Objectif : atteindre le niveau ${tier.level + 1} en néerlandais (${tier.max - nl.xp} XP restants).`
    );

  const lowAccuracy = stats.filter((s) => s.sessions >= 3 && s.successRate < 60);
  for (const s of lowAccuracy)
    messages.push(`📉 Taux de réussite de ${s.successRate}% en ${labels[s.subject]} : baisser la difficulté peut aider.`);

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <h2 className="font-semibold text-foreground mb-3">Recommandations</h2>
      <ul className="space-y-2">
        {messages.map((m, i) => (
          <li key={i} className="text-sm text-foreground leading-relaxed">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
};
