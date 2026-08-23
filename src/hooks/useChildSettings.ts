import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getChildSettings, upsertChildSettings } from "@/lib/parent";

export interface ChildPrefs {
  dark_mode: boolean;
  dyslexic_font: boolean;
  reduced_motion: boolean;
  sound_effects: boolean;
}

export const DEFAULT_PREFS: ChildPrefs = {
  dark_mode: false,
  dyslexic_font: true,
  reduced_motion: false,
  sound_effects: true,
};

/** Applique immédiatement les préférences au document. */
export const applyChildPrefs = (prefs: ChildPrefs) => {
  const root = document.documentElement;
  root.classList.toggle("dark", prefs.dark_mode);
  root.classList.toggle("dyslexic", prefs.dyslexic_font);
  root.classList.toggle("reduced-motion", prefs.reduced_motion);
};

export const useChildSettings = (childId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["childSettings", childId],
    queryFn: () => getChildSettings(childId!),
    enabled: !!childId,
  });

  const prefs: ChildPrefs = {
    dark_mode: data?.dark_mode ?? DEFAULT_PREFS.dark_mode,
    dyslexic_font: data?.dyslexic_font ?? DEFAULT_PREFS.dyslexic_font,
    reduced_motion: data?.reduced_motion ?? DEFAULT_PREFS.reduced_motion,
    sound_effects: data?.sound_effects ?? DEFAULT_PREFS.sound_effects,
  };

  useEffect(() => {
    if (!childId || isLoading) return;
    applyChildPrefs(prefs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childId, isLoading, prefs.dark_mode, prefs.dyslexic_font, prefs.reduced_motion]);

  const toggle = useCallback(
    async (key: keyof ChildPrefs) => {
      if (!user || !childId) return;
      const next = { ...prefs, [key]: !prefs[key] };
      applyChildPrefs(next);
      queryClient.setQueryData(
        ["childSettings", childId],
        (old: Record<string, unknown> | null | undefined) => ({ ...(old ?? {}), ...next })
      );
      await upsertChildSettings(user.id, childId, { [key]: next[key] } as never);
      queryClient.invalidateQueries({ queryKey: ["childSettings", childId] });
    },
    [user, childId, prefs, queryClient]
  );

  return { prefs, isLoading, toggle };
};
