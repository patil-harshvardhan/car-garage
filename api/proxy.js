import { createProxyMiddleware } from "http-proxy-middleware";

export default async (req, res) => {
  const proxy = createProxyMiddleware({
    target: process.env.VITE_API_URL,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("x-api-key", process.env.VITE_API_KEY);
      proxyReq.setHeader("Content-Type", "application/json");
      console.log(`[Request] ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes) => {
      console.log(`[Response] Status: ${proxyRes.statusCode}`);
    },
  });

  await proxy(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
