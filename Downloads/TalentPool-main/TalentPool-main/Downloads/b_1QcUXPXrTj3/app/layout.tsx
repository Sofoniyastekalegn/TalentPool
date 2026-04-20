import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});


export const metadata: Metadata = {
  title: "Talent Profile | Showcase Your Skills",
  description: "Create and display your professional talent profile with interactive 3D animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontMono.variable} bg-background`}>
      <body
        className="antialiased font-mono"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
