import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: Number(process.env["VITE_PORT"]),
    strictPort: true,
  },
  preview: {
    port: Number(process.env["VITE_PREVIEW_PORT"]),
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/js/__testing__/vitest-setup.ts"],
  },
});
