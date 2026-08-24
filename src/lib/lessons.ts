import { ALL_CHAPTERS } from "@/lib/chapters";
import { GAMES } from "@/lib/games";

export type LessonSubject = "nl" | "math" | "fr";

export interface LessonSection {
  heading: string;
  headingNl?: string;
  content: string;
  contentNl?: string;
  example?: string;
  exampleNl?: string;
}

export interface Lesson {
  id: string;
  subject: LessonSubject;
  title: string;
  titleNl?: string;
  emoji: string;
  intro: string;
  introNl?: string;
  durationMin: number;
  sections: LessonSection[];
  /** Chapitre d'exercices existant (voir src/lib/chapters.ts). */
  linkedChapterId?: string;
  /** Jeux existants (voir src/lib/games.ts). */
  linkedGameIds?: string[];
}

export const LESSONS: Lesson[] = [
  /* ------------------------------- MATHS -------------------------------- */
  {
    id: "fractions-intro",
    subject: "math",
    title: "Les fractions",
    titleNl: "De breuken",
    emoji: "🍕",
    intro:
      "Une fraction, c'est une part d'un tout. On en voit tous les jours : une part de pizza, une moitié de pomme !",
    introNl:
      "Een breuk is een deel van een geheel. Je ziet ze elke dag: een stuk pizza, een halve appel!",
    durationMin: 12,
    sections: [
      {
        heading: "Qu'est-ce qu'une fraction ?",
        headingNl: "Wat is een breuk?",
        content:
          "Une fraction s'écrit avec deux nombres séparés par une barre. Le nombre du bas dit en combien de parts on a coupé. Le nombre du haut dit combien de parts on prend.",
        contentNl:
          "Een breuk schrijf je met twee getallen en een streepje. Het onderste getal zegt in hoeveel stukken je snijdt. Het bovenste getal zegt hoeveel stukken je neemt.",
        example: "1/2 veut dire : on a coupé en 2 parts, et on en prend 1.",
        exampleNl: "1/2 betekent: je snijdt in 2 stukken en je neemt er 1.",
      },
      {
        heading: "Comparer des fractions",
        headingNl: "Breuken vergelijken",
        content:
          "Plus le nombre du bas est grand, plus les parts sont petites — même si le nombre paraît plus grand !",
        contentNl:
          "Hoe groter het onderste getal, hoe kleiner de stukken — ook al lijkt het getal groter!",
        example: "1/8 est plus petit que 1/2, même si 8 est plus grand que 2.",
        exampleNl: "1/8 is kleiner dan 1/2, ook al is 8 groter dan 2.",
      },
      {
        heading: "Fractions égales à 1",
        headingNl: "Breuken gelijk aan 1",
        content:
          "Quand le nombre du haut est le même que celui du bas, on prend toutes les parts : c'est le tout, donc 1.",
        contentNl:
          "Als het bovenste getal gelijk is aan het onderste, neem je alle stukken: dat is het geheel, dus 1.",
        example: "4/4 = 1 pizza entière.",
        exampleNl: "4/4 = 1 hele pizza.",
      },
    ],
    linkedChapterId: "fractions-simples",
    linkedGameIds: ["puzzlenumerique", "bataillenombres"],
  },
  {
    id: "decimaux-intro",
    subject: "math",
    title: "Les nombres décimaux",
    titleNl: "De kommagetallen",
    emoji: "🔟",
    intro: "Un nombre décimal a une virgule. Il sert quand un nombre entier ne suffit pas.",
    introNl:
      "Een kommagetal heeft een komma. Je gebruikt het als een heel getal niet genoeg is.",
    durationMin: 10,
    sections: [
      {
        heading: "Avant et après la virgule",
        headingNl: "Voor en na de komma",
        content:
          "À gauche de la virgule : les unités entières. À droite : les dixièmes, puis les centièmes.",
        contentNl:
          "Links van de komma: de hele eenheden. Rechts: de tienden, dan de honderdsten.",
        example: "3,5 € = 3 euros et 5 dixièmes d'euro (50 centimes).",
        exampleNl: "3,5 € = 3 euro en 5 tienden euro (50 cent).",
      },
      {
        heading: "Comparer deux décimaux",
        headingNl: "Twee kommagetallen vergelijken",
        content:
          "On compare d'abord la partie entière. Si elle est égale, on compare les dixièmes, puis les centièmes.",
        contentNl:
          "Vergelijk eerst het hele deel. Is dat gelijk, vergelijk dan de tienden, dan de honderdsten.",
        example: "2,7 > 2,45 car 7 dixièmes > 4 dixièmes.",
        exampleNl: "2,7 > 2,45 want 7 tienden > 4 tienden.",
      },
    ],
    linkedChapterId: "nombres-decimaux",
    linkedGameIds: ["droitegraduee"],
  },
  {
    id: "additions-retenue-intro",
    subject: "math",
    title: "L'addition avec retenue",
    titleNl: "Optellen met onthouden",
    emoji: "➕",
    intro: "Quand une colonne dépasse 9, on garde une retenue pour la colonne suivante.",
    introNl:
      "Als een kolom meer dan 9 wordt, hou je een cijfer over voor de volgende kolom.",
    durationMin: 8,
    sections: [
      {
        heading: "Poser l'addition",
        headingNl: "De optelling schrijven",
        content: "On aligne les unités sous les unités, les dizaines sous les dizaines.",
        contentNl: "Zet eenheden onder eenheden, tientallen onder tientallen.",
        example: "27 + 45 : 7 et 5 sont dans la même colonne.",
        exampleNl: "27 + 45: 7 en 5 staan in dezelfde kolom.",
      },
      {
        heading: "Garder la retenue",
        headingNl: "Onthouden",
        content:
          "7 + 5 = 12. On écrit 2 et on garde 1 pour la colonne des dizaines.",
        contentNl: "7 + 5 = 12. Je schrijft 2 en houdt 1 over voor de tientallen.",
        example: "2 + 4 + 1 (retenue) = 7 → résultat : 72.",
        exampleNl: "2 + 4 + 1 (onthouden) = 7 → resultaat: 72.",
      },
    ],
    linkedChapterId: "additions-retenue",
    linkedGameIds: ["chronocalcul", "marathonmental"],
  },

  /* ----------------------------- NÉERLANDAIS ---------------------------- */
  {
    id: "de-of-het-intro",
    subject: "nl",
    title: "De ou het ?",
    titleNl: "De of het?",
    emoji: "🏷️",
    intro: "En néerlandais, chaque nom a son article : de ou het. On les apprend par cœur.",
    introNl: "In het Nederlands hoort bij elk woord een lidwoord: de of het. Die leer je uit het hoofd.",
    durationMin: 10,
    sections: [
      {
        heading: "Deux articles seulement",
        headingNl: "Maar twee lidwoorden",
        content:
          "Il n'y a que de et het. « De » est le plus fréquent : environ deux mots sur trois.",
        contentNl: "Er zijn alleen de en het. 'De' komt het vaakst voor: ongeveer twee op drie woorden.",
        example: "de man, de vrouw, het huis, het boek.",
        exampleNl: "de man, de vrouw, het huis, het boek.",
      },
      {
        heading: "Quelques repères utiles",
        headingNl: "Handige hulpjes",
        content:
          "Les diminutifs en -je prennent toujours het. Les pluriels prennent toujours de.",
        contentNl: "Verkleinwoorden op -je krijgen altijd het. Meervouden krijgen altijd de.",
        example: "het huisje, mais de huizen.",
        exampleNl: "het huisje, maar de huizen.",
      },
    ],
    linkedChapterId: "de-of-het",
    linkedGameIds: ["rouegenres", "trieur"],
  },
  {
    id: "pluriel-nl-intro",
    subject: "nl",
    title: "Le pluriel",
    titleNl: "Het meervoud",
    emoji: "➕",
    intro: "Pour parler de plusieurs choses, le mot néerlandais change de fin.",
    introNl: "Als je over meer dingen praat, verandert het einde van het woord.",
    durationMin: 9,
    sections: [
      {
        heading: "-en, la fin la plus fréquente",
        headingNl: "-en, het vaakste einde",
        content: "La plupart des noms ajoutent -en au pluriel.",
        contentNl: "De meeste woorden krijgen -en in het meervoud.",
        example: "boek → boeken, tafel → tafels ? Non : tafel → tafels (voir plus bas).",
        exampleNl: "boek → boeken.",
      },
      {
        heading: "-s après certaines fins",
        headingNl: "-s na bepaalde einden",
        content: "Les mots qui finissent par -el, -em, -en, -er, -je prennent -s.",
        contentNl: "Woorden op -el, -em, -en, -er, -je krijgen -s.",
        example: "tafel → tafels, meisje → meisjes.",
        exampleNl: "tafel → tafels, meisje → meisjes.",
      },
      {
        heading: "-eren, les exceptions",
        headingNl: "-eren, de uitzonderingen",
        content: "Quelques mots ajoutent -eren. Il faut les retenir un par un.",
        contentNl: "Een paar woorden krijgen -eren. Die leer je uit het hoofd.",
        example: "kind → kinderen, ei → eieren.",
        exampleNl: "kind → kinderen, ei → eieren.",
      },
    ],
    linkedChapterId: "pluriel-noms",
    linkedGameIds: ["magicienmots"],
  },
  {
    id: "getallen-intro",
    subject: "nl",
    title: "Les nombres 1-20",
    titleNl: "De getallen 1-20",
    emoji: "🔢",
    intro: "Compter en néerlandais est facile jusqu'à 20 : il y a une logique claire.",
    introNl: "Tellen in het Nederlands is makkelijk tot 20: er zit een duidelijke logica in.",
    durationMin: 8,
    sections: [
      {
        heading: "De 1 à 12 : à apprendre",
        headingNl: "Van 1 tot 12: uit het hoofd",
        content: "Ces nombres n'ont pas de règle, on les écoute et on les répète.",
        contentNl: "Deze getallen hebben geen regel, je luistert en herhaalt.",
        example: "een, twee, drie, vier, vijf, zes, zeven, acht, negen, tien, elf, twaalf.",
        exampleNl: "een, twee, drie, vier, vijf, zes, zeven, acht, negen, tien, elf, twaalf.",
      },
      {
        heading: "De 13 à 19 : + tien",
        headingNl: "Van 13 tot 19: + tien",
        content: "On dit le petit nombre, puis « tien ».",
        contentNl: "Je zegt het kleine getal en dan 'tien'.",
        example: "dertien, veertien, vijftien… negentien, puis twintig.",
        exampleNl: "dertien, veertien, vijftien… negentien, daarna twintig.",
      },
    ],
    linkedChapterId: "getallen-nl",
    linkedGameIds: ["oreille"],
  },

  /* ------------------------------- FRANÇAIS ----------------------------- */
  {
    id: "homophones-a-intro",
    subject: "fr",
    title: "Les homophones a / à",
    titleNl: "De homofonen a / à",
    emoji: "🪤",
    intro: "a et à se prononcent pareil, mais ne veulent pas dire la même chose.",
    introNl: "a en à klinken hetzelfde, maar betekenen niet hetzelfde.",
    durationMin: 8,
    sections: [
      {
        heading: "« a » est un verbe",
        headingNl: "'a' is een werkwoord",
        content: "C'est le verbe avoir. Astuce : on peut le remplacer par « avait ».",
        contentNl: "Het is het werkwoord avoir. Tip: je kan het vervangen door 'avait'.",
        example: "Il a un chien → Il avait un chien. ✔",
        exampleNl: "Il a un chien → Il avait un chien. ✔",
      },
      {
        heading: "« à » est une petite préposition",
        headingNl: "'à' is een voorzetsel",
        content: "Il indique le lieu, le moment ou l'appartenance. On ne peut pas dire « avait ».",
        contentNl: "Het geeft plaats, tijd of bezit aan. Je kan er geen 'avait' van maken.",
        example: "Je vais à l'école. (pas « je vais avait l'école »)",
        exampleNl: "Je vais à l'école.",
      },
    ],
    linkedChapterId: "homophones-fr",
    linkedGameIds: ["piegehomophones", "chasseurerreursfr"],
  },
  {
    id: "synonymes-intro",
    subject: "fr",
    title: "Les synonymes",
    titleNl: "De synoniemen",
    emoji: "📖",
    intro: "Un synonyme, c'est un mot différent qui veut dire presque la même chose.",
    introNl: "Een synoniem is een ander woord dat bijna hetzelfde betekent.",
    durationMin: 7,
    sections: [
      {
        heading: "À quoi ça sert ?",
        headingNl: "Waarvoor dient het?",
        content: "Les synonymes évitent de répéter toujours le même mot dans un texte.",
        contentNl: "Met synoniemen herhaal je niet steeds hetzelfde woord.",
        example: "content = joyeux = heureux.",
        exampleNl: "content = joyeux = heureux.",
      },
      {
        heading: "Et les contraires ?",
        headingNl: "En de tegenstellingen?",
        content: "Un contraire dit l'inverse. C'est l'autre façon de ranger les mots.",
        contentNl: "Een tegenstelling zegt het omgekeerde.",
        example: "grand ↔ petit, chaud ↔ froid.",
        exampleNl: "grand ↔ petit, chaud ↔ froid.",
      },
    ],
    linkedChapterId: "synonymes-fr",
    linkedGameIds: ["bullessynonymes", "jardinmots"],
  },
  {
    id: "phrase-intro",
    subject: "fr",
    title: "Construire une phrase",
    titleNl: "Een zin bouwen",
    emoji: "💬",
    intro: "Une phrase commence par une majuscule et se termine par un point.",
    introNl: "Een zin begint met een hoofdletter en eindigt met een punt.",
    durationMin: 9,
    sections: [
      {
        heading: "Qui fait quoi ?",
        headingNl: "Wie doet wat?",
        content: "Une phrase simple a un sujet (qui ?) et un verbe (fait quoi ?).",
        contentNl: "Een eenvoudige zin heeft een onderwerp (wie?) en een werkwoord (doet wat?).",
        example: "Le chat dort. → sujet : le chat, verbe : dort.",
        exampleNl: "Le chat dort. → onderwerp: le chat, werkwoord: dort.",
      },
      {
        heading: "La ponctuation",
        headingNl: "De leestekens",
        content: "Le point termine. Le point d'interrogation pose une question.",
        contentNl: "De punt sluit af. Het vraagteken stelt een vraag.",
        example: "Tu viens ? / Oui, je viens.",
        exampleNl: "Tu viens ? / Oui, je viens.",
      },
    ],
    linkedChapterId: "phrases-fr",
    linkedGameIds: ["batisseurphrases", "completehistoire"],
  },
];

