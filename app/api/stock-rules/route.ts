import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// This is the correct signature for a dynamic route handler
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 'params' will now correctly contain the 'id'
    const id = params.id; 

    // We'll log it to be sure
    console.log('Received ID for deletion:', id);

    if (!id) {
      throw new Error("ID not received");
    }

    await prisma.stockRule.delete({
      where: {
        id: id, // This will now be the real ID, not undefined
      },
    });

    return NextResponse.json(
      { message: "Rule deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting stock rule:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}