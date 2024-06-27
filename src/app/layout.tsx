import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./wc.css"
import '../css/custom.css'
import { EditProvider } from "@/contexts/EditContext";
import { GlobalContextProvider } from "@/contexts/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "farp",
  description: "chat, is this real?",
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
        <GlobalContextProvider>
          <EditProvider>
            {children}
          </EditProvider>
        </GlobalContextProvider>
        <footer
          className="bg-app border-t py-4 border-faint flex flex-col justify-center items-center" 
        >
          <span className="p-2 text-[var(--yellow-11)]">farp</span>
        </footer>
        </body>
    </html>
  );
}
