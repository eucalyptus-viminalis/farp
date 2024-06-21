"use client";

import { CastPreviewContext } from "@/app/preview/CastPreview";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function LikeCount() {
    // Context
    const context = useContext(CastPreviewContext);
    const cast = context.cast;
    return (
        <div className="flex flex-row items-center">
            <div>
                <span
                    className="
                            mr-1 text-sm font-semibold text-[#576472] dark:text-[#9FA3AF]
                            hover:underline
                        "
                    title={"Override like count"}
                >
                    {cast.likeCount}
                </span>
                <span className="text-sm text-[#576472] dark:text-[#9FA3AF]">
                    likes
                </span>
            </div>
        </div>
    );
}
