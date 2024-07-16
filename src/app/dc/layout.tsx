import { Metadata } from "next";

export const metadata: Metadata = {
    title: "farp / dc",
    description: "chat, is this real?",
    openGraph: {
        title: 'farp',
        description: "chat, is this real?",
        type: "website",
    },
    keywords: ['Farp', 'Farcaster', 'Fake Cast Generator', 'Warpcast'],
    // metadataBase: 
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}