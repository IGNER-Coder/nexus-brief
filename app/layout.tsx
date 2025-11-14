import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from './components/Header'; // 1. Import our new Header

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Regular, SemiBold, Bold
});

export const metadata: Metadata = {
  title: 'Project In-Brief',
  description: 'Your personal information dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 2. Set the light gray background on the whole page */}
      <body className={`${poppins.className} bg-slate-50 min-h-screen`}>
        {/* 3. Add the Header above all page content */}
        <Header />

        {/* 4. 'children' is where your pages (page.tsx) will be rendered */}
        <main>{children}</main>
      </body>
    </html>
  );
}