import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "./wc.css";
import "../css/custom.css";
import { inter } from "@/fonts/fonts";
import { WagmiBaseProviderProviderLOL } from "./providers";
import { ColorSchemeProvider } from "./_context/ColorSchemeCtx";
import MyQueryClientProvider from "./_context/QueryContext";
import { GlobalContextProvider } from "./_context/GlobalContext";
import { EditProvider } from "./_context/EditContext";
import { DCEditProvider } from "./_context/DCEditContext";
import { FarpletProvider } from "./_context/FarpletContext";
import PageButtons from "./_ui/PageButtons";
import ModeButtons from "./_ui/ModeButtons";
import { FrameEmbedNext } from "@farcaster/frame-sdk";
import { appConfig } from "./appConfig";
import { FarcasterProvider } from "./_context/FarcasterCtx";

const frame: FrameEmbedNext = {
  version: "next", // version of the frame protocol this route is using
  imageUrl: `${appConfig.hostUrl}/opengraph-image.png`, // the image to be displayed before user launches the frame
  aspectRatio: "3:2", // aspect ratio for this image to be displayed in
  button: {
    // details about the button the user will press to launch the mini-app
    title: "farp", // the text displayed on the button
    action: {
      type: "launch_frame", //
      name: "farp", // name of the app
      url: appConfig.hostUrl, // opens this url in the in-app browser
      splashImageUrl: `${appConfig.hostUrl}/icon`,
      splashBackgroundColor: "#ffffff",
    },
  },
};

export const metadata: Metadata = {
  title: "farp",
  description: "chat, is this real?",
  openGraph: {
    title: "farp",
    description: "chat, is this real?",
    type: "website",
  },
  keywords: ["Farp", "Farcaster", "Fake Cast Generator", "Warpcast"],
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FarcasterProvider>
        <ColorSchemeProvider>
          <body className={inter.className + " overflow bg-app w-screen"}>
            <WagmiBaseProviderProviderLOL>
              <MyQueryClientProvider>
                <GlobalContextProvider>
                  <EditProvider>
                    <DCEditProvider>
                      <FarpletProvider>
                        <div className="container mx-auto min-h-full h-max">
                          <div className="flex min-h-screen flex-row justify-center">
                            <main className="h-full bg-app relative w-full overflow-x-hidden shrink-0 justify-center sm:w-[540px] lg:w-[620px]">
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
              </MyQueryClientProvider>
            </WagmiBaseProviderProviderLOL>
            {/* <footer className="bg-app border-t py-4 border-faint flex flex-col justify-center items-center">
                    <span className="p-2 text-[var(--yellow-11)]">farp</span>
                </footer> */}
            <Analytics />
          </body>
        </ColorSchemeProvider>
      </FarcasterProvider>
    </html>
  );
}
