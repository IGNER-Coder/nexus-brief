'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsRuleForm() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving...');

    const response = await fetch('/api/news-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    });

    if (response.ok) {
      const newRule = await response.json();
      setMessage(`Success! Rule saved for '${newRule.keyword}'.`);
      setKeyword('');
      router.refresh(); // Refresh the page data!
    } else {
      const error = await response.json();
      setMessage(`Error: ${error.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Add New News API Rule</h2>

      {/* Keyword Input */}
      <div>
        <label htmlFor="news-keyword" className="block text-sm font-medium">
          Keyword / Topic
        </label>
        <input
          id="news-keyword"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., quantum computing, competitor name"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
      >
        Save News Rule
      </button>

      {/* Feedback Message */}
      {message && (
        <p className="text-sm text-center text-gray-600">{message}</p>
      )}
    </form>
  );
}