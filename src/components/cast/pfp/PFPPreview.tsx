import { PreviewMode } from "@/app/edit/context";

type PFPDisplayType = "rootCast" | "reply" | "quoteCast" | "profile";

type PFPProps = {
    src: string;
    previewMode: PreviewMode;
    pfpDisplayType: PFPDisplayType;
};

export default function PFPPreview(props: PFPProps) {
    // Props
    const { src, pfpDisplayType, previewMode } = props;
    const margin = pfpDisplayType === "rootCast";
    let size = 48;
    if (pfpDisplayType === "rootCast" && previewMode === "timeline-web") {
        size = 48;
    }

    return (
        <span className="relative h-min w-auto" data-state="closed">
            <img
                loading="lazy"
                src={src}
                className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default relative ${
                    margin ? "mr-2" : ""
                } `}
                alt="avatar"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                }}
            />
        </span>
    );
}
