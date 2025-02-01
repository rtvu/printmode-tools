import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT),
      strictPort: true,
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT),
    },
  };
});
