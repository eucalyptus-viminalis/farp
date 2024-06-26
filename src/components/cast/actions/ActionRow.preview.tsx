import ActionIcon from "@/components/icons/ActionIcon";
import LikeIcon from "../icons/LikeIcon.preview.context";
import RecastIcon from "../icons/RecastIcon.preview.context";
import ReplyIcon from "../icons/ReplyIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import BookmarkIcon from "../icons/BookmarkIcon.preview.context";

export default function ActionRow() {
    return (
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
    );
}
