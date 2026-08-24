import type { Story } from "@/lib/stories";
import { deVerjaardagStory } from "./de-verjaardag";
import { hetHuisdierStory } from "./het-huisdier";

export const STORIES: Story[] = [deVerjaardagStory, hetHuisdierStory];

export const storyById = (id?: string): Story | undefined =>
  STORIES.find((s) => s.id === id);

export { deVerjaardagStory, hetHuisdierStory };
