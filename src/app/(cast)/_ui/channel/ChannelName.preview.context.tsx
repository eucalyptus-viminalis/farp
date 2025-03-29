"use client";

import { useContext } from "react";
import { CastPreviewContext } from "../../_context/CastPreviewContext";

export default function ChannelName() {
  // Context
  const context = useContext(CastPreviewContext);
  const cast = context.cast;

  return (
    <div>
      {/* <span className="mx-1 text-sm text-[#576472] dark:text-[#9FA3AF]">
                ·
            </span> */}
      <span
        className="cursor-pointer overflow-hidden text-ellipsis text-sm text-[#576472] hover:underline dark:text-[#9FA3AF]"
        title={"Override channel name"}
      >
        {`/${cast.channelName}`}
      </span>
    </div>
  );
}
