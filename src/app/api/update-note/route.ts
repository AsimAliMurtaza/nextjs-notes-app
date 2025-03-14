// app/api/updateNote/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, title, content } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note updated successfully", updatedNote },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}
