'use client'

import { useContext } from "react";
import { CastPreviewContext } from "@/app/preview/CastPreview";
import ReplyCount from "./ReplyCount.preview.context";
import LikeCount from "./LikeCount.preview.context";
import ChannelName from "../ChannelName";

export default function StatsRow() {
    const context = useContext(CastPreviewContext)
    const cast = context.cast
    return (
        <div className="pb-1">
            <div className="flex flex-row items-center space-x-1">
                <ReplyCount/>
                <LikeCount/>
                {cast.channelName && (
                    // <div>
                    //     <span className="mx-1 text-sm text-[#576472] dark:text-[#9FA3AF]">
                    //         ·
                    //     </span>
                    //     <a
                    //         className="cursor-pointer overflow-hidden text-ellipsis text-sm text-[#576472] hover:underline dark:text-[#9FA3AF]"
                    //         title={channelName}
                    //         href={`/~/channel/${channelName}`}
                    //     >
                    //         {`/${channelName}`}
                    //     </a>
                    // </div>
                    <ChannelName/>
                )}
            </div>
        </div>
    );
}
