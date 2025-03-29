"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { CastEditContext } from "@/app/(cast)/_context/CastEditContext";
import { useContext } from "react";

export default function DeleteReplyButton() {
  const cx = useContext(CastEditContext);

  const handleOnClick = (e: any) => {
    e.preventDefault();
    if (cx.replyIndex !== undefined) {
      cx.deleteReply(cx.replyIndex);
    }
  };
  return (
    <button onClick={handleOnClick}>
      {/* <CrossCircledIcon color='var(--yellow-9)' width={22} height={22}/> */}
      <Cross2Icon color="var(--yellow-9)" width={22} height={22} />
      {/* <Cross1Icon color='var(--yellow-9)' width={22} height={22}/> */}
    </button>
  );
}
