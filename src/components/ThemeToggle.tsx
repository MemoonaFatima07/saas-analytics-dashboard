'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 1. Wait until the component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent rendering until mounted to fix the icon flash
  if (!mounted) return <div className="p-5" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-border bg-card hover:bg-accent transition-all text-xl shadow-sm"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}