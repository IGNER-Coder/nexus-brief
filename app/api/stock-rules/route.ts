import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// This function handles POST requests to /api/stock-rules
export async function POST(request: Request) {
  try {
    // 1. Get the data from the frontend's request
    const body = await request.json();
    const { symbol, condition, price } = body;

    // 2. Validate the data (simple version)
    if (!symbol || !condition || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Use Prisma to create the new StockRule in the database
    const newStockRule = await prisma.stockRule.create({
      data: {
        symbol: symbol,
        condition: condition,
        price: parseFloat(price), // Convert price to a number
      },
    });

    // 4. Send the new rule back to the frontend as confirmation
    return NextResponse.json(newStockRule, { status: 201 }); // 201 = "Created"
  } catch (error) {
    console.error("Error creating stock rule:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}