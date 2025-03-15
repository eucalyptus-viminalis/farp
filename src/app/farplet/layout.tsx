import { Metadata } from "next";

export const metadata: Metadata = {
  title: "farp / farplet",
  description: "chat, is this real?",
  openGraph: {
    title: "farp",
    description: "chat, is this real?",
    type: "website",
  },
  keywords: [
    "Farp",
    "Farcaster",
    "Fake Cast Generator",
    "Warpcast",
    "Warplet",
    "Farplet",
  ],
  // metadataBase:
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
