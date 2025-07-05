import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Park } from "@/types/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get("region");
  const division = searchParams.get("division");

  try {
    const mongoose = await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }
    const parksCollection = db.collection("parksCollection");

    const parks = await parksCollection
      .find({ region, division })
      .project({ name: 1, url: 1, _id: 0 })
      .toArray();
    return NextResponse.json(parks);
  } catch (error) {
    console.error("Error fetching parks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
