type EmbedSingleProps = {
    src: string
}
export default function EmbedSingle(props: EmbedSingleProps) {
    const {src} = props
    return (
        <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-max justify-start rounded-lg  border">
            <img
                loading="lazy"
                // src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/5adcc97b-0ca4-4b9e-17d4-2813cf14f700/rectcontain3"
                src={src}
                className="
                    relative cursor-pointer object-cover object-left-top max-h-[500px] w-auto"
                alt="Cast image embed"
                // style="aspect-ratio: 0.75 / 1;"
                style={{
                    aspectRatio: 0.75 / 1
                }}
            />
        </div>
    );
}
