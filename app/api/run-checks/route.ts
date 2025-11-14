import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// --- Helper Function 1: Check Stock Rules ---
async function checkStockRules() {
  const rules = await prisma.stockRule.findMany();
  const finnhubKey = process.env.FINNHUB_API_KEY;

  if (!finnhubKey) {
    console.error("Finnhub API key is not set.");
    return;
  }

  for (const rule of rules) {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${rule.symbol}&token=${finnhubKey}`
      );
      if (!response.ok) {
        console.error(`Invalid symbol or API error for: ${rule.symbol}`);
        continue; // Skip this rule
      }

      const data = await response.json();
      const currentPrice = data.c; // 'c' is 'current price' in Finnhub

      if (!currentPrice) {
        console.warn(`No price data for symbol: ${rule.symbol}`);
        continue; // Skip if no price data
      }

      let triggered = false;
      if (rule.condition === "above" && currentPrice > rule.price) {
        triggered = true;
      }
      if (rule.condition === "below" && currentPrice < rule.price) {
        triggered = true;
      }

      if (triggered) {
        const message = `${
          rule.symbol
        } is now $${currentPrice}, which is ${rule.condition} your threshold of $${
          rule.price
        }.`;
        await prisma.alert.create({
          data: {
            source: "Stock",
            message: message,
          },
        });
      }
    } catch (error) {
      console.error(`Failed to process stock rule ${rule.id}:`, error);
      continue; // Skip to the next rule
    }
  }
}

// --- Helper Function 2: Check Hacker News Rules ---
async function checkHnRules() {
  const rules = await prisma.hnRule.findMany();

  for (const rule of rules) {
    try {
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${rule.keyword}&tags=story&numericFilters=points>${rule.minPoints}`
      );
      if (!response.ok) {
        console.error(`Error fetching HN data for: ${rule.keyword}`);
        continue;
      }

      const data = await response.json();
      for (const story of data.hits) {
        const storyUrl = story.url || `https://news.ycombinator.com/item?id=${story.objectID}`;

        // IMPORTANT: Check if we've already alerted for this story
        const existingAlert = await prisma.alert.findFirst({
          where: { url: storyUrl },
        });

        if (!existingAlert) {
          const message = `[${story.points}pts] ${story.title}`;
          await prisma.alert.create({
            data: {
              source: "Hacker News",
              message: message,
              url: storyUrl,
            },
          });
        }
      }
    } catch (error) {
      console.error(`Failed to process HN rule ${rule.id}:`, error);
      continue;
    }
  }
}

// --- Helper Function 3: Check News API Rules ---
async function checkNewsRules() {
  const rules = await prisma.newsRule.findMany();
  const newsKey = process.env.NEWS_API_KEY;

  if (!newsKey) {
    console.error("NewsAPI key is not set.");
    return;
  }

  for (const rule of rules) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${rule.keyword}&apiKey=${newsKey}`
      );
      if (!response.ok) {
        console.error(`Error fetching News data for: ${rule.keyword}`);
        continue;
      }

      const data = await response.json();
      for (const article of data.articles) {
        const articleUrl = article.url;

        // IMPORTANT: Check if we've already alerted for this article
        const existingAlert = await prisma.alert.findFirst({
          where: { url: articleUrl },
        });

        if (articleUrl && !existingAlert) {
          const message = article.title;
          await prisma.alert.create({
            data: {
              source: "News",
              message: message,
              url: articleUrl,
            },
          });
        }
      }
    } catch (error) {
      console.error(`Failed to process News rule ${rule.id}:`, error);
      continue;
    }
  }
}

// --- MAIN API ROUTE (The "Robot") ---
// This is the function Vercel Cron will "click"
export async function GET(request: Request) {
  try {
    // Run all our check functions in order
    await checkStockRules();
    await checkHnRules();
    await checkNewsRules();

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error running checks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}