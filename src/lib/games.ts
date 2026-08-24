export type Subject = "nl" | "fr" | "math";

export interface GameMeta {
  id: string;
  subject: Subject;
  titleKey: string;
  descKey: string;
  icon: string;
  color: string;
  route: string;
}

export const SUBJECTS: {
  id: Subject;
  emoji: string;
  labelKey: string;
  descKey: string;
  className: string;
}[] = [
  { id: "nl", emoji: "🇳🇱", labelKey: "subject.nl", descKey: "subject.nl.desc", className: "bg-subject-nl" },
  { id: "fr", emoji: "🇫🇷", labelKey: "subject.fr", descKey: "subject.fr.desc", className: "bg-subject-fr" },
  { id: "math", emoji: "🔢", labelKey: "subject.math", descKey: "subject.math.desc", className: "bg-subject-math" },
];

export const GAMES: GameMeta[] = [
  { id: "memorycalcul", subject: "math", titleKey: "game.memorycalcul.title", descKey: "game.memorycalcul.desc", icon: "🃏", color: "bg-kids-blue", route: "/jeu/memory-calcul" },
  { id: "puzzlenumerique", subject: "math", titleKey: "game.puzzlenumerique.title", descKey: "game.puzzlenumerique.desc", icon: "🧮", color: "bg-kids-purple", route: "/jeu/puzzle-numerique" },
  { id: "labyrinthenombres", subject: "math", titleKey: "game.labyrinthenombres.title", descKey: "game.labyrinthenombres.desc", icon: "🌀", color: "bg-kids-green-light", route: "/jeu/labyrinthe-nombres" },
  { id: "pyramidenombres", subject: "math", titleKey: "game.pyramidenombres.title", descKey: "game.pyramidenombres.desc", icon: "🔺", color: "bg-kids-red", route: "/jeu/pyramide-nombres" },
  { id: "compteestbon", subject: "math", titleKey: "game.compteestbon.title", descKey: "game.compteestbon.desc", icon: "🎯", color: "bg-kids-orange", route: "/jeu/compte-est-bon" },
  { id: "chainescalcul", subject: "math", titleKey: "game.chainescalcul.title", descKey: "game.chainescalcul.desc", icon: "🔗", color: "bg-kids-blue", route: "/jeu/chaines-calcul" },
  { id: "droitegraduee", subject: "math", titleKey: "game.droitegraduee.title", descKey: "game.droitegraduee.desc", icon: "📍", color: "bg-kids-green-light", route: "/jeu/droite-graduee" },
  { id: "bataillenombres", subject: "math", titleKey: "game.bataillenombres.title", descKey: "game.bataillenombres.desc", icon: "⚔️", color: "bg-kids-purple", route: "/jeu/bataille-nombres" },
  { id: "tangram", subject: "math", titleKey: "game.tangram.title", descKey: "game.tangram.desc", icon: "🧩", color: "bg-kids-yellow", route: "/jeu/tangram" },
  { id: "syllabes", subject: "nl", titleKey: "game.syllabes.title", descKey: "game.syllabes.desc", icon: "✨", color: "bg-kids-green-light", route: "/jeu/syllabes" },
  { id: "chasse", subject: "nl", titleKey: "game.chasse.title", descKey: "game.chasse.desc", icon: "🎈", color: "bg-kids-yellow", route: "/jeu/chasse" },
  { id: "memoire", subject: "nl", titleKey: "game.memoire.title", descKey: "game.memoire.desc", icon: "🔊", color: "bg-kids-blue", route: "/jeu/memoire" },
  { id: "phonemes", subject: "nl", titleKey: "game.phonemes.title", descKey: "game.phonemes.desc", icon: "💃", color: "bg-kids-pink", route: "/jeu/phonemes" },
  { id: "dictee", subject: "nl", titleKey: "game.dictee.title", descKey: "game.dictee.desc", icon: "📝", color: "bg-kids-purple", route: "/jeu/dictee" },
  { id: "lettres", subject: "nl", titleKey: "game.lettres.title", descKey: "game.lettres.desc", icon: "🧲", color: "bg-kids-orange", route: "/jeu/lettres" },
  { id: "burger", subject: "nl", titleKey: "game.burger.title", descKey: "game.burger.desc", icon: "🍔", color: "bg-kids-red", route: "/jeu/burger" },
  { id: "graphemes", subject: "nl", titleKey: "game.graphemes.title", descKey: "game.graphemes.desc", icon: "🏴‍☠️", color: "bg-sky-700", route: "/jeu/graphemes" },
  { id: "train", subject: "nl", titleKey: "game.train.title", descKey: "game.train.desc", icon: "🚂", color: "bg-emerald-600", route: "/jeu/train" },
  { id: "miroir", subject: "nl", titleKey: "game.miroir.title", descKey: "game.miroir.desc", icon: "🪞", color: "bg-violet-600", route: "/jeu/miroir" },
  { id: "fauxamis", subject: "nl", titleKey: "game.fauxamis.title", descKey: "game.fauxamis.desc", icon: "🤝", color: "bg-amber-700", route: "/jeu/faux-amis" },
  { id: "phare", subject: "nl", titleKey: "game.phare.title", descKey: "game.phare.desc", icon: "🏠", color: "bg-cyan-800", route: "/jeu/phare" },
  { id: "peintre", subject: "nl", titleKey: "game.peintre.title", descKey: "game.peintre.desc", icon: "🎨", color: "bg-pink-700", route: "/jeu/peintre" },
  { id: "puzzle", subject: "nl", titleKey: "game.puzzle.title", descKey: "game.puzzle.desc", icon: "🧩", color: "bg-teal-700", route: "/jeu/puzzle" },
  { id: "pont", subject: "nl", titleKey: "game.pont.title", descKey: "game.pont.desc", icon: "🌉", color: "bg-indigo-700", route: "/jeu/pont" },
  { id: "trieur", subject: "nl", titleKey: "game.trieur.title", descKey: "game.trieur.desc", icon: "🗂️", color: "bg-lime-700", route: "/jeu/trieur" },
  { id: "mur", subject: "nl", titleKey: "game.mur.title", descKey: "game.mur.desc", icon: "🧱", color: "bg-red-800", route: "/jeu/mur" },
  { id: "oreille", subject: "nl", titleKey: "game.oreille.title", descKey: "game.oreille.desc", icon: "👂", color: "bg-fuchsia-700", route: "/jeu/oreille" },
  { id: "tir", subject: "nl", titleKey: "game.tir.title", descKey: "game.tir.desc", icon: "🎯", color: "bg-rose-700", route: "/jeu/tir" },
  { id: "mottroue", subject: "nl", titleKey: "game.mottroue.title", descKey: "game.mottroue.desc", icon: "🕳️", color: "bg-stone-700", route: "/jeu/mot-troue" },
  { id: "chrono", subject: "nl", titleKey: "game.chrono.title", descKey: "game.chrono.desc", icon: "⏱️", color: "bg-blue-800", route: "/jeu/chrono" },
  { id: "murnombres", subject: "math", titleKey: "game.murnombres.title", descKey: "game.murnombres.desc", icon: "🧱", color: "bg-kids-orange", route: "/jeu/mur-des-nombres" },
  { id: "chronocalcul", subject: "math", titleKey: "game.chronocalcul.title", descKey: "game.chronocalcul.desc", icon: "⏱️", color: "bg-kids-blue", route: "/jeu/chrono-calcul" },
  { id: "nombretroue", subject: "math", titleKey: "game.nombretroue.title", descKey: "game.nombretroue.desc", icon: "🕳️", color: "bg-kids-green-light", route: "/jeu/nombre-troue" },
  { id: "oreillenombres", subject: "math", titleKey: "game.oreillenombres.title", descKey: "game.oreillenombres.desc", icon: "👂", color: "bg-kids-yellow", route: "/jeu/oreille-des-nombres" },
  { id: "tirnombres", subject: "math", titleKey: "game.tirnombres.title", descKey: "game.tirnombres.desc", icon: "🎯", color: "bg-kids-red", route: "/jeu/tir-aux-nombres" },
  { id: "moutonnoirmaths", subject: "math", titleKey: "game.moutonnoirmaths.title", descKey: "game.moutonnoirmaths.desc", icon: "🐑", color: "bg-kids-purple", route: "/jeu/mouton-noir-maths" },
  { id: "rouehasard", subject: "math", titleKey: "game.rouehasard.title", descKey: "game.rouehasard.desc", icon: "🎡", color: "bg-kids-yellow", route: "/jeu/roue-du-hasard" },
  { id: "marathonmental", subject: "math", titleKey: "game.marathonmental.title", descKey: "game.marathonmental.desc", icon: "🏃", color: "bg-kids-green", route: "/jeu/marathon-mental" },
  { id: "coffrefort", subject: "math", titleKey: "game.coffrefort.title", descKey: "game.coffrefort.desc", icon: "🔐", color: "bg-neutral-700", route: "/jeu/coffre-fort" },
  { id: "desmaths", subject: "math", titleKey: "game.desmaths.title", descKey: "game.desmaths.desc", icon: "🎲", color: "bg-kids-blue", route: "/jeu/des-mathematiques" },
  { id: "rimemalin", subject: "nl", titleKey: "game.rimemalin.title", descKey: "game.rimemalin.desc", icon: "🎵", color: "bg-kids-blue", route: "/jeu/rime-malin" },
  { id: "desyllabes", subject: "nl", titleKey: "game.desyllabes.title", descKey: "game.desyllabes.desc", icon: "🎲", color: "bg-kids-orange", route: "/jeu/de-syllabes" },
  { id: "cirquemots", subject: "nl", titleKey: "game.cirquemots.title", descKey: "game.cirquemots.desc", icon: "🎪", color: "bg-kids-pink", route: "/jeu/cirque-mots" },
  { id: "dialogueeclair", subject: "nl", titleKey: "game.dialogueeclair.title", descKey: "game.dialogueeclair.desc", icon: "⚡", color: "bg-kids-yellow", route: "/jeu/dialogue-eclair" },
  { id: "chasseurerreurs", subject: "nl", titleKey: "game.chasseurerreurs.title", descKey: "game.chasseurerreurs.desc", icon: "🔍", color: "bg-kids-green", route: "/jeu/chasseur-erreurs" },
  { id: "magicienmots", subject: "nl", titleKey: "game.magicienmots.title", descKey: "game.magicienmots.desc", icon: "🪄", color: "bg-kids-purple", route: "/jeu/magicien-mots" },
  { id: "rouegenres", subject: "nl", titleKey: "game.rouegenres.title", descKey: "game.rouegenres.desc", icon: "🎡", color: "bg-kids-blue", route: "/jeu/roue-genres" },
  { id: "echosons", subject: "nl", titleKey: "game.echosons.title", descKey: "game.echosons.desc", icon: "🔊", color: "bg-kids-orange", route: "/jeu/echo-sons" },
  { id: "mouton", subject: "nl", titleKey: "game.mouton.title", descKey: "game.mouton.desc", icon: "🐑", color: "bg-neutral-800", route: "/jeu/mouton" },

  // === FRANÇAIS (16 jeux) ===
  { id: "syllabesfete", subject: "fr", titleKey: "game.syllabesfete.title", descKey: "game.syllabesfete.desc", icon: "🎉", color: "bg-kids-pink", route: "/jeu/syllabes-fete" },
  { id: "chassesonsfr", subject: "fr", titleKey: "game.chassesonsfr.title", descKey: "game.chassesonsfr.desc", icon: "🔤", color: "bg-kids-blue", route: "/jeu/chasse-sons-fr" },
  { id: "rimemalinfr", subject: "fr", titleKey: "game.rimemalinfr.title", descKey: "game.rimemalinfr.desc", icon: "🎵", color: "bg-kids-purple", route: "/jeu/rime-malin-fr" },
  { id: "desyllabesfr", subject: "fr", titleKey: "game.desyllabesfr.title", descKey: "game.desyllabesfr.desc", icon: "🎲", color: "bg-kids-orange", route: "/jeu/de-syllabes-fr" },
  { id: "jardinmots", subject: "fr", titleKey: "game.jardinmots.title", descKey: "game.jardinmots.desc", icon: "🌷", color: "bg-kids-green-light", route: "/jeu/jardin-mots" },
  { id: "bullessynonymes", subject: "fr", titleKey: "game.bullessynonymes.title", descKey: "game.bullessynonymes.desc", icon: "🫧", color: "bg-cyan-700", route: "/jeu/bulles-synonymes" },
  { id: "bullesmotsfr", subject: "fr", titleKey: "game.bullesmotsfr.title", descKey: "game.bullesmotsfr.desc", icon: "🎈", color: "bg-kids-yellow", route: "/jeu/bulles-mots-fr" },
  { id: "cartetresorfr", subject: "fr", titleKey: "game.cartetresorfr.title", descKey: "game.cartetresorfr.desc", icon: "🗺️", color: "bg-amber-700", route: "/jeu/carte-tresor-fr" },
  { id: "batisseurphrases", subject: "fr", titleKey: "game.batisseurphrases.title", descKey: "game.batisseurphrases.desc", icon: "🧱", color: "bg-red-800", route: "/jeu/batisseur-phrases" },
  { id: "completehistoire", subject: "fr", titleKey: "game.completehistoire.title", descKey: "game.completehistoire.desc", icon: "📖", color: "bg-teal-700", route: "/jeu/complete-histoire" },
  { id: "dialogueeclairfr", subject: "fr", titleKey: "game.dialogueeclairfr.title", descKey: "game.dialogueeclairfr.desc", icon: "⚡", color: "bg-kids-yellow", route: "/jeu/dialogue-eclair-fr" },
  { id: "piegehomophones", subject: "fr", titleKey: "game.piegehomophones.title", descKey: "game.piegehomophones.desc", icon: "🪤", color: "bg-stone-700", route: "/jeu/piege-homophones" },
  { id: "chasseurerreursfr", subject: "fr", titleKey: "game.chasseurerreursfr.title", descKey: "game.chasseurerreursfr.desc", icon: "🔍", color: "bg-kids-green", route: "/jeu/chasseur-erreurs-fr" },
  { id: "rouegenresfr", subject: "fr", titleKey: "game.rouegenresfr.title", descKey: "game.rouegenresfr.desc", icon: "🎡", color: "bg-indigo-700", route: "/jeu/roue-genres-fr" },
  { id: "dicteemuette", subject: "fr", titleKey: "game.dicteemuette.title", descKey: "game.dicteemuette.desc", icon: "🤫", color: "bg-violet-700", route: "/jeu/dictee-muette" },
  { id: "echosonsfr", subject: "fr", titleKey: "game.echosonsfr.title", descKey: "game.echosonsfr.desc", icon: "🔊", color: "bg-fuchsia-700", route: "/jeu/echo-sons-fr" },
];


