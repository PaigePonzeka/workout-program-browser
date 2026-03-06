import { defineCollection, z } from "astro:content";

const workoutSchema = z.object({
  title: z.string(),
  monthSlug: z.string().optional(),
  startDate: z.string().optional(),
  featured: z.boolean().optional(),
  dayNumber: z.number().optional(),
});

const workouts = defineCollection({ type: "content", schema: workoutSchema });
const testWorkouts = defineCollection({ type: "content", schema: workoutSchema });

export const collections = { workouts, "test-workouts": testWorkouts };
