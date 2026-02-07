'use client';

import { useState, useEffect } from 'react';
import BootSequence from './BootSequence';
import Terminal from './Terminal';

export default function TerminalWithBoot() {
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

  return <Terminal />;
}
