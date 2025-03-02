import path from "path";

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  // Remove the base path setting for Vercel deployment
  base: "",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
