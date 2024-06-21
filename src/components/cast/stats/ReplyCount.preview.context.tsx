"use client";

import { CastPreviewContext } from "@/app/preview/CastPreview";
import { useContext } from "react";

export default function ReplyCount() {
    // Context
    const context = useContext(CastPreviewContext);
    const cast = context.cast;

    // DOM
    return (
        <div className="flex flex-row items-center">
            <div>
                <span
                    className="
                            mr-1 
                            text-sm font-semibold text-[#576472] 
                            dark:text-[#9FA3AF]
                            hover:underline
                        "
                    title="Override reply count"
                >
                    {cast.replyCount.toString()}
                </span>
                <span
                    className="
                        text-sm text-[#576472] dark:text-[#9FA3AF]
                    "
                >
                    replies
                </span>
            </div>
            <span className="mx-1 text-muted">·</span>
        </div>
    );
}
