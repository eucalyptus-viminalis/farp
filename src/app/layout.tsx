import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./wc.css"
import '../css/custom.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "farp",
  description: "chat, is this real?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' overflow-x-clip'}>
        {children}
        <footer
          className="bg-app border-t py-4 border-faint flex flex-col justify-center items-center" 
        >
          <span className="p-2">🩸 farp 🧢</span>
        </footer>
        </body>
    </html>
  );
}
