import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Agent Studio | Claude Terracotta Edition",
  description: "Autonomous Academic Research Companion powered by IBM Granite & Groq LPUs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-claude-bg text-claude-text antialiased selection:bg-claude-terracotta selection:text-white">
        {children}
      </body>
    </html>
  );
}
