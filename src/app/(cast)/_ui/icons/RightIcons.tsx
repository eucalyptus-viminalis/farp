import ShareIcon from "@/app/_ui/icons/ShareIcon";
import ActionIcon from "../ActionIcon";
import BookmarkIcon from "../BookmarkIcon";

export default function RightIcons() {
  return (
    <div className="-mr-4 flex flex-row items-center gap-3">
      <ActionIcon />
      <BookmarkIcon />
      <ShareIcon />
    </div>
  );
}
