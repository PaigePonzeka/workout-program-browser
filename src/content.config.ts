import { defineCollection, z } from "astro:content";

const workouts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    monthSlug: z.string().optional(),
    startDate: z.string().optional(),
    featured: z.boolean().optional(),
    dayNumber: z.number().optional(),
  }),
});

export const collections = { workouts };
