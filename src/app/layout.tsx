import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './terminal-globals.css';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GunnForge - Terminal',
  description: 'Command-line interface for projects and crafts showcase',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}
