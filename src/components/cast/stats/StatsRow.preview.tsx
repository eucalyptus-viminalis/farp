'use client'

import { useContext } from "react";
import ReplyCount from "./ReplyCount.preview.context";
import LikeCount from "./LikeCount.preview.context";
import { CastPreviewContext } from "@/contexts/CastPreviewContext";
import ChannelName from "../channel/ChannelName.preview.context";
import { PreviewMode } from "@/types/types";

type StatsRowProps = {
    previewMode?: PreviewMode
}

export default function StatsRow(props: StatsRowProps) {
    const {previewMode} = props
    const context = useContext(CastPreviewContext)
    const cast = context.cast
    return (
        <div className={`${previewMode && previewMode === 'expanded-web' ? 'px-4 pb-4 pt-2' : 'pb-1'}`}>
            <div className="flex flex-row items-center space-x-1">
                <ReplyCount/>
                <LikeCount/>
                {cast.likeCount > 0 && cast.channelName && (
                    <span className="mx-1 text-sm text-[#576472] dark:text-[#9FA3AF]">
                        ·
                    </span>
                )}
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
