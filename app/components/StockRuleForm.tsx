'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import the router

export default function StockRuleForm() { // <-- Change this name
  const router = useRouter(); // 2. Get the router instance
  // 1. Set up state for each form field
  const [symbol, setSymbol] = useState('');
  const [condition, setCondition] = useState('above');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  // 2. Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from reloading
    setMessage('Saving...');

    // 3. Send the data to our API route
    const response = await fetch('/api/stock-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: symbol,
        condition: condition,
        price: price,
      }),
    });

    if (response.ok) {
      // 4. Handle a successful response
      const newRule = await response.json();
      setMessage(`Success! Rule saved for ${newRule.symbol}.`);
      // Clear the form
      setSymbol('');
      setPrice('');
      router.refresh(); // 3. REFRESH THE PAGE DATA!
    } else {
      // 5. Handle an error
      const error = await response.json();
      setMessage(`Error: ${error.error}`);
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project In-Brief</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <div className="border-b pb-4 mb-4">
  <h2 className="text-xl font-semibold">Stock Rules</h2>
  <p className="text-sm text-gray-500 mt-1">
    Get alerts when a stock crosses a specific price.
  </p>
</div>

        {/* Stock Symbol Input */}
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium">
            Stock Symbol
          </label>
          <input
            id="symbol"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="e.g., GOOGL"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>

        {/* Condition Select */}
        <div>
          <label htmlFor="condition" className="block text-sm font-medium">
            Condition
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          >
            <option value="above">Alert me if price is ABOVE</option>
            <option value="below">Alert me if price is BELOW</option>
          </select>
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price Threshold
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 180.50"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700"
        >
          Save Stock Rule
        </button>

        {/* Feedback Message */}
        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}
      </form>
    </main>
  );
}
