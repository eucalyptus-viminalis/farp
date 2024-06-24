import LikeIcon from "../../icons/LikeIcon";
import RecastIcon from "../../icons/RecastIcon";
import ReplyIcon from "../../icons/ReplyIcon.context";

export default function LeftIcons() {
    return (
        <div
        className="flex flex-row items-center gap-3" 
        >
            <ReplyIcon/>
            <RecastIcon/>
            <LikeIcon/>
        </div>
    )
}