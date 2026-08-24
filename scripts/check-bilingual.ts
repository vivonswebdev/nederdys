/**
 * Vérification bilingue NL+FR.
 *
 * Détecte le texte français montré aux enfants qui n'a pas d'équivalent
 * néerlandais : chapitres sans `nameNl`, et chaînes JSX codées en dur dans les
 * écrans/jeux enfants qui ne passent ni par `BilingualText`/`Bi`, ni par
 * `biFromFr`, ni par le dictionnaire `UI`.
 *
 * Usage : bun run scripts/check-bilingual.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

/** Dossiers dont le contenu est affiché aux enfants. */
const CHILD_DIRS = [
  "src/components/chapters",
  "src/components/maths",
  "src/components/eveil",
  "src/components/child",
  "src/pages/math",
  "src/pages/nl",
  "src/pages/eveil",
  "src/pages/child",
];

const walk = (dir: string): string[] => {
  const abs = join(ROOT, dir);
  let entries: string[] = [];
  try {
    entries = readdirSync(abs);
  } catch {
    return [];
  }
  return entries.flatMap((e) => {
    const rel = `${dir}/${e}`;
    return statSync(join(ROOT, rel)).isDirectory()
      ? walk(rel)
      : /\.tsx?$/.test(e)
        ? [rel]
        : [];
  });
};

/** Texte JSX brut : > Texte français < */
const JSX_TEXT = />\s*([A-ZÀ-Ÿ][^<>{}\n]{3,})\s*</g;
const IGNORE = /^[\s\d%·—/+.:!?()–-]*$/;

let problems = 0;

// 1. Chapitres sans titre néerlandais
const chaptersNl = readFileSync(join(ROOT, "src/data/nl/chaptersNl.ts"), "utf8");
const chapterIds = [
  ...readFileSync(join(ROOT, "src/lib/chapters.ts"), "utf8").matchAll(/id: "([a-z0-9-]+)"/g),
].map((m) => m[1]);
for (const id of new Set(chapterIds)) {
  if (!chaptersNl.includes(`"${id}"`) && !chaptersNl.includes(`\n  ${id}:`)) {
    console.log(`[chapitre sans NL] ${id}`);
    problems++;
  }
}

// 2. Chaînes JSX françaises non bilingues
for (const file of CHILD_DIRS.flatMap(walk)) {
  const src = readFileSync(join(ROOT, file), "utf8");
  for (const match of src.matchAll(JSX_TEXT)) {
    const text = match[1].trim();
    if (IGNORE.test(text)) continue;
    if (/^[A-Z_]+$/.test(text)) continue;
    // Déjà bilingue à l'écran : "Luisteren / Écouter"
    if (/\s\/\s/.test(text)) continue;
    console.log(`[texte FR sans NL] ${file} → "${text}"`);
    problems++;
  }
}

if (problems === 0) {
  console.log("✅ Tout le texte enfant est bilingue NL + FR.");
} else {
  console.log(`\n${problems} chaîne(s) à rendre bilingue(s).`);
}
