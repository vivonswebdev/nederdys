import { describe, it, expect } from "vitest";
import { translations } from "./translations";

/**
 * Structure réelle : `translations = { fr: { clé: "…" }, nl: { clé: "…" } }`.
 * Ce test échoue dès qu'une clé existe dans une langue mais pas dans l'autre,
 * ou qu'elle est déclarée avec une valeur vide.
 */
describe("Complétude des traductions FR/NL", () => {
  const languages = ["fr", "nl"] as const;
  const allKeys = new Set(languages.flatMap((l) => Object.keys(translations[l])));

  it("aucune clé ne doit manquer de valeur fr ou nl", () => {
    const missing: string[] = [];
    for (const key of allKeys) {
      for (const lang of languages) {
        const value = (translations[lang] as Record<string, string>)[key];
        if (!value || !value.trim()) missing.push(`${key} → ${lang} manquant`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("les deux dictionnaires ont exactement les mêmes clés", () => {
    expect(Object.keys(translations.fr).sort()).toEqual(Object.keys(translations.nl).sort());
  });
});
