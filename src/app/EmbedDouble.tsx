type EmbedDoubleProps = {
    src1: string
    src2: string
}
export default function EmbedDouble(props: EmbedDoubleProps) {
    const {src1,src2,} = props
    return (
        <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-full justify-between rounded-lg  border">
            <img
                loading="lazy"
                // src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/b09ca3e7-7e85-4a60-c776-17142e1c2d00/rectcontain3"
                src={src1}
                className="relative cursor-pointer object-cover object-left-top max-h-[500px] w-[49.5%]"
                alt="Cast image embed"
                style={{
                    aspectRatio: 0.80803 / 1
                }}

            />
            <img
                loading="lazy"
                // src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3a3447f2-0dc2-4969-9e00-bd5f6d387f00/rectcontain3"
                src={src2}
                className="relative cursor-pointer object-cover object-left-top max-h-[500px] w-[49.5%]"
                alt="Cast image embed"
                style={{
                    aspectRatio: 0.80803 / 1
                }}
            />
        </div>
    );
}
