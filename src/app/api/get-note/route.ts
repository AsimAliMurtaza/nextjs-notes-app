// app/api/getNote/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Note ID is required" },
        { status: 400 }
      );
    }

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { message: "Failed to fetch note" },
      { status: 500 }
    );
  }
}
