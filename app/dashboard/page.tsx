import { prisma } from "../../lib/prisma";
import Link from "next/link";
// 1. Import the icons we'll use
import {
  HiChartBar,
  HiFire,
  HiGlobeAlt,
  HiBell,
} from "react-icons/hi";

// 2. Helper function to get the right icon and color
const getAlertDetails = (source: string) => {
  switch (source) {
    case "Stock":
      return {
        icon: <HiChartBar className="h-5 w-5" />,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
      };
    case "Hacker News":
      return {
        icon: <HiFire className="h-5 w-5" />,
        color: "text-orange-500",
        bgColor: "bg-orange-100",
      };
    case "News":
      return {
        icon: <HiGlobeAlt className="h-5 w-5" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
      };
    default:
      return {
        icon: <HiBell className="h-5 w-5" />,
        color: "text-gray-500",
        bgColor: "bg-gray-100",
      };
  }
};

export default async function DashboardPage() {
  const alerts = await prisma.alert.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Alert Dashboard</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Config
        </Link>
      </div>

      {/* 3. Use CSS Grid for a nice card layout */}
      <ul className="grid grid-cols-1 gap-5">
        {alerts.map((alert) => {
          // 4. Get the custom details for each card
          const { icon, color, bgColor } = getAlertDetails(alert.source);

          return (
            <li
              key={alert.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Card Header */}
              <div
                className={`flex items-center space-x-3 p-4 border-b ${bgColor}`}
              >
                <span className={color}>{icon}</span>
                <span className={`font-semibold ${color}`}>
                  {alert.source} Alert
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <p className="text-gray-700 text-lg mb-3">{alert.message}</p>
                
                {/* Card Footer with Link & Timestamp */}
                <div className="flex justify-between items-center">
                  {alert.url ? (
                    <a
                      href={alert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm font-medium hover:underline"
                    >
                      View Source
                    </a>
                  ) : (
                    <span></span> // Empty span to keep alignment
                  )}
                  <span className="text-xs text-gray-500">
                    {alert.createdAt.toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          );
        })}

        {alerts.length === 0 && (
          <div className="text-center text-gray-500 col-span-1 p-10 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium">No alerts yet...</h3>
            <p className="mt-2">
              Your robot hasn't found anything matching your rules.
            </p>
            <p className="mt-1">
              Go to the config page to add rules, then run the checker!
            </p>
          </div>
        )}
      </ul>
    </main>
  );
}