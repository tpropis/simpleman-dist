import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    // The WebGL hero chunk is intentionally large and lazy-loaded.
    chunkSizeWarningLimit: 1000,
  },
});
