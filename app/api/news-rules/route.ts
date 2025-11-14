import { prisma } from "../../../lib/prisma"; // Go up 3 levels
import { NextResponse } from "next/server";

// This function handles POST requests to /api/news-rules
export async function POST(request: Request) {
  try {
    // 1. Get the data
    const body = await request.json();
    const { keyword } = body;

    // 2. Validate
    if (!keyword) {
      return NextResponse.json(
        { error: "Missing required keyword" },
        { status: 400 }
      );
    }

    // 3. Use Prisma to create the new NewsRule
    const newNewsRule = await prisma.newsRule.create({
      data: {
        keyword: keyword,
      },
    });

    // 4. Send confirmation
    return NextResponse.json(newNewsRule, { status: 201 });
  } catch (error) {
    console.error("Error creating news rule:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}