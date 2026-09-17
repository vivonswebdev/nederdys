/**
 * Audit i18n FR/NL — pages de chapitres, jeux et lecteur d'histoires.
 *
 * Liste les clés manquantes ou incomplètes :
 *  1. `translations.ts` : clés sans valeur FR ou NL.
 *  2. Clés `t("…")` utilisées dans les pages mais absentes du dictionnaire.
 *  3. Chapitres (`src/lib/chapters.ts`) sans titre néerlandais (`CHAPTERS_NL`).
 *  4. Histoires (`src/data/stories/*`) : champs FR manquants (titre, scènes,
 *     questions, options) — utilisés par `StoryReader`.
 *  5. Textes FR codés en dur dans les pages enfants sans entrée `NL_STRINGS`.
 *
 * Usage : bun run scripts/audit-i18n.ts
 * Sortie : liste détaillée + code de sortie 1 s'il manque quelque chose.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

/** Dossiers de pages/composants montrés aux enfants (chapitres + jeux + histoires). */
const SCAN_DIRS = [
  "src/pages/nl",
  "src/pages/fr",
  "src/pages/math",
  "src/pages/child",
  "src/pages/eveil",
  "src/pages/code",
  "src/pages/learn",
  "src/components/chapters",
  "src/components/maths",
  "src/components/nl",
  "src/components/fr",
  "src/components/eveil",
  "src/components/child",
  "src/components/stories",
];

const walk = (dir: string): string[] => {
  let entries: string[] = [];
  try {
    entries = readdirSync(join(ROOT, dir));
  } catch {
    return [];
  }
  return entries.flatMap((e) => {
    const rel = `${dir}/${e}`;
    return statSync(join(ROOT, rel)).isDirectory() ? walk(rel) : /\.tsx?$/.test(e) ? [rel] : [];
  });
};

const files = SCAN_DIRS.flatMap(walk);
const report: Record<string, string[]> = {};
const add = (section: string, line: string) => {
  (report[section] ??= []).push(line);
};

/* 1. Dictionnaire principal : parité FR/NL ------------------------------- */
const translationsSrc = read("src/lib/translations.ts");
const dictKeys = new Set<string>();
const STR = `(?:"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')`;
for (const m of translationsSrc.matchAll(
  new RegExp(`"([\\w.\\-]+)":\\s*\\{\\s*fr:\\s*(${STR})\\s*,\\s*nl:\\s*(${STR})\\s*\\}`, "g"),
)) {
  const [, key, fr, nl] = m;
  dictKeys.add(key);
  if (fr.length <= 2) add("Dictionnaire — valeur FR vide", key);
  if (nl.length <= 2) add("Dictionnaire — valeur NL vide", key);
}
for (const m of translationsSrc.matchAll(/^\s{2}"?([\w.\-]+)"?:\s*\{/gm)) {
  const key = m[1];
  if (!dictKeys.has(key)) add("Dictionnaire — clé incomplète (fr ou nl absent)", key);
}

/* 2. Clés t("…") utilisées mais absentes du dictionnaire ------------------ */
for (const file of files) {
  const src = read(file);
  for (const m of src.matchAll(/\bt\(\s*"([\w.\-]+)"/g)) {
    if (!dictKeys.has(m[1])) add("Clé utilisée mais absente du dictionnaire", `${file} → t("${m[1]}")`);
  }
}

/* 3. Chapitres sans titre néerlandais ------------------------------------ */
const chaptersNlSrc = read("src/data/nl/chaptersNl.ts");
const chaptersSrc = read("src/lib/chapters.ts");
const chapterIds = new Set([...chaptersSrc.matchAll(/id:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
for (const id of chapterIds) {
  const quoted = chaptersNlSrc.includes(`"${id}"`);
  const bare = new RegExp(`^\\s{2}${id}:\\s*\\{`, "m").test(chaptersNlSrc);
  if (!quoted && !bare) add("Chapitre sans titre NL (CHAPTERS_NL)", id);
}

/* 4. Histoires interactives (StoryReader) --------------------------------- */
const storyFiles = walk("src/data/stories").filter((f) => !f.endsWith("index.ts"));
for (const file of storyFiles) {
  const src = read(file);
  const count = (re: RegExp) => [...src.matchAll(re)].length;
  const checks: [string, number, number][] = [
    ["titre", count(/(^|\s)title:\s*"/gm), count(/titleFr:\s*"/g)],
    ["scène", count(/(^|\s)text:\s*"/gm), count(/textFr:\s*"/g)],
    ["question", count(/(^|\s)question:\s*"/gm), count(/questionFr:\s*"/g)],
    ["option", count(/(^|\s)label:\s*"/gm), count(/labelFr:\s*"/g)],
  ];
  for (const [what, nl, fr] of checks) {
    if (nl > fr) add("Histoire — traduction FR manquante", `${file} → ${nl - fr} ${what}(s) sans version FR`);
  }
}

/* 5. Textes FR codés en dur sans équivalent NL_STRINGS -------------------- */
const nlStringsSrc = read("src/data/nl/uiStringsNl.ts");
const nlStrings = new Set(
  [...nlStringsSrc.matchAll(/^\s{2}"((?:[^"\\]|\\.)+)":/gm)].map((m) => m[1].replace(/\\"/g, '"')),
);
const JSX_TEXT = />\s*([A-ZÀ-Ÿ][^<>{}\n]{3,})\s*</g;
const IGNORE = /^[\s\d%·—/+.:!?()–-]*$/;
for (const file of files) {
  const src = read(file);
  for (const m of src.matchAll(JSX_TEXT)) {
    const text = m[1].trim();
    if (IGNORE.test(text) || /^[A-Z_]+$/.test(text) || /\s\/\s/.test(text)) continue;
    if (!nlStrings.has(text)) add("Texte FR en dur sans traduction NL", `${file} → "${text}"`);
  }
}

/* Rapport ----------------------------------------------------------------- */
const sections = Object.keys(report);
if (sections.length === 0) {
  console.log("✅ Audit i18n : aucune clé FR/NL manquante (chapitres, jeux, histoires).");
  process.exit(0);
}

let total = 0;
for (const section of sections) {
  const lines = [...new Set(report[section])].sort();
  total += lines.length;
  console.log(`\n── ${section} (${lines.length})`);
  for (const line of lines) console.log(`   • ${line}`);
}
console.log(`\n❌ ${total} problème(s) i18n à corriger.`);
process.exit(1);
