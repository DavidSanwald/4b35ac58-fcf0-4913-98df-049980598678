/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.ts",
    css: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    legacy({
      polyfills: ["es.promise.finally", "es/map", "es/set"],
      modernPolyfills: [
        "es.promise.finally",
        "es.array.flat",
        "es.array.flat-map",
      ],
    }),
  ],
});
