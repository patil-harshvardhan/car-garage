import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ command }) => ({
  server:
    command === "serve"
      ? {
          proxy: {
            "/api": {
              target: process.env.VITE_API_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
              configure: (proxy) => {
                proxy.on("proxyReq", (proxyReq, req, res) => {
                  console.log(`[Request]\t ${req.method}\t ${req.url}`);
                  proxyReq.setHeader("x-api-key", process.env.VITE_API_KEY);
                  proxyReq.setHeader("Content-Type", "application/json");
                });
                proxy.on("proxyRes", (proxyRes, req, res) => {
                  proxyRes.on("end", () => {
                    console.log(
                      `[Response]\t ${req.method}\t ${req.url} - Status: ${proxyRes.statusCode}`
                    );
                  });
                });
              },
            },
          },
        }
      : undefined,
}));
