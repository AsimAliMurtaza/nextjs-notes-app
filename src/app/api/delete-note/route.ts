// app/api/delete-note/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb";

export async function DELETE(request: Request) {
  await connectDB();

  const { noteId } = await request.json();

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}
