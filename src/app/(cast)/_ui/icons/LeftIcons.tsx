// import LikeIcon from "../../icons/LikeIcon";
// import RecastIcon from "../../icons/RecastIcon";
// import ReplyIcon from "../../icons/ReplyIcon.context";

import RecastIcon from "@/app/_ui/icons/RecastIcon";
import LikeIcon from "@/app/_ui/icons/LikeIcon";
import ReplyIcon from "@/app/_ui/icons/ReplyIcon.edit";

export default function LeftIcons() {
  return (
    <div className="flex flex-row items-center gap-3">
      <ReplyIcon />
      <RecastIcon />
      <LikeIcon />
    </div>
  );
}
