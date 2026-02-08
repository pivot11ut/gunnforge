import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './terminal-globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GunnForge',
  description: 'Projects, crafts, and a members area',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
