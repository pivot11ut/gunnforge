'use client';

import { useState, useEffect } from 'react';
import BootSequence from './BootSequence';
import Desktop from './Desktop';

interface TerminalWithBootProps {
  isAuthenticated?: boolean;
  username?: string;
}

export default function TerminalWithBoot({ isAuthenticated, username }: TerminalWithBootProps) {
  const [showBoot, setShowBoot] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    // Check if user has already seen boot sequence this session
    const booted = sessionStorage.getItem('gunnforge_booted');
    if (booted === 'true') {
      setShowBoot(false);
      setHasBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('gunnforge_booted', 'true');
    setShowBoot(false);
    setHasBooted(true);
  };

  if (showBoot && !hasBooted) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return <Desktop isAuthenticated={isAuthenticated} username={username} />;
}
