import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IBM LangFlow Research Agent | Autonomous Literature Review & Citation Studio",
  description: "Agentic AI Research Companion for academic synthesis, 2D citation graph exploration, and literature discovery powered by IBM Granite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full bg-obsidian-950 text-slate-100 antialiased selection:bg-ibm-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
