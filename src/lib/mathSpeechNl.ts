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
