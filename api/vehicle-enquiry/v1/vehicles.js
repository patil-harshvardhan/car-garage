export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { registrationNumber } = req.body;

  // Forward the request to the real API
  console.log("Received registration number:", registrationNumber);

  console.log(process.env.VITE_API_URL);
  const apiRes = await fetch(process.env.VITE_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ registrationNumber }),
  });
  const data = await apiRes.json();
  console.log("API response:", data);
  res.status(apiRes.status).json(data);
}
