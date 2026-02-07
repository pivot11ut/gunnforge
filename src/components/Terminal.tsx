'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  prompt?: string;
}

const COMMANDS = {
  help: 'Available commands: help, about, projects, crafts, members, login, clear, ls, reboot',
  about: 'GunnForge - A showcase of creative projects and crafts',
  ls: 'projects/  crafts/  members/  login',
  clear: '',
  reboot: 'Rebooting system...',
};

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to GunnForge Terminal v1.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const username = 'visitor';
  const hostname = 'gunnforge';
  const prompt = `${username}@${hostname}:~$`;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to history
    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd, prompt }
    ]);

    if (!trimmedCmd) return;

    // Save to command history
    setCommandHistory(prev => [...prev, cmd]);

    // Handle commands
    switch (trimmedCmd) {
      case 'help':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: COMMANDS.help }
        ]);
        break;

      case 'about':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: COMMANDS.about }
        ]);
        break;

      case 'ls':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: COMMANDS.ls }
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'reboot':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: COMMANDS.reboot }
        ]);
        setTimeout(() => {
          sessionStorage.removeItem('gunnforge_booted');
          window.location.reload();
        }, 1000);
        break;

      case 'projects':
      case 'cd projects':
        router.push('/projects');
        break;

      case 'crafts':
      case 'cd crafts':
        router.push('/crafts');
        break;

      case 'members':
      case 'cd members':
        router.push('/members');
        break;

      case 'login':
        router.push('/login');
        break;

      case 'home':
      case 'cd ~':
      case 'cd':
        router.push('/');
        break;

      default:
        setHistory(prev => [
          ...prev,
          { type: 'error', content: `Command not found: ${trimmedCmd}` },
          { type: 'output', content: 'Type "help" for available commands' }
        ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const commands = Object.keys(COMMANDS);
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className="terminal-container min-h-screen bg-black text-green-400 font-mono p-4 overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal output */}
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'input' && (
              <div className="flex gap-2">
                <span className="text-white">{line.prompt}</span>
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="text-green-400">{line.content}</div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.content}</div>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex gap-2 items-center">
          <span className="text-white">{prompt}</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-green-400 w-full font-mono"
              style={{ color: '#00ff00' }}
              autoComplete="off"
              spellCheck="false"
            />
            <span className="terminal-cursor inline-block w-2 h-5 bg-green-400 ml-1" />
          </div>
        </div>
      </div>

      {/* Optional scanline effect */}
      <div className="scanline" />
    </div>
  );
}
