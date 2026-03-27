'use client'; // Required for useState
import ThemeToggle from '../components/ThemeToggle';
import { useState } from "react";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en"suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="flex min-h-screen">
          
          {/* Mobile Overlay (Darkens the background when menu is open) */}
          {isOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden" 
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
  fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out
  bg-slate-900/80 backdrop-blur-md border-r border-white/10 text-white
  ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
  md:translate-x-0 md:static md:block
`}>
            <div className="flex items-center justify-between p-6">
              <div className="text-xl font-bold">DevAnalytics</div>
              {/* Close button for mobile */}
              <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400">✕</button>
            </div>
            
            <nav className="space-y-2 px-4">
              <a href="#" className="block p-3 rounded bg-blue-600">Dashboard</a>
              <a href="#" className="block p-3 rounded hover:bg-slate-800 transition">Projects</a>
              <a href="#" className="block p-3 rounded hover:bg-slate-800 transition">Team</a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex justify-end mb-4">
  <ThemeToggle />
</div>
          <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            {/* Mobile Header with Hamburger */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 md:hidden">
              <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-slate-600">
                {/* Simple Hamburger Icon SVG */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="ml-4 font-bold text-slate-900">DevAnalytics</span>
            </header>

            <main className="p-6 md:p-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}