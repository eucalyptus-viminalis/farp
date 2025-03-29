type ImageEmbedProps = {
    imgSrc: string;
    hasCaption?: boolean;
    timeDisplay: string;
};
export default function ImageEmbed(props: ImageEmbedProps) {
    const { hasCaption, imgSrc, timeDisplay } = props;
    return (
        <div
            className={`
                relative flex flex-col bg-direct-cast 
                ${
                    hasCaption
                        ? "rounded-t"
                        : "rounded-xl"
                }
            `}
        >
            <img
                loading="lazy"
                src={imgSrc}
                // className="relative max-h-[500px] w-full cursor-pointer object-cover object-top bg-overlay-light active:opacity-90 rounded-xl border border-default"
                className={`
                    relative max-h-[500px] w-full 
                    cursor-pointer 
                    object-cover object-top 
                    bg-overlay-light 
                    active:opacity-90 
                    ${
                        hasCaption
                            ? "rounded-t"
                            : "rounded-xl"
                    }
                    ${
                        hasCaption
                            ? ""
                            : "border border-default"
                    }
                `}
                alt="Direct cast image embed"
                // style={{
                //     width: "1078px",
                //     aspectRatio: "0.45 / 1",
                // }}
            />
            {!hasCaption && (
                <div className="absolute bottom-0 right-0 mb-2 mr-1 flex w-min flex-row items-center rounded-full bg-[#24292ed6] pl-1">
                    <div className="ml-2 mr-1 inline-flex">
                        <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 !text-light">
                            {timeDisplay}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
