import { defineCollection, z } from "astro:content";

const workouts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    monthSlug: z.string().optional(),
  }),
});

export const collections = { workouts };
