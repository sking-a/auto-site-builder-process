import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const footballDataToken = env.FOOTBALL_DATA_API_KEY;
  const proxyConfig = {
    target: "https://api.football-data.org/v4",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api\/football-data/, ""),
    configure: (proxy: { on: (event: string, handler: (proxyReq: { setHeader: (name: string, value: string) => void }) => void) => void }) => {
      proxy.on("proxyReq", (proxyReq) => {
        if (footballDataToken) {
          proxyReq.setHeader("X-Auth-Token", footballDataToken);
        }
      });
    },
  };

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/football-data": proxyConfig,
      },
    },
    preview: {
      proxy: {
        "/api/football-data": proxyConfig,
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
    },
  };
});
