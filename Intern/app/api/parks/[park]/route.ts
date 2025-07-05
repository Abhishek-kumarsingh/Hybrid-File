import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Park } from "@/types/types";

// Adjust the types in the function signature for clarity
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const park = searchParams.get("park");

  // Ensure `park` query parameter is a valid string
  if (!park || typeof park !== "string") {
    return NextResponse.json({ message: "Invalid park parameter" });
  }

  try {
    // Get a MongoDB client connection
    const mongoose = await dbConnect(); // Ensure dbConnect returns a mongoose instance
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Fetch park data by either name or type
    const parkData = (await db.collection("parksCollection").findOne({
      $or: [
        { url: park }, // Search by 'url' field
        { type: park }, // Or search by 'type' field
      ],
    })) as Park | null; // Assert the type to be either a Park or null

    // If no park data is found, return a 404 error
    if (!parkData) {
      return NextResponse.json({ message: "Park not found" }, { status: 404 });
    }

    // Return the found park data
    return NextResponse.json(parkData);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
