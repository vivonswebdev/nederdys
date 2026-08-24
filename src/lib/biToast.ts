import { toast } from "sonner";
import { Bilingual, getChildLanguage, orderedPair } from "./bilingual";

/**
 * Notifications bilingues : tout message montré à un enfant existe en NL et en FR.
 * La langue de l'enfant actif est affichée en premier.
 */
const line = (phrase: Bilingual): string => {
  const [first, second] = orderedPair(phrase, getChildLanguage());
  return first.trim() === second.trim() ? first : `${first} — ${second}`;
};

export const biToast = {
  success: (phrase: Bilingual) => toast.success(line(phrase)),
  error: (phrase: Bilingual) => toast.error(line(phrase)),
  info: (phrase: Bilingual) => toast(line(phrase)),
};
