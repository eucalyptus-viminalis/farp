import Cast from "../Cast";
import EmbedDouble from "../EmbedDouble";
import { CastPreview } from "../preview/CastPreview";
import { CastState } from "../edit/context";

export default function ImageEmbedDoublePage() {
    const imageEmbedDoubleExampleCast: CastState = {
        activeBadgeOverride: true,
        ago: "1h",
        bookmarked: false,
        castText: "image embed double example",
        displayNameOverride: "Dan Romero",
        imageEmbeds: [
            "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/b09ca3e7-7e85-4a60-c776-17142e1c2d00/rectcontain3",
            "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3a3447f2-0dc2-4969-9e00-bd5f6d387f00/rectcontain3",
        ],
        liked: false,
        pfpOverride: "/dwr.png",
        recasted: false,
        usernameOverride: "dwr",
        user: undefined,
    };
    return (
        <div className="w-[500px]">
            <CastPreview
                cast={imageEmbedDoubleExampleCast}
                previewMode="timeline-web"
            >
                <EmbedDouble
                    src1="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/b09ca3e7-7e85-4a60-c776-17142e1c2d00/rectcontain3"
                    src2="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3a3447f2-0dc2-4969-9e00-bd5f6d387f00/rectcontain3"
                />
            </CastPreview>
        </div>
    );
}
