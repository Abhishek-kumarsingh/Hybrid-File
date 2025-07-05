import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Import the updated client from dbconnect.ts
import { Park } from "@/types/types";

export async function GET(request: Request) {
  try {
    // Get a MongoDB client
    const mongoose = await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }
    // Fetch park data by either name or type
    const parkDataArray = await db
      .collection("parksCollection")
      .find()
      .toArray(); // Assert that the result is of type Park or null
    const parks: Park[] = parkDataArray.map((doc) => ({
      _id: doc.name,
      region: doc.region,
      division: doc.division,
      name: doc.name,
      area: doc.area,
      horticulture: doc.horticulture,
      description: doc.description,
      url: doc.url,
      latitude: doc.latitude,
      longitude: doc.longitude,
    }));
    // If no data is found, return a 404 error
    if (!parks) {
      return NextResponse.json({ message: "Park not found" }, { status: 404 });
    }
    // Return the found park data
    return NextResponse.json(parks);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
