type AgoPreviewProps = {
    ago: string;
};
export default function AgoPreview(props: AgoPreviewProps) {
    const { ago } = props;
    return (
        // Wrapped in <a> tag on Warpcast
        // <a title="Navigate to cast" href="/nopattern/0x58dbd82c">
            <div
                className="
                    text-muted hover:underline
                "
            >
                {ago}
            </div>
        // </a>
    );
}