export const gamesBySubject = (subject: Subject) => GAMES.filter((g) => g.subject === subject);

/** Catégorie pédagogique de chaque jeu (utilisée par les filtres de la liste). */
export const GAME_CATEGORY: Record<string, string> = {
  memorycalcul: "calcul",
  puzzlenumerique: "logique",
  labyrinthenombres: "calcul",
  pyramidenombres: "calcul",
  compteestbon: "logique",
  chainescalcul: "calcul",
  droitegraduee: "logique",
  bataillenombres: "calcul",
  tangram: "logique",
  syllabes: "phonologie",
  chasse: "vocabulaire",
  memoire: "ecoute",
  phonemes: "phonologie",
  dictee: "orthographe",
  lettres: "orthographe",
  burger: "phrases",
  graphemes: "orthographe",
  train: "phonologie",
  miroir: "phonologie",
  fauxamis: "vocabulaire",
  phare: "ecoute",
  peintre: "phonologie",
  puzzle: "phrases",
  pont: "phrases",
  trieur: "vocabulaire",
  mur: "phrases",
  oreille: "ecoute",
  tir: "vocabulaire",
  mottroue: "orthographe",
  chrono: "phrases",
  mouton: "vocabulaire",
  rimemalin: "phonologie",
  desyllabes: "phonologie",
  cirquemots: "vocabulaire",
  dialogueeclair: "phrases",
  chasseurerreurs: "grammaire",
  magicienmots: "grammaire",
  rouegenres: "grammaire",
  echosons: "phonologie",
  murnombres: "calcul",
  chronocalcul: "calcul",
  nombretroue: "calcul",
  oreillenombres: "ecoute",
  tirnombres: "ecoute",
  moutonnoirmaths: "logique",
  rouehasard: "calcul",
  marathonmental: "vitesse",
  coffrefort: "logique",
  desmaths: "calcul",

  // Français
  syllabesfete: "phonologie",
  chassesonsfr: "phonologie",
  rimemalinfr: "phonologie",
  desyllabesfr: "phonologie",
  jardinmots: "vocabulaire",
  bullessynonymes: "vocabulaire",
  bullesmotsfr: "vocabulaire",
  cartetresorfr: "vocabulaire",
  batisseurphrases: "phrases",
  completehistoire: "phrases",
  dialogueeclairfr: "phrases",
  piegehomophones: "orthographe",
  chasseurerreursfr: "grammaire",
  rouegenresfr: "grammaire",
  dicteemuette: "ecoute",
  echosonsfr: "ecoute",
};


