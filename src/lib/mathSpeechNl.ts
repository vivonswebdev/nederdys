/**
 * Génération de la version néerlandaise (nl-BE) des consignes audio de maths.
 * Les défis maths portent un `display` neutre ("4 + _ = 9") : on le convertit
 * en phrase néerlandaise, ce qui évite de traduire à la main chaque consigne.
 */

const UNITS = [
  "nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen",
  "tien", "elf", "twaalf", "dertien", "veertien", "vijftien", "zestien",
  "zeventien", "achttien", "negentien",
];

const TENS: Record<number, string> = {
  2: "twintig",
  3: "dertig",
  4: "veertig",
  5: "vijftig",
  6: "zestig",
  7: "zeventig",
  8: "tachtig",
  9: "negentig",
};

/** Écrit un entier (0 – 9999) en toutes lettres en néerlandais. */
export function numberToNl(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  if (n < 0) return `min ${numberToNl(-n)}`;
  if (!Number.isInteger(n)) {
    const [a, b] = String(n).split(".");
    return `${numberToNl(Number(a))} komma ${b.split("").map((d) => UNITS[Number(d)]).join(" ")}`;
  }
  if (n < 20) return UNITS[n];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return TENS[t];
    const unit = UNITS[u];
    return `${unit}${unit.endsWith("e") ? "ën" : "en"}${TENS[t]}`;
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rest = n % 100;
    const head = h === 1 ? "honderd" : `${UNITS[h]}honderd`;
    return rest === 0 ? head : `${head} ${numberToNl(rest)}`;
  }
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  const head = th === 1 ? "duizend" : `${numberToNl(th)} duizend`;
  return rest === 0 ? head : `${head} ${numberToNl(rest)}`;
}

const OPERATORS: Record<string, string> = {
  "+": "plus",
  "-": "min",
  "−": "min",
  "*": "maal",
  "×": "maal",
  "x": "maal",
  "/": "gedeeld door",
  "÷": "gedeeld door",
  ":": "gedeeld door",
  "=": "is",
  "<": "is kleiner dan",
  ">": "is groter dan",
};

/**
 * Convertit une expression affichée ("4 + _ = 9") en consigne néerlandaise
 * ("vier plus iets is negen"). Renvoie `null` si l'expression n'est pas
 * exploitable (on retombe alors sur l'audio français seul).
 */
export function displayToNl(display?: string): string | null {
  if (!display) return null;
  const tokens = display.replace(/([+\-−*×÷/:=<>_?])/g, " $1 ").split(/\s+/).filter(Boolean);
  if (!tokens.length) return null;
  const words: string[] = [];
  for (const token of tokens) {
    if (OPERATORS[token]) words.push(OPERATORS[token]);
    else if (token === "_" || token === "?" || token === "…") words.push("iets");
    else if (/^-?\d+([.,]\d+)?$/.test(token)) words.push(numberToNl(Number(token.replace(",", "."))));
    else return null;
  }
  return words.join(" ");
}

/* ------------------------------------------------------------------ */
/* Traduction des consignes audio françaises de maths vers le NL       */
/* ------------------------------------------------------------------ */

const FR_NUMBERS: Record<string, number> = {
  zéro: 0, zero: 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6,
  sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12, treize: 13,
  quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30, quarante: 40,
  cinquante: 50, soixante: 60, cent: 100, mille: 1000,
};

const FR_OPERATORS: Record<string, string> = {
  plus: "plus",
  moins: "min",
  fois: "maal",
  multiplié: "maal",
  divisé: "gedeeld door",
  égale: "is",
  egale: "is",
  égal: "is",
  font: "is",
  est: "is",
  quelque: "iets",
  chose: "",
  par: "",
  combien: "hoeveel",
};

/**
 * Traduit une consigne audio de maths (française, formulaire généré) en
 * néerlandais. Renvoie `null` si un mot n'est pas reconnu : le jeu se
 * contente alors de l'audio français.
 */
export function mathTextToNl(fr?: string): string | null {
  if (!fr) return null;
  const tokens = fr
    .toLowerCase()
    .replace(/[?!.,]/g, "")
    .replace(/([+\-−*×÷/:=_])/g, " $1 ")
    .split(/[\s-]+/)
    .filter(Boolean);
  if (!tokens.length) return null;

  const words: string[] = [];
  for (const token of tokens) {
    if (/^\d+([.,]\d+)?$/.test(token)) {
      words.push(numberToNl(Number(token.replace(",", "."))));
    } else if (token in FR_NUMBERS) {
      words.push(numberToNl(FR_NUMBERS[token]));
    } else if (OPERATORS[token]) {
      words.push(OPERATORS[token]);
    } else if (token in FR_OPERATORS) {
      const w = FR_OPERATORS[token];
      if (w) words.push(w);
    } else if (token === "_" || token === "?") {
      words.push("iets");
    } else {
      return null;
    }
  }
  return words.join(" ").replace(/\s+/g, " ").trim() || null;
}
