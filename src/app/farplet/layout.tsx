import { FrameEmbedNext } from "@farcaster/frame-sdk";
import { Metadata } from "next";
import { appConfig } from "../appConfig";

const frame: FrameEmbedNext = {
  version: "next", // version of the frame protocol this route is using
  imageUrl: `${appConfig.hostUrl}/farplet/opengraph-image.png`, // the image to be displayed before user launches the frame
  aspectRatio: "3:2", // aspect ratio for this image to be displayed in
  button: {
    // details about the button the user will press to launch the mini-app
    title: "farp", // the text displayed on the button
    action: {
      type: "launch_frame", //
      name: "farp", // name of the app
      url: appConfig.hostUrl + "/farplet", // opens this url in the in-app browser
      splashImageUrl: `${appConfig.hostUrl}/icon`,
      splashBackgroundColor: "#ffffff",
    },
  },
};

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
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
