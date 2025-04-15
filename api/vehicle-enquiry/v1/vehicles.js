export async function POST(req) {
  try {
    const body = await req.json();
    const { registrationNumber } = body;

    const apiRes = await fetch(process.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VITE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registrationNumber }),
    });
    const data = await apiRes.json();

    return new Response(JSON.stringify(data), {
      status: apiRes.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching car details:", error);
    return new Response(
      JSON.stringify({
        errors: [
          {
            status: "500",
            code: "500",
            title: "Internal Server Error",
            detail: "Something went wrong while fetching car details.",
          },
        ],
      }),
      {
        status: 500,
      }
    );
  }
}
