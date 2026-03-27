'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Handle Mounting and Initial Theme Sync
  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme');
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // 2. Prevent Hydration Mismatch
  // If we aren't mounted, we render a "placeholder" with the same dimensions
  // so the layout doesn't jump when the button appears.
  if (!mounted) {
    return (
      <div className="p-2 w-21 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-blue-400 transition-all flex items-center gap-2"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}