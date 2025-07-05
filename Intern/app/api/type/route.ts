import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { WithId, Document } from "mongodb";
import { Park } from "@/types/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawType = searchParams.get("type");

  // Decode and validate the `type` parameter
  const decodedType = decodeURIComponent(rawType || "").trim();
  if (!decodedType) {
    return NextResponse.json(
      { message: "Invalid or missing `type` query parameter" },
      { status: 400 }
    );
  }

  console.log("Decoded query parameter:", decodedType);

  try {
    // Connect to the database
    const mongoose = await dbConnect();
    const db = mongoose.connection.db;

    if (!db) {
      console.error("Database connection failed");
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Query the database
    const parkDocuments = await db
      .collection("parksCollection")
      .find({
        $or: [{ division: decodedType }, { region: decodedType }],
      })
      .toArray();

    console.log("Number of parks found:", parkDocuments.length);

    if (parkDocuments.length === 0) {
      return NextResponse.json({ message: "No parks found" }, { status: 404 });
    }

    // Map results to the `Park` type
    const parkData: Park[] = parkDocuments.map((doc: WithId<Document>) => ({
      _id: doc._id?.toString() || "",
      region: doc.region || "",
      division: doc.division || "",
      name: doc.name || "",
      area: doc.area || 0,
      horticulture: doc.horticulture || false,
      description: doc.description || "",
      url: doc.url || "",
      latitude: doc.latitude || 0,
      longitude: doc.longitude || 0,
    }));

    return NextResponse.json(parkData);
  } catch (error) {
    console.error("Error fetching parks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
