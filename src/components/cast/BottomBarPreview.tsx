import ActionIcon from "@/app/icons/ActionIcon";
import LikeIcon from "./icons/LikeIcon.preview.context";
import RecastIcon from "./icons/RecastIcon.preview.context";
import ReplyIcon from "./icons/ReplyIcon.context";
import BookmarkIcon from "./icons/BookmarkIcon.preview.context";
import ShareIcon from "@/app/icons/ShareIcon";
import StatsRow from "./stats/StatsRow.preview";

export default function BottomBarPreview() {
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
            <StatsRow/>
        </div>
    );
}
