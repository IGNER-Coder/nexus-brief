import { prisma } from "../../../lib/prisma"; // RIGHT (goes up 3 levels)
import { NextResponse } from "next/server";

// This function handles POST requests to /api/hn-rules
export async function POST(request: Request) {
  try {
    // 1. Get the data from the frontend's request
    const body = await request.json();
    const { keyword, minPoints } = body;

    // 2. Validate the data
    if (!keyword || !minPoints) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Use Prisma to create the new HnRule in the database
    const newHnRule = await prisma.hnRule.create({
      data: {
        keyword: keyword,
        minPoints: parseInt(minPoints, 10), // Convert points to a number
      },
    });

    // 4. Send the new rule back to the frontend as confirmation
    return NextResponse.json(newHnRule, { status: 201 }); // 201 = "Created"
  } catch (error) {
    console.error("Error creating HN rule:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}