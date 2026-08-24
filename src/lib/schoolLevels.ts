// Niveaux scolaires belges (enseignement primaire)
export const SCHOOL_LEVELS = [
  { id: "m1", label: "1re maternelle (3-4 ans)" },
  { id: "m2", label: "2e maternelle (4-5 ans)" },
  { id: "p1", label: "1re primaire" },
  { id: "p2", label: "2e primaire" },
  { id: "p3", label: "3e primaire" },
  { id: "p4", label: "4e primaire" },
  { id: "p5", label: "5e primaire" },
  { id: "p6", label: "6e primaire" },
] as const;

export const isKindergartenLevel = (value?: string | null) =>
  normalizeSchoolLevel(value).startsWith("m");


export const DEFAULT_SCHOOL_LEVEL = "p3";

// Ancien système français encore présent dans certaines fiches enfants
const LEGACY_MAP: Record<string, string> = {
  cp: "p1",
  ce1: "p2",
  ce2: "p3",
  cm1: "p4",
  cm2: "p5",
};

export const normalizeSchoolLevel = (value?: string | null): string => {
  if (!value) return DEFAULT_SCHOOL_LEVEL;
  const v = value.toLowerCase();
  return LEGACY_MAP[v] ?? v;
};

export const schoolLevelLabel = (value?: string | null): string => {
  const id = normalizeSchoolLevel(value);
  return SCHOOL_LEVELS.find((l) => l.id === id)?.label ?? id.toUpperCase();
};

export const GENDER_OPTIONS = [
  { id: "girl", label: "👧 Fille" },
  { id: "boy", label: "👦 Garçon" },
] as const;
