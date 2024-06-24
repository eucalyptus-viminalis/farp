import { CastPreview } from "../../components/cast/CastPreview";
import { CastState } from "@/types/types";

export default function ImageEmbedSinglePage() {
    const imageEmbedSingleExampleCast: CastState = {
        likeCount: 0,
        replyCount: 0,
        activeBadgeOverride: true,
        ago: "1m",
        bookmarked: false,
        castText: "image embed single example",
        displayNameOverride: "Dan Romero",
        imageEmbeds: [
            "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/5adcc97b-0ca4-4b9e-17d4-2813cf14f700/rectcontain3",
        ],
        liked: false,
        pfpOverride: "/dwr.png",
        recasted: false,
        usernameOverride: "dwr",
        user: undefined,
    };
    return (
        <main className="flex bg-white min-h-screen flex-col gap-4 items-center justify-start p-24">
            <div className="w-[400px] bg-app">
                <CastPreview
                    cast={imageEmbedSingleExampleCast} 
                    previewMode="timeline-web"
                />
            </div>
        </main>
    );
}
