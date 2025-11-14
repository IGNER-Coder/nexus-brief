import { prisma } from "../lib/prisma"; // Use relative path
import StockRuleForm from "./components/StockRuleForm"; // Use relative path
import HnRuleForm from "./components/HnRuleForm"; // 1. Import the new form

// This is a Server Component
export default async function Home() {
  
  // 2. Fetch BOTH sets of rules
  const stockRules = await prisma.stockRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  const hnRules = await prisma.hnRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 max-w-lg mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Project In-Brief</h1>

      {/* --- Stock Module --- */}
      <section>
        <StockRuleForm /> {/* Your existing form */}
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
      </section>

      {/* --- HN Module (NEW SECTION) --- */}
      <section>
        <HnRuleForm /> {/* 3. Render the new HN form */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Current Hacker News Rules</h2>
          <ul className="mt-4 space-y-2">
            {/* 4. Render the new HN rule list */}
            {hnRules.map((rule) => (
              <li
                key={rule.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <span>
                  <span className="font-medium text-black">
                    Keyword: '{rule.keyword}'
                  </span>
                  <span className="text-gray-700">
                    {" "}
                    if &gt; {rule.minPoints} points
                  </span>
                </span>
                <span className="text-xs text-gray-500">
                  {rule.createdAt.toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

// Re-export this to ensure page auto-refreshes on form submission
export const revalidate = 0;