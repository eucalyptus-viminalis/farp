import ActionIcon from "./icons/ActionIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import ShareIcon from "./icons/ShareIcon";

export default function RightIcons() {
    return (
        <div
        className="-mr-4 flex flex-row items-center gap-3"  
        >
            <ActionIcon/>
            <BookmarkIcon/>
            <ShareIcon/>
        </div>
    )
}