export interface GameCategoryMeta {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES_BY_SUBJECT: Record<Subject, GameCategoryMeta[]> = {
  nl: [
    { id: "all", name: "Tous", icon: "📦" },
    { id: "phonologie", name: "Sons", icon: "🔤" },
    { id: "vocabulaire", name: "Vocabulaire", icon: "📖" },
    { id: "phrases", name: "Phrases", icon: "💬" },
    { id: "grammaire", name: "Grammaire", icon: "🧩" },
    { id: "orthographe", name: "Orthographe", icon: "✏️" },
    { id: "ecoute", name: "Écoute", icon: "👂" },
  ],
  math: [
    { id: "all", name: "Tous", icon: "📦" },
    { id: "calcul", name: "Calcul", icon: "🔢" },
    { id: "ecoute", name: "Écoute", icon: "👂" },
    { id: "logique", name: "Logique", icon: "🧠" },
    { id: "vitesse", name: "Vitesse", icon: "⏱️" },
  ],
  fr: [
    { id: "all", name: "Tous", icon: "📦" },
    { id: "phonologie", name: "Sons", icon: "🔤" },
    { id: "vocabulaire", name: "Vocabulaire", icon: "📖" },
    { id: "phrases", name: "Phrases", icon: "💬" },
    { id: "grammaire", name: "Grammaire", icon: "🧩" },
    { id: "orthographe", name: "Orthographe", icon: "✏️" },
    { id: "ecoute", name: "Écoute", icon: "👂" },
  ],
};

export const categoriesForSubject = (subject: Subject): GameCategoryMeta[] => {
  const used = new Set(gamesBySubject(subject).map((g) => GAME_CATEGORY[g.id]));
  return CATEGORIES_BY_SUBJECT[subject].filter((c) => c.id === "all" || used.has(c.id));
};
