import type { Story } from "@/lib/stories";
import { deVerjaardagStory } from "./de-verjaardag";
import { hetHuisdierStory } from "./het-huisdier";
import { newStories } from "./new-stories";

export const STORIES: Story[] = [deVerjaardagStory, hetHuisdierStory, ...newStories];

export const storyById = (id?: string): Story | undefined =>
  STORIES.find((s) => s.id === id);

export { deVerjaardagStory, hetHuisdierStory };
