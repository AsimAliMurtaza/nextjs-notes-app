// app/api/getNotes/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb"; // Utility to connect to MongoDB

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB

    const notes = await Note.find().sort({ createdAt: -1 }); // Fetch notes sorted by creation date

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ message: "Failed to fetch notes" }, { status: 500 });
  }
}
