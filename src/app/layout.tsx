import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle"; 

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevAnalytics",
  description: "Modern SaaS Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <div className="flex min-h-screen bg-background text-foreground transition-colors">
          {/* Sidebar */}
          <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
            <div className="p-6">
              <h2 className="text-xl font-bold tracking-tight">DevAnalytics</h2>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <a href="#" className="block p-3 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20 font-medium">
  Dashboard
</a>
              <a href="#" className="block p-3 rounded-lg hover:bg-accent transition-colors">Projects</a>
              <a href="#" className="block p-3 rounded-lg hover:bg-accent transition-colors">Team</a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Header with Toggle */}
            <header className="h-16 flex items-center justify-end px-8 border-b border-border">
              <ThemeToggle />
            </header>

            {/* The Page Content renders here */}
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}