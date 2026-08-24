import { Exercise } from "./types";

/** Les rimes néerlandaises — 18 exercices (6 par niveau), lié au jeu Rime Malin. */
export const rimesNlExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Quel mot rime avec « kat » ?", questionNl: "Welk woord rijmt op « kat »?", options: ["mat", "hond", "boek"], answer: "mat" },
  { id: 2, type: "qcm", difficulty: 1, question: "Quel mot rime avec « zon » ?", questionNl: "Welk woord rijmt op « zon »?", options: ["ton", "vis", "raam"], answer: "ton" },
  { id: 3, type: "qcm", difficulty: 1, question: "Quel mot rime avec « bal » ?", questionNl: "Welk woord rijmt op « bal »?", options: ["val", "kaas", "boom"], answer: "val" },
  { id: 4, type: "qcm", difficulty: 1, question: "Quel mot rime avec « muis » ?", questionNl: "Welk woord rijmt op « muis »?", options: ["huis", "kip", "bed"], answer: "huis" },
  { id: 5, type: "true_false", difficulty: 1, question: "« hond » et « mond » riment.", questionNl: "« hond » en « mond » rijmen.", answer: true },
  { id: 6, type: "true_false", difficulty: 1, question: "« vis » et « boom » riment.", questionNl: "« vis » en « boom » rijmen.", answer: false },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Quel mot rime avec « trein » ?", questionNl: "Welk woord rijmt op « trein »?", options: ["klein", "bloem", "stoel"], answer: "klein" },
  { id: 8, type: "qcm", difficulty: 2, question: "Quel mot rime avec « deur » ?", questionNl: "Welk woord rijmt op « deur »?", options: ["kleur", "boot", "kip"], answer: "kleur" },
  { id: 9, type: "fill_blank", difficulty: 2, question: "Trouve un mot qui rime avec « kaas » : ___", questionNl: "Zoek een woord dat rijmt op « kaas »: ___", answer: "baas" },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Trouve un mot qui rime avec « vuur » : ___", questionNl: "Zoek een woord dat rijmt op « vuur »: ___", answer: "muur" },
  { id: 11, type: "qcm", difficulty: 2, question: "Quel mot rime avec « brood » ?", questionNl: "Welk woord rijmt op « brood »?", options: ["rood", "melk", "fiets"], answer: "rood" },
  { id: 12, type: "true_false", difficulty: 2, question: "« hand » et « zand » riment.", questionNl: "« hand » en « zand » rijmen.", answer: true },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "Quel mot rime avec « zomer » ?", questionNl: "Welk woord rijmt op « zomer »?", options: ["dromer", "winter", "regen"], answer: "dromer" },
  { id: 14, type: "qcm", difficulty: 3, question: "Quel mot rime avec « straat » ?", questionNl: "Welk woord rijmt op « straat »?", options: ["maat", "dorp", "plein"], answer: "maat" },
  { id: 15, type: "fill_blank", difficulty: 3, question: "Complète la comptine : Het is fijn, ik ben ___ (petit).", questionNl: "Vul aan: Het is fijn, ik ben ___ (klein).", answer: "klein" },
  { id: 16, type: "qcm", difficulty: 3, question: "Quel mot rime avec « konijn » ?", questionNl: "Welk woord rijmt op « konijn »?", options: ["fijn", "wolk", "boom"], answer: "fijn" },
  { id: 17, type: "qcm", difficulty: 3, question: "Quel mot rime avec « wolken » ?", questionNl: "Welk woord rijmt op « wolken »?", options: ["volken", "hemel", "sterren"], answer: "volken" },
  { id: 18, type: "match", difficulty: 3, question: "Associe chaque mot à sa rime.", questionNl: "Verbind elk woord met zijn rijmwoord.", pairs: [
    { left: "kat", right: "mat" },
    { left: "trein", right: "klein" },
    { left: "deur", right: "kleur" },
    { left: "brood", right: "rood" },
  ] },
];
