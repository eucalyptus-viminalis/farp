import React from "react";

type EmbedsContainerProps = {
    imgUrls: string[];
};
export default function EmbedsContainerPreview(props: EmbedsContainerProps) {
    const { imgUrls } = props;
    if (imgUrls.length === 1) {
        return (
            <div className="mt-2 inline-flex flex-col justify-center space-y-1">
                <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-max justify-start rounded-lg  border">
                    <img
                        alt="Cast image embed"
                        loading="lazy"
                        src={imgUrls[0]}
                        className="
                    relative cursor-pointer object-cover object-left-top max-h-[500px] w-auto"
                        style={{
                            aspectRatio: 0.75 / 1,
                        }}
                    />
                </div>
            </div>
        );
    } else if (imgUrls.length === 2) {
        return (
            <div className="mt-2 inline-flex flex-col justify-center space-y-1">
                <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-full justify-between rounded-lg  border">
                    {imgUrls.map((imgUrl, i) => {
                        return (
                            <img
                                alt={"Cast image embed " + i}
                                loading="lazy"
                                src={imgUrl}
                                className={`
                                    relative cursor-pointer object-cover object-left-top max-h-[500px] 
                                    w-[49.5%]
                                `}
                                style={{
                                    aspectRatio: 0.80803 / 1,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return null;
    }
}
