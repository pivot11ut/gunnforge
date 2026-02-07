'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavigationProps {
  isAuthenticated: boolean;
  username?: string;
}

export default function Navigation({ isAuthenticated, username }: NavigationProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold hover:text-gray-300">
              GunnForge
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/projects"
                className="hover:bg-gray-700 px-3 py-2 rounded-md transition"
              >
                Projects
              </Link>
              <Link
                href="/crafts"
                className="hover:bg-gray-700 px-3 py-2 rounded-md transition"
              >
                Crafts
              </Link>
              {isAuthenticated && (
                <Link
                  href="/members"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md transition"
                >
                  Members
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-300">
                  Welcome, {username}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition disabled:opacity-50"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-3 space-y-1">
          <Link
            href="/projects"
            className="block hover:bg-gray-700 px-3 py-2 rounded-md transition"
          >
            Projects
          </Link>
          <Link
            href="/crafts"
            className="block hover:bg-gray-700 px-3 py-2 rounded-md transition"
          >
            Crafts
          </Link>
          {isAuthenticated && (
            <Link
              href="/members"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md transition"
            >
              Members
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
