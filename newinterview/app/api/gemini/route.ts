// Example: app/api/gemini-chat/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";

const EXPRESS_BACKEND_AI_URL = process.env.BACKEND_API_URL // Your Express backend base URL
  ? `${process.env.BACKEND_API_URL}/api/ai/generate-content`
  : "http://localhost:3001/api/ai/generate-content"; // Fallback

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    console.log(
      "Next.js Proxy: Forwarding prompt to Express backend:",
      prompt.substring(0, 50) + "..."
    );

    // Call your Express backend
    const backendResponse = await fetch(EXPRESS_BACKEND_AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You might want to forward certain headers, e.g., an internal auth token if needed
      },
      body: JSON.stringify({ prompt }), // Forward the prompt
    });

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error("Next.js Proxy: Error from Express backend:", responseData);
      return NextResponse.json(
        {
          error: "Error from AI service via backend",
          message:
            responseData.message ||
            responseData.error ||
            "Unknown backend error",
        },
        { status: backendResponse.status }
      );
    }

    // The Express backend already returns { text, model }
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Next.js Proxy: Internal error:", error);
    return NextResponse.json(
      { error: "Proxy internal server error", message: error.message },
      { status: 500 }
    );
  }
}
