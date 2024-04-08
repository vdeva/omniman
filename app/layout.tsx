import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmniMan",
  description: "AI Omnichannel Marketing Content Strategy Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-neutral-50 min-h-screen font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
