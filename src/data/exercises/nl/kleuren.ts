import { Exercise } from "@/data/chapters/types";

/** De kleuren & de kledij — 15 exercices (5 par niveau). */
export const kleurenExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Welke kleur heeft deze appel ?", visualAid: "🍎", options: ["rood", "blauw", "groen", "geel"], answer: "rood" },
  { id: 2, type: "qcm", difficulty: 1, question: "Welke kleur heeft de zon ?", visualAid: "☀️", options: ["geel", "zwart", "paars", "bruin"], answer: "geel" },
  { id: 3, type: "qcm", difficulty: 1, question: "Welke kleur heeft het gras ?", visualAid: "🌿", options: ["groen", "roze", "wit", "oranje"], answer: "groen" },
  { id: 4, type: "qcm", difficulty: 1, question: "Comment dit-on « bleu » en néerlandais ?", visualAid: "💙", options: ["blauw", "bruin", "grijs", "zwart"], answer: "blauw" },
  { id: 5, type: "qcm", difficulty: 1, question: "Wat is « une robe » in het Nederlands ?", visualAid: "👗", options: ["een jurk", "een broek", "een jas", "een schoen"], answer: "een jurk" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "De bloem is ___ (bleu)", visualAid: "🌷", answer: "blauw" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "De banaan is ___ (jaune)", visualAid: "🍌", answer: "geel" },
  { id: 8, type: "true_false", difficulty: 2, question: "« zwart » betekent « blanc ».", answer: false },
  { id: 9, type: "true_false", difficulty: 2, question: "« een broek » betekent « un pantalon ».", visualAid: "👖", answer: true },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Ik draag een ___ (manteau) als het koud is.", visualAid: "🧥", answer: "jas" },

  // Niveau 3
  { id: 11, type: "match", difficulty: 3, question: "Koppel de kleur aan het voorwerp.", pairs: [ { left: "rood", right: "appel" }, { left: "blauw", right: "lucht" }, { left: "groen", right: "boom" } ] },
  { id: 12, type: "match", difficulty: 3, question: "Koppel het Nederlandse woord aan het Franse woord.", pairs: [ { left: "de schoenen", right: "les chaussures" }, { left: "de trui", right: "le pull" }, { left: "de muts", right: "le bonnet" } ] },
  { id: 13, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["Ik", "draag", "een", "rode", "trui"] },
  { id: 14, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["De", "jurk", "is", "blauw"] },
  { id: 15, type: "qcm", difficulty: 3, question: "Welk woord is GEEN kleur ?", options: ["oranje", "paars", "grijs", "schoen"], answer: "schoen" },
];
