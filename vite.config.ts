import react from "@vitejs/plugin-react-swc";
import { loadEnv, defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
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
