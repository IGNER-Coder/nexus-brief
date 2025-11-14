import { prisma } from "../lib/prisma";
import StockRuleForm from "./components/StockRuleForm";
import HnRuleForm from "./components/HnRuleForm";
import NewsRuleForm from "./components/NewsRuleForm";
import Link from "next/link";

export default async function Home() {
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
    // 1. Use a wider main container, with padding
    <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* 2. Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Configuration
        </h1>
        <Link href="/dashboard" className="text-teal-600 hover:underline font-medium">
          View Dashboard &rarr;
        </Link>
      </div>

      {/* --- Stock Module Card --- */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <StockRuleForm />
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">Current Stock Rules</h2>
          <ul className="mt-4 space-y-2">
            {stockRules.length > 0 ? (
              stockRules.map((rule) => (
                <li
                  key={rule.id}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <span>
                    <span className="font-medium text-black">{rule.symbol}:</span>
                    <span className="text-gray-700">
                      {' '}
                      Alert if {rule.condition} ${rule.price}
                    </span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {rule.createdAt.toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No stock rules added yet.</p>
            )}
          </ul>
        </div>
      </section>

      {/* --- HN Module Card --- */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <HnRuleForm />
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">Current Hacker News Rules</h2>
          <ul className="mt-4 space-y-2">
            {hnRules.length > 0 ? (
              hnRules.map((rule) => (
                <li
                  key={rule.id}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <span>
                    <span className="font-medium text-black">
                      Keyword: '{rule.keyword}'
                    </span>
                    <span className="text-gray-700">
                      {' '}
                      if &gt; {rule.minPoints} points
                    </span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {rule.createdAt.toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No HN rules added yet.</p>
            )}
          </ul>
        </div>
      </section>

      {/* --- News Module Card --- */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <NewsRuleForm />
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">Current News Rules</h2>
          <ul className="mt-4 space-y-2">
            {newsRules.length > 0 ? (
              newsRules.map((rule) => (
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
              ))
            ) : (
              <p className="text-sm text-gray-500">No news rules added yet.</p>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}

// Re-export this to ensure page auto-refreshes
export const revalidate = 0;