import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./wc.css"
import '../css/custom.css'
import { EditProvider } from "@/contexts/EditContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "farp",
  description: "chat, is this real?",
  metadataBase: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ? new URL('https://' + process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) :  new URL('http://localhost:3000'),
  openGraph: {
    title: 'farp',
    description: 'chat, is this real?',
    type: 'website',

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' overflow-x-clip bg-app'}>
        <EditProvider>
          {children}
        </EditProvider>
        <footer
          className="bg-app border-t py-4 border-faint flex flex-col justify-center items-center" 
        >
          <span className="p-2 text-[var(--yellow-11)]">farp</span>
        </footer>
        </body>
    </html>
  );
}
