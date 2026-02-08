'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DesktopProps {
  isAuthenticated?: boolean;
  username?: string;
}

interface Tile {
  id: string;
  name: string;
  icon: string;
  path: string;
  description: string;
  color: string;
  requiresAuth?: boolean;
}

export default function Desktop({ isAuthenticated = false, username }: DesktopProps) {
  const router = useRouter();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  });

  const tiles: Tile[] = [
    {
      id: 'projects',
      name: 'Projects',
      icon: '🔨',
      path: '/projects',
      description: 'Browse projects',
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'crafts',
      name: 'Crafts',
      icon: '✨',
      path: '/crafts',
      description: 'View crafts',
      color: 'from-green-500 to-green-700',
    },
    {
      id: 'members',
      name: 'Members',
      icon: '🔒',
      path: '/members',
      description: 'Members area',
      color: 'from-purple-500 to-purple-700',
      requiresAuth: true,
    },
    {
      id: 'login',
      name: isAuthenticated ? 'Logout' : 'Login',
      icon: isAuthenticated ? '🚪' : '🔐',
      path: isAuthenticated ? '/api/auth/logout' : '/login',
      description: isAuthenticated ? 'Sign out' : 'Sign in',
      color: isAuthenticated ? 'from-red-500 to-red-700' : 'from-cyan-500 to-cyan-700',
    },
  ];

  const handleTileClick = async (tile: Tile) => {
    if (tile.id === 'login' && isAuthenticated) {
      // Handle logout
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } else {
      router.push(tile.path);
    }
  };

  const handleReboot = () => {
    sessionStorage.removeItem('gunnforge_booted');
    window.location.reload();
  };

  return (
    <div className="terminal-container min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 font-mono">
      {/* Top Bar */}
      <div className="bg-black bg-opacity-50 border-b border-green-900 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-green-400">
            ⚡ GunnForge OS
          </div>
          {isAuthenticated && (
            <div className="text-sm text-green-500">
              👤 {username}
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-green-500">
            🕐 {time}
          </div>
          <button
            onClick={handleReboot}
            className="px-3 py-1 bg-green-900 hover:bg-green-800 text-green-400 border border-green-700 rounded text-sm transition-colors"
          >
            🔄 Reboot
          </button>
        </div>
      </div>

      {/* Desktop Area */}
      <div className="p-8 md:p-16">
        {/* Welcome Message */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
            Welcome to GunnForge
          </h1>
          <p className="text-lg text-green-500">
            {isAuthenticated
              ? `Welcome back, ${username}! Select an application to continue.`
              : 'Select an application to get started.'}
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {tiles
            .filter(tile => !tile.requiresAuth || isAuthenticated)
            .map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                className="group relative bg-black bg-opacity-40 backdrop-blur border-2 border-green-900 rounded-lg p-6 md:p-8 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
              >
                {/* Tile Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tile.color} opacity-0 group-hover:opacity-20 transition-opacity rounded-lg`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">
                    {tile.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-semibold text-green-400 group-hover:text-green-300">
                      {tile.name}
                    </div>
                    <div className="text-xs text-green-600 group-hover:text-green-500">
                      {tile.description}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg border-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </button>
            ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black bg-opacity-40 border border-green-900 rounded-lg px-6 py-3">
            <p className="text-sm text-green-600">
              💡 Tip: Click the Reboot button to replay the boot sequence
            </p>
          </div>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="scanline" />
    </div>
  );
}
