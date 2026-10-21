import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { speakTarget } from "@/lib/bilingual";

const phrases = [
  { nl: "Hallo! Hoe gaat het?", fr: "Bonjour ! Comment ça va ?" },
  { nl: "Ik heet Noor.", fr: "Je m’appelle Noor." },
  { nl: "Ik speel graag buiten.", fr: "J’aime jouer dehors." },
  { nl: "Mag ik met je spelen?", fr: "Est-ce que je peux jouer avec toi ?" },
  { nl: "Ja, natuurlijk!", fr: "Oui, bien sûr !" },
];

export default function SpeakingPracticePage() {
  const { id = "" } = useParams<{ id: string }>();
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const phrase = phrases[index];
  return <div className="min-h-screen bg-background"><Navbar /><main className="container max-w-2xl px-4 py-8">
    <Link to={`/child/${id}/nl/activiteiten`} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /><BilingualText fr="Retour aux activités" nl="Terug naar activiteiten" /></Link>
    <section className="rounded-[2rem] border-4 border-kids-green bg-gradient-to-br from-green-50 to-sky-50 p-6 text-center shadow-sm dark:from-green-950 dark:to-slate-900 sm:p-10">
      <div className="text-5xl" aria-hidden>🗣️</div><h1 className="mt-3 text-2xl font-black"><BilingualText fr="À toi de parler !" nl="Jij mag praten!" stacked /></h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground"><BilingualText fr="Écoute, répète à voix haute, puis passe à la phrase suivante. Ta voix n’est pas enregistrée." nl="Luister, zeg de zin hardop en ga dan verder. Je stem wordt niet opgenomen." stacked /></p>
      {done ? <div className="mt-8"><p className="text-xl font-bold"><BilingualText fr="Super entraînement ! 🎉" nl="Goed geoefend! 🎉" stacked /></p><button className="mt-4 min-h-12 rounded-2xl bg-primary px-6 font-bold text-primary-foreground" onClick={() => { setIndex(0); setDone(false); }}><BilingualText fr="Recommencer" nl="Opnieuw" /></button></div> : <div className="mt-8 rounded-3xl border-2 border-white bg-white/80 p-6 dark:border-slate-700 dark:bg-slate-900/80"><p className="mb-2 text-sm font-bold text-muted-foreground"><BilingualText fr={`Phrase ${index + 1} sur ${phrases.length}`} nl={`Zin ${index + 1} van ${phrases.length}`} /></p><p lang="nl" className="text-2xl font-black">{phrase.nl}</p><p className="mt-2 text-muted-foreground">{phrase.fr}</p><button onClick={() => speakTarget(phrase.nl)} className="mx-auto mt-5 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-sky-600 px-5 font-bold text-white"><Volume2 className="h-5 w-5" /><BilingualText fr="Écouter" nl="Luisteren" /></button><div><button onClick={() => index + 1 < phrases.length ? setIndex(index + 1) : setDone(true)} className="mt-5 min-h-12 rounded-2xl bg-primary px-6 font-bold text-primary-foreground"><BilingualText fr="Je l’ai répétée →" nl="Ik heb het gezegd →" /></button></div></div>}
    </section>
  </main></div>;
}
