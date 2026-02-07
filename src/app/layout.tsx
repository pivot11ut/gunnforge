import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { getCurrentUser } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GunnForge - Projects & Crafts',
  description: 'Showcase of projects and crafts with members-only section',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation isAuthenticated={!!user} username={user?.username} />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
