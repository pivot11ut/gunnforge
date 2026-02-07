'use client';

import { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

interface BootMessage {
  text: string;
  delay: number;
  type?: 'success' | 'info' | 'loading';
}

const BOOT_MESSAGES: BootMessage[] = [
  { text: 'GunnForge BIOS v1.0.0', delay: 100, type: 'info' },
  { text: 'Copyright (C) 2025 GunnForge Systems', delay: 100, type: 'info' },
  { text: '', delay: 200 },
  { text: 'Initializing system...', delay: 300, type: 'loading' },
  { text: 'Detecting CPU... [ OK ] Intel Core i9-9900K @ 3.60GHz', delay: 400, type: 'success' },
  { text: 'Checking RAM... [ OK ] 16384 MB', delay: 300, type: 'success' },
  { text: 'Mounting file systems... [ OK ]', delay: 400, type: 'success' },
  { text: 'Loading kernel modules... [ OK ]', delay: 350, type: 'success' },
  { text: '', delay: 200 },
  { text: 'Starting services:', delay: 200, type: 'info' },
  { text: '  → Authentication service... [ OK ]', delay: 300, type: 'success' },
  { text: '  → Project database... [ OK ]', delay: 250, type: 'success' },
  { text: '  → Craft repository... [ OK ]', delay: 250, type: 'success' },
  { text: '  → Network interface... [ OK ]', delay: 300, type: 'success' },
  { text: '  → Terminal interface... [ OK ]', delay: 250, type: 'success' },
  { text: '', delay: 200 },
  { text: 'Running system diagnostics...', delay: 400, type: 'loading' },
  { text: 'System check complete. All systems nominal.', delay: 400, type: 'success' },
  { text: '', delay: 300 },
  { text: 'Welcome to GunnForge Terminal v1.0', delay: 500, type: 'info' },
  { text: 'Type "help" for available commands', delay: 300, type: 'info' },
  { text: '', delay: 500 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [messages, setMessages] = useState<BootMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isSkipped) {
      setMessages(BOOT_MESSAGES);
      setProgress(100);
      setTimeout(onComplete, 500);
      return;
    }

    if (currentIndex < BOOT_MESSAGES.length) {
      const currentMessage = BOOT_MESSAGES[currentIndex];
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, currentMessage]);
        setCurrentIndex((prev) => prev + 1);
        setProgress(((currentIndex + 1) / BOOT_MESSAGES.length) * 100);
      }, currentMessage.delay);

      return () => clearTimeout(timer);
    } else {
      // Boot complete
      setTimeout(onComplete, 800);
    }
  }, [currentIndex, isSkipped, onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
  };

  const getMessageColor = (type?: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'info':
        return 'text-cyan-400';
      case 'loading':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="fixed top-4 right-4 px-4 py-2 bg-green-900 hover:bg-green-800 text-green-400 border border-green-700 transition-colors text-sm"
        >
          [SKIP BOOT]
        </button>

        {/* Boot messages */}
        <div className="space-y-1">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${getMessageColor(message.type)} animate-fadeIn`}
            >
              {message.text}
            </div>
          ))}

          {/* Blinking cursor on current line */}
          {currentIndex < BOOT_MESSAGES.length && !isSkipped && (
            <div className="flex items-center">
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Loading spinner */}
        {currentIndex < BOOT_MESSAGES.length && !isSkipped && (
          <div className="mt-8 flex items-center gap-3 text-green-500">
            <div className="animate-spin">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <span className="text-sm">Booting system...</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
