import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexera AI Case Study",
  description: "Chat assistant starter project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
