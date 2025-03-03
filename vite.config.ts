import path from "path";

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  base: process.env.NODE_ENV === "production" ? "/supa-solid-user" : "",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~ui": path.resolve(__dirname, "./src/components/ui"),
      "~lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
