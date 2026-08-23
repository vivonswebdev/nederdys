/** Utilitaires de date en heure LOCALE (Europe/Brussels côté utilisateur). */

/** Date locale au format YYYY-MM-DD (jamais UTC). */
export const localDateISO = (d: Date = new Date()): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/** Jour local décalé de `offset` jours (négatif = passé). */
export const localDateOffset = (offset: number, from: Date = new Date()): string => {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  d.setDate(d.getDate() + offset);
  return localDateISO(d);
};

/** Millisecondes restantes avant minuit local. */
export const msUntilLocalMidnight = (from: Date = new Date()): number => {
  const next = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 0, 0, 5);
  return next.getTime() - from.getTime();
};

/** Formate une date "YYYY-MM-DD" sans conversion de fuseau. */
export const formatLocalDay = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("fr-BE", opts);
};
