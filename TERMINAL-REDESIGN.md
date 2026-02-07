# Terminal Aesthetic Redesign Guide

This guide will help you transform GunnForge into a terminal/command-line inspired website like ddaniel.dev.

## 🎨 Design Philosophy

**Key Elements:**
- Dark terminal background (black #0a0a0a)
- Monospace fonts (JetBrains Mono, Fira Code)
- Green terminal text (#00ff00)
- Command-line interface
- Minimalist, text-focused design
- Retro CRT effects (optional)

## 📦 What I've Created

1. **terminal-globals.css** - Terminal styling and animations
2. **Terminal.tsx** - Interactive terminal component
3. **/terminal page** - Full-screen terminal experience

## 🚀 Implementation Options

### Option 1: Full Terminal Mode (Most Similar to ddaniel.dev)

Make the entire site a terminal interface:

**Step 1:** Update `src/app/page.tsx`:

```tsx
import Terminal from '@/components/Terminal';

export default function Home() {
  return <Terminal />;
}
```

**Step 2:** Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import './terminal-globals.css'; // Use terminal styles instead of globals.css

export const metadata: Metadata = {
  title: 'GunnForge - Terminal',
  description: 'Command-line interface for projects and crafts',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Option 2: Hybrid Mode (Terminal + Regular Pages)

Keep terminal as homepage, style other pages with terminal aesthetic:

**Projects Page (Terminal Style):**

```tsx
export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="text-white">visitor@gunnforge:~/projects$</span>
          <span className="ml-2">ls -la</span>
        </div>

        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div key={idx} className="border border-green-900 p-4 hover:bg-green-950">
              <div className="flex gap-4">
                <span className="text-gray-500">[DIR]</span>
                <div className="flex-1">
                  <h3 className="text-green-400 mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-green-600 text-xs">
                        [{tech}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Option 3: Toggle Between Modes

Add a theme switcher:

```tsx
// Add to layout or navigation
<button onClick={() => setMode(mode === 'terminal' ? 'modern' : 'terminal')}>
  {mode === 'terminal' ? '[GUI MODE]' : '[TERMINAL MODE]'}
</button>
```

## 🎯 Enhanced Terminal Features

### 1. Add More Commands

Update `Terminal.tsx` to add:

```typescript
const COMMANDS = {
  help: '...',
  about: '...',
  skills: 'TypeScript, React, Next.js, Python, Node.js',
  contact: 'Email: your@email.com | GitHub: github.com/yourusername',
  whoami: 'A maker who builds cool stuff',
  date: () => new Date().toLocaleString(),
  echo: (args: string) => args,
  cat: (file: string) => `Reading ${file}...`,
  neofetch: `
    ╔══════════════════════════╗
    ║   GunnForge v1.0         ║
    ║   Next.js Terminal       ║
    ║   Built with TypeScript  ║
    ╚══════════════════════════╝
  `,
};
```

### 2. ASCII Art Banner

Add to terminal startup:

```typescript
const ASCII_BANNER = `
  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║   ██████╗ ██╗   ██╗███╗   ██╗███╗   ██╗
  ║  ██╔════╝ ██║   ██║████╗  ██║████╗  ██║
  ║  ██║  ███╗██║   ██║██╔██╗ ██║██╔██╗ ██║
  ║  ██║   ██║██║   ██║██║╚██╗██║██║╚██╗██║
  ║  ╚██████╔╝╚██████╔╝██║ ╚████║██║ ╚████║
  ║   ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝
  ║                                       ║
  ║         F O R G E                     ║
  ║                                       ║
  ╚═══════════════════════════════════════╝
`;
```

### 3. Typing Animation

Add auto-typing effect on load:

```tsx
const [isTyping, setIsTyping] = useState(true);

useEffect(() => {
  const commands = ['help', 'ls', 'about'];
  let i = 0;

  const interval = setInterval(() => {
    if (i < commands.length) {
      handleCommand(commands[i]);
      i++;
    } else {
      setIsTyping(false);
      clearInterval(interval);
    }
  }, 1500);

  return () => clearInterval(interval);
}, []);
```

### 4. File System Simulation

Create a virtual file system:

```typescript
const fileSystem = {
  '/': ['projects', 'crafts', 'about.txt', 'contact.txt'],
  '/projects': ['smart-home.md', 'weather-station.md'],
  '/crafts': ['ceramics.md', 'woodwork.md'],
};

// Add commands
'pwd': () => currentPath,
'cd': (dir: string) => navigateToDirectory(dir),
'cat': (file: string) => readFile(file),
```

## 🎨 Color Schemes

### Classic Green Terminal
```css
--terminal-bg: #0a0a0a;
--terminal-text: #00ff00;
```

### Amber Terminal
```css
--terminal-bg: #1a1a1a;
--terminal-text: #ffb000;
```

### Blue Terminal
```css
--terminal-bg: #000033;
--terminal-text: #00ffff;
```

### Matrix Style
```css
--terminal-bg: #000000;
--terminal-text: #00ff41;
```

## 🎬 Optional Effects

### 1. CRT Monitor Effect

Add to CSS:

```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}

.terminal-screen {
  animation: flicker 0.15s infinite;
  box-shadow:
    inset 0 0 100px rgba(0, 255, 0, 0.05),
    0 0 50px rgba(0, 255, 0, 0.1);
}

/* Screen curvature */
.terminal-screen::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle,
    transparent 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
}
```

### 2. Glitch Effect

```css
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch {
  animation: glitch 0.3s infinite;
}
```

## 📱 Mobile Considerations

For mobile users, consider:

1. **Virtual keyboard button**
```tsx
<button
  onClick={() => inputRef.current?.focus()}
  className="fixed bottom-4 right-4 bg-green-500 text-black p-3 rounded"
>
  [KEYBOARD]
</button>
```

2. **Touch-friendly commands**
```tsx
<div className="flex gap-2 mb-4">
  <button onClick={() => handleCommand('help')}>help</button>
  <button onClick={() => handleCommand('projects')}>projects</button>
</div>
```

## 🚀 Quick Start

### Try Terminal Mode Now:

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/terminal`
3. Type commands: `help`, `projects`, `about`

### Make It Your Homepage:

Replace `src/app/page.tsx` content with:

```tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/terminal');
}
```

## 📚 Inspiration & Resources

- **Fonts**:
  - JetBrains Mono: https://www.jetbrains.com/lp/mono/
  - Fira Code: https://github.com/tonsky/FiraCode

- **ASCII Art Generators**:
  - https://patorjk.com/software/taag/
  - https://www.ascii-art-generator.org/

- **Terminal Color Schemes**:
  - https://terminal.sexy/
  - https://github.com/mbadolato/iTerm2-Color-Schemes

## 🎯 Next Steps

1. Choose your implementation option (Full Terminal, Hybrid, or Toggle)
2. Update your layout and styles
3. Add more commands to the terminal
4. Customize colors to match your brand
5. Add ASCII art and banners
6. Test on mobile devices

Want me to implement any of these features? Just let me know!
