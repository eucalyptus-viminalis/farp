import { inter } from "@/fonts/fonts";
import React from "react";
import DoubleCheckmarks from "../read-status/DoubleCheckmarks";

type CaptionWithTimestampProps = {
    castText: string;
    timeDisplay: string;
    isSelfDC?: boolean;
    asCaption?: boolean;
};
const CaptionWithTimestamp = (props: CaptionWithTimestampProps) => {
    const { castText, asCaption, timeDisplay, isSelfDC } = props;
    return (
        // <div className="flex flex-row rounded-bl-lg rounded-br-lg p-2 bg-self-direct-cast text-light rounded-tr-none rounded-tl-none">
        <div
            className={`
                flex flex-row 
                p-2 
                rounded-tr-none rounded-tl-none
                ${asCaption ? "rounded-bl-lg rounded-br-lg" : "rounded-lg"}
                ${!isSelfDC && "bg-direct-cast text-default"}
                ${isSelfDC && "bg-self-direct-cast text-light rounded-tr"}
            `}
        >
            {/* <pre className="relative grow justify-stretch place-self-start whitespace-pre-wrap font-sans text-[.95rem] leading-[1.3rem] break-gracefully"> */}
            <pre
                className={`
                    ${inter.className}
                    relative grow justify-stretch place-self-start whitespace-pre-wrap text-[.95rem] leading-[1.3rem] break-gracefully
                `}
            >
                {castText}
                <div className="mb-[2px] ml-2 inline-flex space-x-1 text-right opacity-0">
                    {/* <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 text-end"> */}
                    <div
                        className={`
                            mr-2 min-w-[50px] text-xs
                            w-max !min-w-0 text-end
                            ${isSelfDC && "text-light"}
                            ${!isSelfDC && "text-muted"}
                        `}
                    >
                        {timeDisplay}
                    </div>
                    {isSelfDC && <DoubleCheckmarks />}
                </div>
                <div className="absolute bottom-[-4pt] right-[-2pt] mb-[2px] ml-2 inline-flex space-x-1 text-right">
                    {/* <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 text-end"> */}
                    <div
                        className={`
                            mr-2 min-w-[50px] text-xs
                            w-max !min-w-0 text-end
                            ${isSelfDC && "text-light"}
                            ${!isSelfDC && "text-muted"}
                        `}
                    >
                        {timeDisplay}
                    </div>
                    {isSelfDC && <DoubleCheckmarks />}
                </div>
            </pre>
        </div>
    );
};

export default CaptionWithTimestamp;
