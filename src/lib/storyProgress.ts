import { supabase } from "@/integrations/supabase/client";

export interface StoryProgress {
  sceneIndex: number;
  bookmarked: boolean;
  completed: boolean;
}

type ProgressMap = Record<string, StoryProgress>;

const storageKey = (childId: string) => `nederdys.story-progress.v1.${childId}`;

function readLocal(childId: string): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey(childId)) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

export function getLocalStoryProgress(childId?: string): ProgressMap {
  return childId ? readLocal(childId) : {};
}

export async function getStoryProgress(childId?: string): Promise<ProgressMap> {
  const local = getLocalStoryProgress(childId);
  if (!childId) return local;

  // The server copy syncs bookmarks and resume position between a child's devices.
  // Local progress remains available if the migration has not been applied yet.
  const { data, error } = await supabase
    .from("child_story_reading")
    .select("story_id,current_scene,bookmarked,completed_at")
    .eq("child_id", childId);
  if (error || !data) return local;

  const merged = { ...local };
  for (const row of data) {
    merged[row.story_id] = {
      sceneIndex: Math.max(0, row.current_scene ?? 0),
      bookmarked: !!row.bookmarked,
      completed: !!row.completed_at,
    };
  }
  return merged;
}

export async function saveStoryProgress(
  childId: string | undefined,
  storyId: string,
  progress: StoryProgress
) {
  if (!childId) return;
  const next = { ...readLocal(childId), [storyId]: progress };
  try {
    localStorage.setItem(storageKey(childId), JSON.stringify(next));
  } catch {
    // Reading still works when browser storage is unavailable.
  }

  await supabase.rpc("save_story_reading_progress", {
    p_child_id: childId,
    p_story_id: storyId,
    p_current_scene: progress.sceneIndex,
    p_bookmarked: progress.bookmarked,
  });
}

export async function completeStoryOnServer(childId: string, storyId: string) {
  const { data, error } = await supabase.rpc("complete_story_reading", {
    p_child_id: childId,
    p_story_id: storyId,
  });
  if (error) return { ok: false, xpAwarded: 0 };
  const result = data as { ok?: boolean; xp_awarded?: number } | null;
  return { ok: !!result?.ok, xpAwarded: result?.xp_awarded ?? 0 };
}
