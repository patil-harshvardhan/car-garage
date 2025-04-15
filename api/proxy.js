// api/proxy.js

export default async function handler(req, res) {
  const targetUrl = process.env.VITE_API_URL + req.url.replace(/^\/api/, "");
  const apiKey = process.env.VITE_API_KEY;

  // Prepare headers
  const headers = {
    ...req.headers,
    "x-api-key": apiKey,
    "content-type": "application/json",
  };

  // Prepare fetch options
  const options = {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
  };

  // Proxy the request
  const response = await fetch(targetUrl, options);

  // Forward the response
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const data = await response.text();
  res.send(data);
}
