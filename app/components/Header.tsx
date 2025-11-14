import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        {/* 1. Left Side: Brand/Logo */}
        <Link href="/" className="text-xl font-bold text-teal-600">
          Project In-Brief
        </Link>

        {/* 2. Right Side: Navigation Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-teal-600 font-medium hover:underline"
          >
            Config
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-teal-600 font-medium hover:underline"
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}