// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://paigeponzeka.github.io',
  base: '/workout-program-browser',
  integrations: [mdx()],
  vite: {
    plugins: [
      // @ts-ignore - Fix type mismatch
      tailwindcss()
    ],
  },
  // Ensure clean URLs and proper trailing slash handling
  trailingSlash: "ignore",
  build: {
    format: "directory"
  },
  // Explicitly define routes for better control
  routes: [
    {
      pattern: "/workouts/[month]/[day]",
      component: "./src/pages/workouts/[month]/[day].astro"
    },
    {
      pattern: "/workouts/[month]",
      component: "./src/pages/workouts/[month]/index.astro"
    }
  ]
});
