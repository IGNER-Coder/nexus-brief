import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // This will now work!

    await prisma.stockRule.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Rule deleted" },
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