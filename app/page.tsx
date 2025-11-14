import { prisma } from "../lib/prisma"; // 1. Import our Prisma client
import StockRuleForm from "./components/StockRuleForm";// 2. Import your new form

// This is now a Server Component by default (no 'use client')
export default async function Home() {
  
  // 3. Fetch all saved stock rules directly from the database
  const stockRules = await prisma.stockRule.findMany({
    orderBy: {
      createdAt: "desc", // Show the newest rules first
    },
  });

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project In-Brief</h1>

      {/* 4. Render the interactive form component */}
      <StockRuleForm />

      {/* 5. Render the list of rules we just fetched */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Current Stock Rules</h2>
        <ul className="mt-4 space-y-2">
          {stockRules.map((rule) => (
            <li
              key={rule.id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <span>
                <span className="font-medium text-black">{rule.symbol}:</span>
                <span className="text-gray-700">
                  {" "}
                  Alert if {rule.condition} ${rule.price}
                </span>
              </span>
              <span className="text-xs text-gray-500">
                {rule.createdAt.toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// Re-export this to ensure page auto-refreshes on form submission
export const revalidate = 0;