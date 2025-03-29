"use client";

// import ActionIcon from "@/components/icons/ActionIcon";
import LikeIcon from "./icons/LikeIcon.preview.context";
import RecastIcon from "./icons/RecastIcon.preview.context";
import ReplyIcon from "./icons/ReplyIcon";
import BookmarkIcon from "./icons/BookmarkIcon.preview.context";
// import ShareIcon from "@/components/icons/ShareIcon";
import StatsRow from "./stats/StatsRow.preview";
import { useContext } from "react";
import { CastPreviewContext } from "../_context/CastPreviewContext";
import ActionIcon from "./ActionIcon";
import ShareIcon from "@/app/_ui/icons/ShareIcon";
// import { CastPreviewContext } from "@/contexts/CastPreviewContext";

export default function BottomBarPreview() {
  const con = useContext(CastPreviewContext);
  const castType = con.castType;
  return (
    <div className="flex w-full flex-col items-start">
      <div className="ml-[-8px] flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <ReplyIcon />
          <RecastIcon />
          <LikeIcon />
        </div>
        <div className="-mr-4 flex flex-row items-center gap-3">
          <ActionIcon />
          <BookmarkIcon />
          <ShareIcon />
        </div>
      </div>
      {!(castType === "nested-reply") && <StatsRow />}
    </div>
  );
}
