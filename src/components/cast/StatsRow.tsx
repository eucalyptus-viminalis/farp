'use client'

import LikeCount from "@/components/cast/stats/LikeCount";
import ReplyCount from "@/components/cast/stats/ReplyCount";
import ChannelName from "./channel/ChannelName";

type StatsRowProps = {
    channelName?: string;
};

export default function StatsRow(props: StatsRowProps) {
    const { channelName } = props;
    return (
        <div className="pb-1">
            <div className="flex flex-row items-center space-x-1">
                <ReplyCount/>
                <LikeCount/>
                {channelName && (
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
