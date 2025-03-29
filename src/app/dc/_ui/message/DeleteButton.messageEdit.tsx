"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { MessageEditContext } from "../../_context/MessageEditContext";

export default function DeleteButton() {
  const cx = useContext(MessageEditContext);
  const { deleteMsg, msg, msgIndex } = cx;
  return (
    <div title="delete msg">
      <Cross1Icon
        onClick={() => deleteMsg(msgIndex)}
        aria-hidden="true"
        focusable="false"
        role="img"
        className="cursor-pointer"
        width="20"
        height="20"
        color="var(--yellow-9)"
        style={{
          display: "inline-block",
          verticalAlign: "text-bottom",
          overflow: "visible",
        }}
      />
    </div>
  );
}
