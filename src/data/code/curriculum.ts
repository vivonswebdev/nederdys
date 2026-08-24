import { Bilingual } from "@/lib/bilingual";

export interface CodeSlide {
  emoji: string;
  text: Bilingual;
  /** Petite astuce / exemple concret. */
  tip?: Bilingual;
}

export interface CodeQuizQuestion {
  id: number;
  question: Bilingual;
  options: Bilingual[];
  /** Index de la bonne réponse dans `options`. */
  answer: number;
}

export interface CodeEpisode {
  id: string;
  emoji: string;
  title: Bilingual;
  goal: Bilingual;
  slides: CodeSlide[];
  quiz: CodeQuizQuestion[];
}

export interface CodeTrack {
  id: string;
  emoji: string;
  ages: string;
  label: Bilingual;
  description: Bilingual;
  episodes: CodeEpisode[];
}

const b = (nl: string, fr: string): Bilingual => ({ nl, fr });

/* ------------------------------------------------------------------ */
/* PARCOURS 1 — Les tout-petits codeurs (5-7 ans)                      */
/* ------------------------------------------------------------------ */

const PETITS: CodeEpisode[] = [
  {
    id: "petits-1",
    emoji: "🤖",
    title: b("Wat is een computer?", "Qu'est-ce qu'un ordinateur ?"),
    goal: b("Je leert wat een computer doet.", "Tu découvres ce que fait un ordinateur."),
    slides: [
      { emoji: "💻", text: b("Een computer is een machine die opdrachten uitvoert.", "Un ordinateur est une machine qui exécute des ordres.") },
      { emoji: "🧠", text: b("De computer denkt niet zelf. Hij doet wat wij vragen.", "L'ordinateur ne pense pas tout seul. Il fait ce qu'on lui demande.") },
      { emoji: "⌨️", text: b("Wij geven opdrachten met het toetsenbord, de muis of het scherm.", "On donne des ordres avec le clavier, la souris ou l'écran."), tip: b("Een tablet is ook een computer!", "Une tablette est aussi un ordinateur !") },
      { emoji: "🔌", text: b("Zonder stroom werkt een computer niet.", "Sans électricité, un ordinateur ne fonctionne pas.") },
    ],
    quiz: [
      { id: 1, question: b("Wat doet een computer?", "Que fait un ordinateur ?"), options: [b("Hij voert opdrachten uit", "Il exécute des ordres"), b("Hij droomt", "Il rêve"), b("Hij eet", "Il mange")], answer: 0 },
      { id: 2, question: b("Denkt een computer helemaal zelf?", "Un ordinateur pense-t-il tout seul ?"), options: [b("Ja, altijd", "Oui, toujours"), b("Nee, wij geven opdrachten", "Non, c'est nous qui donnons les ordres")], answer: 1 },
      { id: 3, question: b("Is een tablet een computer?", "Une tablette est-elle un ordinateur ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 0 },
      { id: 4, question: b("Wat heeft een computer nodig om te werken?", "De quoi un ordinateur a-t-il besoin pour marcher ?"), options: [b("Water", "De l'eau"), b("Stroom", "De l'électricité"), b("Zand", "Du sable")], answer: 1 },
      { id: 5, question: b("Waarmee geef je een opdracht?", "Avec quoi donne-t-on un ordre ?"), options: [b("Met het toetsenbord", "Avec le clavier"), b("Met een vork", "Avec une fourchette")], answer: 0 },
    ],
  },
  {
    id: "petits-2",
    emoji: "👣",
    title: b("Stap voor stap: het algoritme", "Pas à pas : l'algorithme"),
    goal: b("Je leert opdrachten in de juiste orde zetten.", "Tu apprends à mettre les ordres dans le bon ordre."),
    slides: [
      { emoji: "📋", text: b("Een algoritme is een lijst stappen in de juiste orde.", "Un algorithme est une liste d'étapes dans le bon ordre.") },
      { emoji: "🥣", text: b("Voorbeeld: brood pakken, boter erop, opeten.", "Exemple : prendre le pain, mettre le beurre, manger."), tip: b("Verkeerde orde = het lukt niet!", "Mauvais ordre = ça ne marche pas !") },
      { emoji: "➡️", text: b("Een robot volgt de stappen exact zoals jij ze schrijft.", "Un robot suit les étapes exactement comme tu les écris.") },
      { emoji: "🔁", text: b("Als iets vaak terugkomt, herhaal je het: dat is een lus.", "Si quelque chose revient souvent, on le répète : c'est une boucle.") },
    ],
    quiz: [
      { id: 1, question: b("Wat is een algoritme?", "Qu'est-ce qu'un algorithme ?"), options: [b("Stappen in de juiste orde", "Des étapes dans le bon ordre"), b("Een soort snoep", "Une sorte de bonbon")], answer: 0 },
      { id: 2, question: b("Wat komt eerst: boter of brood pakken?", "Que fait-on d'abord : le beurre ou prendre le pain ?"), options: [b("Brood pakken", "Prendre le pain"), b("Boter", "Le beurre")], answer: 0 },
      { id: 3, question: b("Hoe volgt een robot je stappen?", "Comment un robot suit-il tes étapes ?"), options: [b("Precies zoals geschreven", "Exactement comme écrit"), b("Zoals hij wil", "Comme il veut")], answer: 0 },
      { id: 4, question: b("Hoe heet iets herhalen in code?", "Comment appelle-t-on une répétition en code ?"), options: [b("Een lus", "Une boucle"), b("Een bril", "Une lunette")], answer: 0 },
      { id: 5, question: b("Is de orde van de stappen belangrijk?", "L'ordre des étapes est-il important ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 0 },
    ],
  },
  {
    id: "petits-3",
    emoji: "🧩",
    title: b("Blokjes coderen", "Coder avec des blocs"),
    goal: b("Je begrijpt blokprogramma's zoals Scratch Junior.", "Tu comprends les programmes en blocs comme Scratch Junior."),
    slides: [
      { emoji: "🟦", text: b("Met blokjes klik je opdrachten aan elkaar.", "Avec des blocs, on clique les ordres l'un sur l'autre.") },
      { emoji: "🐱", text: b("Blok 'ga vooruit' laat je figuurtje lopen.", "Le bloc « avance » fait marcher ton personnage.") },
      { emoji: "↩️", text: b("Blok 'draai' verandert de richting.", "Le bloc « tourne » change la direction.") },
      { emoji: "🐞", text: b("Werkt het niet? Dan zoek je de fout: dat is debuggen.", "Ça ne marche pas ? Tu cherches l'erreur : c'est déboguer."), tip: b("Fouten maken hoort erbij!", "Se tromper fait partie du jeu !") },
    ],
    quiz: [
      { id: 1, question: b("Wat doe je met blokjes?", "Que fais-tu avec les blocs ?"), options: [b("Opdrachten aan elkaar klikken", "Assembler des ordres"), b("Tekenen met verf", "Peindre")], answer: 0 },
      { id: 2, question: b("Welk blok laat je figuur lopen?", "Quel bloc fait marcher le personnage ?"), options: [b("Ga vooruit", "Avance"), b("Slaap", "Dors")], answer: 0 },
      { id: 3, question: b("Wat doet het blok 'draai'?", "Que fait le bloc « tourne » ?"), options: [b("Verandert de richting", "Change la direction"), b("Maakt geluid", "Fait du bruit")], answer: 0 },
      { id: 4, question: b("Hoe heet fouten zoeken?", "Comment appelle-t-on chercher les erreurs ?"), options: [b("Debuggen", "Déboguer"), b("Dansen", "Danser")], answer: 0 },
      { id: 5, question: b("Is een fout maken erg?", "Est-ce grave de se tromper ?"), options: [b("Nee, zo leer je", "Non, c'est comme ça qu'on apprend"), b("Ja, heel erg", "Oui, très grave")], answer: 0 },
    ],
  },
  {
    id: "petits-4",
    emoji: "✨",
    title: b("Wat is kunstmatige intelligentie?", "C'est quoi l'intelligence artificielle ?"),
    goal: b("Je leert wat AI is, heel eenvoudig.", "Tu découvres l'IA très simplement."),
    slides: [
      { emoji: "🤖", text: b("AI is een computer die leert van veel voorbeelden.", "L'IA est un ordinateur qui apprend avec beaucoup d'exemples.") },
      { emoji: "🐶", text: b("Zie 1000 foto's van honden: dan herkent AI een hond.", "Avec 1000 photos de chiens, l'IA reconnaît un chien.") },
      { emoji: "🎙️", text: b("AI kan ook je stem herkennen of voorlezen.", "L'IA peut aussi reconnaître ta voix ou lire à voix haute.") },
      { emoji: "🧑‍🏫", text: b("AI maakt fouten. Een mens moet altijd controleren.", "L'IA se trompe parfois. Un humain doit toujours vérifier."), tip: b("Vraag altijd een grote mens om hulp.", "Demande toujours l'aide d'un adulte.") },
    ],
    quiz: [
      { id: 1, question: b("Hoe leert AI?", "Comment l'IA apprend-elle ?"), options: [b("Met veel voorbeelden", "Avec beaucoup d'exemples"), b("Met snoep", "Avec des bonbons")], answer: 0 },
      { id: 2, question: b("Kan AI een hond herkennen op een foto?", "L'IA peut-elle reconnaître un chien sur une photo ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 0 },
      { id: 3, question: b("Maakt AI soms fouten?", "L'IA se trompe-t-elle parfois ?"), options: [b("Ja", "Oui"), b("Nooit", "Jamais")], answer: 0 },
      { id: 4, question: b("Wie controleert de AI?", "Qui vérifie l'IA ?"), options: [b("Een mens", "Un humain"), b("Niemand", "Personne")], answer: 0 },
      { id: 5, question: b("Wat kan AI met jouw stem?", "Que peut faire l'IA avec ta voix ?"), options: [b("Ze herkennen", "La reconnaître"), b("Ze opeten", "La manger")], answer: 0 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* PARCOURS 2 — Les juniors du code (8-10 ans)                         */
/* ------------------------------------------------------------------ */

const JUNIORS: CodeEpisode[] = [
  {
    id: "juniors-1",
    emoji: "📦",
    title: b("Variabelen: dozen met een naam", "Les variables : des boîtes qui ont un nom"),
    goal: b("Je leert waarden bewaren in een variabele.", "Tu apprends à ranger une valeur dans une variable."),
    slides: [
      { emoji: "📦", text: b("Een variabele is een doos met een naam waarin je iets bewaart.", "Une variable est une boîte avec un nom où tu ranges quelque chose.") },
      { emoji: "🔢", text: b("score = 0 betekent: de doos 'score' bevat 0.", "score = 0 veut dire : la boîte « score » contient 0.") },
      { emoji: "➕", text: b("score = score + 1 telt één punt bij.", "score = score + 1 ajoute un point."), tip: b("Zo werkt een teller in een spel.", "C'est ainsi qu'on compte les points d'un jeu.") },
      { emoji: "🔤", text: b("Een variabele kan ook tekst bevatten: naam = \"Sofie\".", "Une variable peut aussi contenir du texte : nom = « Sofie ».") },
    ],
    quiz: [
      { id: 1, question: b("Wat is een variabele?", "Qu'est-ce qu'une variable ?"), options: [b("Een doos met een naam", "Une boîte avec un nom"), b("Een soort scherm", "Une sorte d'écran")], answer: 0 },
      { id: 2, question: b("Wat is score na score = 0 en score = score + 1?", "Que vaut score après score = 0 puis score = score + 1 ?"), options: [b("0", "0"), b("1", "1"), b("2", "2")], answer: 1 },
      { id: 3, question: b("Kan een variabele tekst bevatten?", "Une variable peut-elle contenir du texte ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 0 },
      { id: 4, question: b("Waarvoor gebruik je een teller?", "À quoi sert un compteur ?"), options: [b("Punten bijhouden", "Compter les points"), b("Muziek maken", "Faire de la musique")], answer: 0 },
      { id: 5, question: b("Hoe noem je de naam van de doos?", "Comment appelle-t-on le nom de la boîte ?"), options: [b("De naam van de variabele", "Le nom de la variable"), b("Het wachtwoord", "Le mot de passe")], answer: 0 },
    ],
  },
  {
    id: "juniors-2",
    emoji: "🔀",
    title: b("Als... dan: beslissingen", "Si... alors : les décisions"),
    goal: b("Je leert een programma keuzes laten maken.", "Tu apprends à faire choisir ton programme."),
    slides: [
      { emoji: "🔀", text: b("Met 'als' test je een voorwaarde: waar of niet waar.", "Avec « si », tu testes une condition : vraie ou fausse.") },
      { emoji: "🌧️", text: b("Als het regent, dan neem ik een paraplu.", "S'il pleut, alors je prends un parapluie.") },
      { emoji: "🔁", text: b("'anders' zegt wat er gebeurt als het niet waar is.", "« sinon » dit ce qui se passe si c'est faux.") },
      { emoji: "🧮", text: b("Als score > 10, dan win je het spel.", "Si score > 10, alors tu gagnes la partie."), tip: b("> betekent 'groter dan'.", "> veut dire « plus grand que ».") },
    ],
    quiz: [
      { id: 1, question: b("Wat test een 'als'?", "Que teste un « si » ?"), options: [b("Een voorwaarde", "Une condition"), b("Een kleur", "Une couleur")], answer: 0 },
      { id: 2, question: b("Wat betekent >?", "Que veut dire > ?"), options: [b("Groter dan", "Plus grand que"), b("Kleiner dan", "Plus petit que")], answer: 0 },
      { id: 3, question: b("Wat doet 'anders'?", "Que fait « sinon » ?"), options: [b("Het geval als het niet waar is", "Le cas où c'est faux"), b("Het programma stoppen", "Arrêter le programme")], answer: 0 },
      { id: 4, question: b("Als score = 5, is score > 10 waar?", "Si score = 5, est-ce que score > 10 est vrai ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 1 },
      { id: 5, question: b("Hoeveel antwoorden heeft een voorwaarde?", "Combien de réponses a une condition ?"), options: [b("Twee: waar of niet waar", "Deux : vrai ou faux"), b("Tien", "Dix")], answer: 0 },
    ],
  },
  {
    id: "juniors-3",
    emoji: "🔄",
    title: b("Lussen en functies", "Boucles et fonctions"),
    goal: b("Je leert werk herhalen en hergebruiken.", "Tu apprends à répéter et à réutiliser ton travail."),
    slides: [
      { emoji: "🔄", text: b("Een lus herhaalt dezelfde opdracht, bijvoorbeeld 10 keer.", "Une boucle répète le même ordre, par exemple 10 fois.") },
      { emoji: "⬜", text: b("Een vierkant tekenen: 4 keer (vooruit, draai 90°).", "Dessiner un carré : 4 fois (avance, tourne de 90°).") },
      { emoji: "🧰", text: b("Een functie is een blok code met een naam, dat je hergebruikt.", "Une fonction est un bloc de code avec un nom, que tu réutilises.") },
      { emoji: "♻️", text: b("Functies maken je programma korter en duidelijker.", "Les fonctions rendent ton programme plus court et plus clair."), tip: b("Schrijf nooit twee keer hetzelfde!", "N'écris jamais deux fois la même chose !") },
    ],
    quiz: [
      { id: 1, question: b("Wat doet een lus?", "Que fait une boucle ?"), options: [b("Herhalen", "Répéter"), b("Verwijderen", "Supprimer")], answer: 0 },
      { id: 2, question: b("Hoeveel keer draai je voor een vierkant?", "Combien de fois tournes-tu pour un carré ?"), options: [b("3", "3"), b("4", "4"), b("6", "6")], answer: 1 },
      { id: 3, question: b("Wat is een functie?", "Qu'est-ce qu'une fonction ?"), options: [b("Een codeblok met een naam", "Un bloc de code avec un nom"), b("Een spelletje", "Un jeu")], answer: 0 },
      { id: 4, question: b("Waarom functies gebruiken?", "Pourquoi utiliser des fonctions ?"), options: [b("Om code te hergebruiken", "Pour réutiliser le code"), b("Om de computer te vertragen", "Pour ralentir l'ordinateur")], answer: 0 },
      { id: 5, question: b("Hoeveel graden draai je bij een vierkant?", "De combien de degrés tournes-tu pour un carré ?"), options: [b("45°", "45°"), b("90°", "90°"), b("180°", "180°")], answer: 1 },
    ],
  },
  {
    id: "juniors-4",
    emoji: "🧠",
    title: b("Hoe AI leert", "Comment l'IA apprend"),
    goal: b("Je begrijpt data, training en fouten van AI.", "Tu comprends les données, l'entraînement et les erreurs de l'IA."),
    slides: [
      { emoji: "📊", text: b("AI leert uit data: veel voorbeelden met een label.", "L'IA apprend avec des données : beaucoup d'exemples étiquetés.") },
      { emoji: "🏋️", text: b("Trainen = de AI duizenden keren laten oefenen.", "Entraîner = faire s'exercer l'IA des milliers de fois.") },
      { emoji: "🎯", text: b("Daarna voorspelt de AI: 'dit is waarschijnlijk een kat'.", "Ensuite l'IA prédit : « c'est probablement un chat ».") },
      { emoji: "⚠️", text: b("Slechte of oneerlijke data geeft slechte antwoorden.", "Des données mauvaises ou injustes donnent de mauvaises réponses."), tip: b("AI is nooit 100% zeker.", "L'IA n'est jamais sûre à 100 %.") },
    ],
    quiz: [
      { id: 1, question: b("Wat heeft AI nodig om te leren?", "De quoi l'IA a-t-elle besoin pour apprendre ?"), options: [b("Data", "Des données"), b("Batterijen", "Des piles")], answer: 0 },
      { id: 2, question: b("Wat is trainen?", "Qu'est-ce qu'entraîner ?"), options: [b("Veel laten oefenen", "Faire s'exercer beaucoup"), b("Uitzetten", "Éteindre")], answer: 0 },
      { id: 3, question: b("Wat doet AI na het trainen?", "Que fait l'IA après l'entraînement ?"), options: [b("Voorspellen", "Prédire"), b("Slapen", "Dormir")], answer: 0 },
      { id: 4, question: b("Wat gebeurt er met slechte data?", "Que se passe-t-il avec de mauvaises données ?"), options: [b("Slechte antwoorden", "De mauvaises réponses"), b("Betere antwoorden", "De meilleures réponses")], answer: 0 },
      { id: 5, question: b("Is AI 100% zeker?", "L'IA est-elle sûre à 100 % ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 1 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* PARCOURS 3 — Les grands (11-12 ans)                                 */
/* ------------------------------------------------------------------ */

const GRANDS: CodeEpisode[] = [
  {
    id: "grands-1",
    emoji: "🐍",
    title: b("Mijn eerste echte code", "Ma première vraie ligne de code"),
    goal: b("Je leest en begrijpt eenvoudige Python-code.", "Tu lis et comprends du code Python simple."),
    slides: [
      { emoji: "🐍", text: b("Python is een taal die bijna leest als Engels.", "Python est un langage qui se lit presque comme de l'anglais.") },
      { emoji: "🖨️", text: b("print(\"Hallo\") toont Hallo op het scherm.", "print(« Bonjour ») affiche Bonjour à l'écran.") },
      { emoji: "📦", text: b("age = 11 bewaart het getal 11 in de variabele age.", "age = 11 range le nombre 11 dans la variable age.") },
      { emoji: "🔁", text: b("for i in range(3): herhaalt de code 3 keer.", "for i in range(3) : répète le code 3 fois."), tip: b("Let op de indentatie (de witruimte)!", "Attention à l'indentation (les espaces) !") },
    ],
    quiz: [
      { id: 1, question: b("Wat doet print?", "Que fait print ?"), options: [b("Iets tonen", "Afficher quelque chose"), b("Iets wissen", "Effacer quelque chose")], answer: 0 },
      { id: 2, question: b("Wat betekent age = 11?", "Que veut dire age = 11 ?"), options: [b("11 bewaren in age", "Ranger 11 dans age"), b("age vergelijken met 11", "Comparer age et 11")], answer: 0 },
      { id: 3, question: b("Hoe vaak herhaalt range(3)?", "Combien de fois répète range(3) ?"), options: [b("2", "2"), b("3", "3"), b("4", "4")], answer: 1 },
      { id: 4, question: b("Wat is belangrijk in Python?", "Qu'est-ce qui est important en Python ?"), options: [b("De indentatie", "L'indentation"), b("De kleur van je scherm", "La couleur de l'écran")], answer: 0 },
      { id: 5, question: b("Is Python een programmeertaal?", "Python est-il un langage de programmation ?"), options: [b("Ja", "Oui"), b("Nee", "Non")], answer: 0 },
    ],
  },
  {
    id: "grands-2",
    emoji: "🧮",
    title: b("Lijsten en algoritmes", "Listes et algorithmes"),
    goal: b("Je werkt met lijsten en zoekt/sorteert data.", "Tu manipules des listes et tu cherches ou tries des données."),
    slides: [
      { emoji: "📚", text: b("Een lijst bewaart meerdere waarden: [3, 7, 1].", "Une liste range plusieurs valeurs : [3, 7, 1].") },
      { emoji: "🔍", text: b("Zoeken = elk element overlopen tot je het vindt.", "Chercher = parcourir chaque élément jusqu'à le trouver.") },
      { emoji: "📈", text: b("Sorteren zet de waarden op orde: [1, 3, 7].", "Trier met les valeurs dans l'ordre : [1, 3, 7].") },
      { emoji: "⚡", text: b("Een goed algoritme doet hetzelfde met minder stappen.", "Un bon algorithme fait la même chose avec moins d'étapes."), tip: b("Minder stappen = sneller programma.", "Moins d'étapes = programme plus rapide.") },
    ],
    quiz: [
      { id: 1, question: b("Wat is een lijst?", "Qu'est-ce qu'une liste ?"), options: [b("Meerdere waarden samen", "Plusieurs valeurs ensemble"), b("Eén enkel getal", "Un seul nombre")], answer: 0 },
      { id: 2, question: b("Wat geeft sorteren van [3,7,1]?", "Que donne le tri de [3,7,1] ?"), options: [b("[1,3,7]", "[1,3,7]"), b("[7,3,1]", "[7,3,1]"), b("[3,7,1]", "[3,7,1]")], answer: 0 },
      { id: 3, question: b("Wat doe je bij zoeken?", "Que fais-tu en cherchant ?"), options: [b("Elementen overlopen", "Parcourir les éléments"), b("De lijst wissen", "Effacer la liste")], answer: 0 },
      { id: 4, question: b("Waarom een beter algoritme?", "Pourquoi un meilleur algorithme ?"), options: [b("Minder stappen, sneller", "Moins d'étapes, plus rapide"), b("Mooiere kleuren", "De plus belles couleurs")], answer: 0 },
      { id: 5, question: b("Hoeveel waarden staan in [3,7,1]?", "Combien de valeurs dans [3,7,1] ?"), options: [b("2", "2"), b("3", "3"), b("4", "4")], answer: 1 },
    ],
  },
  {
    id: "grands-3",
    emoji: "🤝",
    title: b("AI slim gebruiken", "Utiliser l'IA intelligemment"),
    goal: b("Je leert goede vragen stellen aan een AI (prompt).", "Tu apprends à bien demander à une IA (prompt)."),
    slides: [
      { emoji: "💬", text: b("Een prompt is de vraag die je aan de AI stelt.", "Un prompt est la question que tu poses à l'IA.") },
      { emoji: "🎯", text: b("Wees precies: zeg wat, voor wie en hoe lang.", "Sois précis : dis quoi, pour qui et quelle longueur.") },
      { emoji: "🔎", text: b("Controleer het antwoord altijd in een echte bron.", "Vérifie toujours la réponse dans une source fiable.") },
      { emoji: "🚫", text: b("Geef nooit je adres, wachtwoord of foto's aan een AI.", "Ne donne jamais ton adresse, ton mot de passe ou tes photos à une IA."), tip: b("AI is een hulp, geen huiswerkmachine.", "L'IA est une aide, pas une machine à devoirs.") },
    ],
    quiz: [
      { id: 1, question: b("Wat is een prompt?", "Qu'est-ce qu'un prompt ?"), options: [b("Je vraag aan de AI", "Ta question à l'IA"), b("Een computerkabel", "Un câble d'ordinateur")], answer: 0 },
      { id: 2, question: b("Hoe stel je een goede prompt?", "Comment faire un bon prompt ?"), options: [b("Precies en duidelijk", "Précis et clair"), b("Zo kort mogelijk, vaag", "Le plus vague possible")], answer: 0 },
      { id: 3, question: b("Wat doe je met een AI-antwoord?", "Que fais-tu d'une réponse d'IA ?"), options: [b("Controleren", "La vérifier"), b("Blind geloven", "La croire aveuglément")], answer: 0 },
      { id: 4, question: b("Mag je je wachtwoord aan een AI geven?", "Peux-tu donner ton mot de passe à une IA ?"), options: [b("Ja", "Oui"), b("Nee, nooit", "Non, jamais")], answer: 1 },
      { id: 5, question: b("Doet AI je huiswerk in jouw plaats?", "L'IA fait-elle tes devoirs à ta place ?"), options: [b("Nee, ze helpt", "Non, elle aide"), b("Ja, altijd", "Oui, toujours")], answer: 0 },
    ],
  },
  {
    id: "grands-4",
    emoji: "🛡️",
    title: b("Veilig online en ethiek", "Sécurité en ligne et éthique"),
    goal: b("Je beschermt je gegevens en denkt kritisch over AI.", "Tu protèges tes données et tu réfléchis à l'IA."),
    slides: [
      { emoji: "🔐", text: b("Een sterk wachtwoord is lang en uniek per site.", "Un mot de passe fort est long et différent sur chaque site.") },
      { emoji: "🕵️", text: b("Persoonlijke gegevens deel je niet met vreemden.", "On ne partage pas ses données personnelles avec des inconnus.") },
      { emoji: "🖼️", text: b("AI kan nepbeelden maken: een deepfake.", "L'IA peut créer de fausses images : un deepfake.") },
      { emoji: "⚖️", text: b("Vraag je altijd af: is dit eerlijk voor iedereen?", "Demande-toi toujours : est-ce juste pour tout le monde ?"), tip: b("Twijfel je? Praat met een ouder of leraar.", "Un doute ? Parle à un parent ou à un enseignant.") },
    ],
    quiz: [
      { id: 1, question: b("Hoe is een sterk wachtwoord?", "Comment est un mot de passe fort ?"), options: [b("Lang en uniek", "Long et unique"), b("1234", "1234")], answer: 0 },
      { id: 2, question: b("Deel je je adres online?", "Partages-tu ton adresse en ligne ?"), options: [b("Nee", "Non"), b("Ja, met iedereen", "Oui, avec tout le monde")], answer: 0 },
      { id: 3, question: b("Wat is een deepfake?", "Qu'est-ce qu'un deepfake ?"), options: [b("Een nepbeeld van AI", "Une fausse image créée par l'IA"), b("Een echte foto", "Une vraie photo")], answer: 0 },
      { id: 4, question: b("Wat vraag je je af bij AI?", "Que te demandes-tu avec l'IA ?"), options: [b("Is dit eerlijk?", "Est-ce juste ?"), b("Is dit duur?", "Est-ce cher ?")], answer: 0 },
      { id: 5, question: b("Bij twijfel: wie vraag je?", "En cas de doute : à qui demandes-tu ?"), options: [b("Een ouder of leraar", "Un parent ou un enseignant"), b("Een vreemde online", "Un inconnu en ligne")], answer: 0 },
    ],
  },
];

export const CODE_TRACKS: CodeTrack[] = [
  {
    id: "petits",
    emoji: "🐣",
    ages: "5-7",
    label: b("Kleine codeurs", "Petits codeurs"),
    description: b("Computers, stappen en robots, zonder lezen.", "Ordinateurs, étapes et robots, presque sans lecture."),
    episodes: PETITS,
  },
  {
    id: "juniors",
    emoji: "🚀",
    ages: "8-10",
    label: b("Junior codeurs", "Juniors du code"),
    description: b("Variabelen, als/dan, lussen en hoe AI leert.", "Variables, si/alors, boucles et apprentissage de l'IA."),
    episodes: JUNIORS,
  },
  {
    id: "grands",
    emoji: "🧑‍💻",
    ages: "11-12",
    label: b("Echte codeurs", "Grands codeurs"),
    description: b("Python, algoritmes, prompts en online veiligheid.", "Python, algorithmes, prompts et sécurité en ligne."),
    episodes: GRANDS,
  },
];

export const ALL_CODE_EPISODES: CodeEpisode[] = CODE_TRACKS.flatMap((t) => t.episodes);

export const getCodeTrack = (id?: string) => CODE_TRACKS.find((t) => t.id === id);

export const getCodeEpisode = (id?: string) => ALL_CODE_EPISODES.find((e) => e.id === id);

export const trackOfEpisode = (episodeId: string) =>
  CODE_TRACKS.find((t) => t.episodes.some((e) => e.id === episodeId));
