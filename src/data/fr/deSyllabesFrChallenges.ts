import { FrChallenge } from "./types";

/** Dé des Syllabes (FR) — le dé donne une syllabe, complète le mot (30 défis). */
export const deSyllabesFrChallenges: FrChallenge[] = [
  // Niveau 1
  { id: 1, prompt: "🎲 « ba » + ___", hint: "Complète : ba___", options: ["nane", "teau volant", "cole", "pin"], correctAnswer: "nane", speak: "ba. Quelle syllabe complète le mot banane ?", difficulty: 1 },
  { id: 2, prompt: "🎲 « la » + ___", hint: "Complète : la___", options: ["pin", "teau", "sette", "vion"], correctAnswer: "pin", speak: "la. Complète le mot lapin.", difficulty: 1 },
  { id: 3, prompt: "🎲 « che » + ___", hint: "Complète : che___", options: ["val", "peau", "lo", "ris"], correctAnswer: "val", speak: "che. Complète le mot cheval.", difficulty: 1 },
  { id: 4, prompt: "🎲 « mou » + ___", hint: "Complète : mou___", options: ["ton", "peau", "min", "sette"], correctAnswer: "ton", speak: "mou. Complète le mot mouton.", difficulty: 1 },
  { id: 5, prompt: "🎲 « ta » + ___", hint: "Complète : ta___", options: ["pis", "lon", "sin", "veau"], correctAnswer: "pis", speak: "ta. Complète le mot tapis.", difficulty: 1 },
  { id: 6, prompt: "🎲 « sou » + ___", hint: "Complète : sou___", options: ["ris", "peau", "lo", "min"], correctAnswer: "ris", speak: "sou. Complète le mot souris.", difficulty: 1 },
  { id: 7, prompt: "🎲 « ca » + ___", hint: "Complète : ca___", options: ["nard", "peau doré", "min", "sette"], correctAnswer: "nard", speak: "ca. Complète le mot canard.", difficulty: 1 },
  { id: 8, prompt: "🎲 « vé » + ___", hint: "Complète : vé___", options: ["lo", "pin", "ton", "peau"], correctAnswer: "lo", speak: "vé. Complète le mot vélo.", difficulty: 1 },
  { id: 9, prompt: "🎲 « pou » + ___", hint: "Complète : pou___", options: ["let", "pin", "ris", "lo"], correctAnswer: "let", speak: "pou. Complète le mot poulet.", difficulty: 1 },
  { id: 10, prompt: "🎲 « ma » + ___", hint: "Complète : ma___", options: ["ison", "pin", "let", "ton"], correctAnswer: "ison", speak: "ma. Complète le mot maison.", difficulty: 1 },

  // Niveau 2
  { id: 11, prompt: "🎲 ___ + « teau »", hint: "Complète : ___teau", options: ["châ", "cha", "chi", "cho"], correctAnswer: "châ", speak: "teau. Trouve la première syllabe de château.", difficulty: 2 },
  { id: 12, prompt: "🎲 « pa » + ___ + « llon »", hint: "Complète : pa___llon", options: ["pi", "ta", "vi", "ni"], correctAnswer: "pi", speak: "papillon. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 13, prompt: "🎲 « cro » + ___ + « dile »", hint: "Complète : cro___dile", options: ["co", "ca", "ci", "cu"], correctAnswer: "co", speak: "crocodile. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 14, prompt: "🎲 « té » + ___ + « phone »", hint: "Complète : té___phone", options: ["lé", "la", "li", "lo"], correctAnswer: "lé", speak: "téléphone. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 15, prompt: "🎲 « cho » + ___ + « lat »", hint: "Complète : cho___lat", options: ["co", "ca", "cou", "ci"], correctAnswer: "co", speak: "chocolat. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 16, prompt: "🎲 « to » + ___ + « te »", hint: "Complète : to___te", options: ["ma", "mi", "mo", "me"], correctAnswer: "ma", speak: "tomate. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 17, prompt: "🎲 « pan » + ___ + « lon »", hint: "Complète : pan___lon", options: ["ta", "to", "ti", "tu"], correctAnswer: "ta", speak: "pantalon. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 18, prompt: "🎲 « ba » + ___ + « ne »", hint: "Complète : ba___ne", options: ["na", "ni", "no", "nu"], correctAnswer: "na", speak: "banane. Quelle est la syllabe du milieu ?", difficulty: 2 },
  { id: 19, prompt: "🎲 « pa » + « ra » + ___", hint: "Complète : para___", options: ["pluie", "peau", "lon", "vion"], correctAnswer: "pluie", speak: "parapluie. Quelle est la dernière syllabe ?", difficulty: 2 },
  { id: 20, prompt: "🎲 « or » + « di » + ___ + « teur »", hint: "Complète : ordi___teur", options: ["na", "ni", "no", "ne"], correctAnswer: "na", speak: "ordinateur. Quelle syllabe manque ?", difficulty: 2 },

  // Niveau 3
  { id: 21, prompt: "🎲 « bi » + « bli » + ___ + « thèque »", options: ["o", "a", "é", "u"], correctAnswer: "o", speak: "bibliothèque. Quelle syllabe manque ?", difficulty: 3 },
  { id: 22, prompt: "🎲 « an » + « ni » + ___ + « saire »", options: ["ver", "vi", "va", "vo"], correctAnswer: "ver", speak: "anniversaire. Quelle syllabe manque ?", difficulty: 3 },
  { id: 23, prompt: "🎲 « gym » + ___ + « tique »", options: ["nas", "nis", "nos", "nus"], correctAnswer: "nas", speak: "gymnastique. Quelle syllabe manque ?", difficulty: 3 },
  { id: 24, prompt: "🎲 « é » + « lec » + ___ + « cité »", options: ["tri", "tra", "tro", "tru"], correctAnswer: "tri", speak: "électricité. Quelle syllabe manque ?", difficulty: 3 },
  { id: 25, prompt: "🎲 « res » + ___ + « rant »", options: ["tau", "to", "ti", "te"], correctAnswer: "tau", speak: "restaurant. Quelle syllabe manque ?", difficulty: 3 },
  { id: 26, prompt: "🎲 « tour » + ___ + « sol »", options: ["ne", "ni", "no", "na"], correctAnswer: "ne", speak: "tournesol. Quelle syllabe manque ?", difficulty: 3 },
  { id: 27, prompt: "🎲 « phar » + ___ + « cie »", options: ["ma", "mi", "mo", "me"], correctAnswer: "ma", speak: "pharmacie. Quelle syllabe manque ?", difficulty: 3 },
  { id: 28, prompt: "🎲 « in » + « for » + ___ + « tion »", options: ["ma", "mi", "mo", "me"], correctAnswer: "ma", speak: "information. Quelle syllabe manque ?", difficulty: 3 },
  { id: 29, prompt: "🎲 « géo » + ___ + « phie »", options: ["gra", "gro", "gri", "gré"], correctAnswer: "gra", speak: "géographie. Quelle syllabe manque ?", difficulty: 3 },
  { id: 30, prompt: "🎲 « hi » + « ppo » + « po » + ___", options: ["tame", "time", "tome", "teme"], correctAnswer: "tame", speak: "hippopotame. Quelle est la dernière syllabe ?", difficulty: 3 },
];
