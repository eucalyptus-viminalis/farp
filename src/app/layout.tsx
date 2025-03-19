import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "./wc.css";
import "../css/custom.css";
import { EditProvider } from "@/contexts/EditContext";
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import ModeButtons from "./ModeButtons";
import PageButtons from "./PageButtons";
import { inter } from "@/fonts/fonts";
import { DCEditProvider } from "@/contexts/DCEditContext";
import { FarpletProvider } from "@/contexts/FarpletContext";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "farp",
  description: "chat, is this real?",
  openGraph: {
    title: "farp",
    description: "chat, is this real?",
    type: "website",
  },
  keywords: ["Farp", "Farcaster", "Fake Cast Generator", "Warpcast"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " overflow-x-clip bg-app"}>
        <Providers>
          <GlobalContextProvider>
            <EditProvider>
              <DCEditProvider>
                <FarpletProvider>
                  <div className="container mx-auto min-h-full h-max">
                    <div className="flex min-h-screen flex-row justify-center">
                      <main className="h-full bg-app overflow-x-clip relative w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]">
                        {/* Bleed */}
                        <div
                          className="
                                              absolute top-0 -translate-x-full h-full left-0 w-full
                                              z-10
                                              bg-gradient-to-l
                                              from-app-tw-light dark:from-app-tw-dark
                                              from-20%
                                              to-[var(--yellow-6)] dark:to-[var(--yellow-6)]
                                            "
                        ></div>
                        <div
                          className="
                                                absolute top-0 translate-x-full h-full right-0 w-full
                                                z-10
                                                bg-gradient-to-r from-app-tw-light dark:from-app-tw-dark
                                                from-20%
                                                to-[var(--yellow-6)] dark:to-[var(--yellow-6)]
                                            "
                        ></div>
                        <div className="w-full h-full">
                          <div className="h-full min-h-screen border-default sm:border-x">
                            <span className="absolute text-[var(--yellow-8)]">
                              [beta]
                            </span>
                            <PageButtons />
                            <ModeButtons />
                            {children}
                          </div>
                        </div>
                      </main>
                    </div>
                  </div>
                </FarpletProvider>
              </DCEditProvider>
            </EditProvider>
          </GlobalContextProvider>
        </Providers>
        {/* <footer className="bg-app border-t py-4 border-faint flex flex-col justify-center items-center">
                    <span className="p-2 text-[var(--yellow-11)]">farp</span>
                </footer> */}
        <Analytics />
      </body>
    </html>
  );
}
