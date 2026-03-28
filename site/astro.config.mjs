import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://swivei.github.io",
  base: "/LPD-Tools/",
  publicDir: "public",
  outDir: "dist",
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});