export async function POST(req) {
  const body = await request.json();
  const { registrationNumber } = body;

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
  return new Response(JSON.stringify(data), {
    status: apiRes.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
}