export const LESSON_SUBJECTS: {
  id: LessonSubject;
  emoji: string;
  title: string;
  titleNl: string;
  cardClass: string;
}[] = [
  { id: "nl", emoji: "🇳🇱", title: "Néerlandais", titleNl: "Nederlands", cardClass: "border-kids-blue bg-kids-blue/20" },
  { id: "math", emoji: "🔢", title: "Mathématiques", titleNl: "Wiskunde", cardClass: "border-kids-orange bg-kids-orange/20" },
  { id: "fr", emoji: "🇫🇷", title: "Français", titleNl: "Frans", cardClass: "border-kids-green-dark bg-kids-green-light/40" },
];

export const lessonsBySubject = (subject: LessonSubject) =>
  LESSONS.filter((l) => l.subject === subject);

export const getLesson = (id?: string) => LESSONS.find((l) => l.id === id);

export const parseLessonSubject = (value?: string): LessonSubject | null =>
  value === "nl" || value === "fr" || value === "math" ? value : null;

/** Route du chapitre d'exercices lié (null si le chapitre n'existe pas). */
export function lessonChapterRoute(lesson: Lesson, childId: string): string | null {
  if (!lesson.linkedChapterId) return null;
  const chapter = ALL_CHAPTERS.find((c) => c.id === lesson.linkedChapterId);
  if (!chapter) return null;
  return `/child/${childId}/${lesson.subject}/chapitre/${chapter.id}`;
}

/** Jeux liés réellement présents dans le registre. */
export function lessonGames(lesson: Lesson) {
  return (lesson.linkedGameIds ?? [])
    .map((id) => GAMES.find((g) => g.id === id))
    .filter((g): g is (typeof GAMES)[number] => Boolean(g));
}
