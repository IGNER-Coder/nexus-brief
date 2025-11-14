import { prisma } from "../lib/prisma";
import StockRuleForm from "./components/StockRuleForm";
import HnRuleForm from "./components/HnRuleForm";
import NewsRuleForm from "./components/NewsRuleForm"; // 1. Import the final form

// This is a Server Component
export default async function Home() {
  
  // 2. Fetch ALL THREE sets of rules
  const stockRules = await prisma.stockRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  const hnRules = await prisma.hnRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  const newsRules = await prisma.newsRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 max-w-lg mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Project In-Brief: Config</h1>

      {/* --- Stock Module --- */}
      <section>
        <StockRuleForm />
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

      {/* --- HN Module --- */}
      <section>
        <HnRuleForm />
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Current Hacker News Rules</h2>
          <ul className="mt-4 space-y-2">
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

      {/* --- News Module (NEW SECTION) --- */}
      <section>
        <NewsRuleForm /> {/* 3. Render the new News form */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Current News Rules</h2>
          <ul className="mt-4 space-y-2">
            {/* 4. Render the new News rule list */}
            {newsRules.map((rule) => (
              <li
                key={rule.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <span>
                  <span className="font-medium text-black">
                    Keyword: '{rule.keyword}'
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