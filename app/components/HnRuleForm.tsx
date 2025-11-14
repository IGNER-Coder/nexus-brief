'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HnRuleForm() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [minPoints, setMinPoints] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving...');

    const response = await fetch('/api/hn-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
        minPoints: minPoints,
      }),
    });

    if (response.ok) {
      const newRule = await response.json();
      setMessage(`Success! Rule saved for '${newRule.keyword}'.`);
      setKeyword('');
      setMinPoints('');
      router.refresh(); // Refresh the page data!
    } else {
      const error = await response.json();
      setMessage(`Error: ${error.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div className="border-b pb-4 mb-4">
  <h2 className="text-xl font-semibold">Hacker News Rules</h2>
  <p className="text-sm text-gray-500 mt-1">
    Get alerts for new stories that match a keyword and score.
  </p>
</div>

      {/* Keyword Input */}
      <div>
        <label htmlFor="keyword" className="block text-sm font-medium">
          Keyword
        </label>
        <input
          id="keyword"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., AI, Rust, YC"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
        />
      </div>

      {/* Minimum Points Input */}
      <div>
        <label htmlFor="minPoints" className="block text-sm font-medium">
          Minimum Points
        </label>
        <input
          id="minPoints"
          type="number"
          value={minPoints}
          onChange={(e) => setMinPoints(e.target.value)}
          placeholder="e.g., 150"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700"
      >
        Save HN Rule
      </button>

      {/* Feedback Message */}
      {message && (
        <p className="text-sm text-center text-gray-600">{message}</p>
      )}
    </form>
  );
}