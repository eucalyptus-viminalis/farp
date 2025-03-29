"use client";

import { useContext, useState } from "react";
import DeleteButton from "./DeleteButton.messageEdit";
import CalendarBtn from "./CalendarBtn.messageEdit";
import EmojiPopover from "./EmojiPopover.messageEdit";
import EmojiPopoverBtn from "./EmojiPopoverBtn";
import { MessageEditContext } from "../../_context/MessageEditContext";

export default function HoverActions() {
  // Context
  const cx = useContext(MessageEditContext);
  const { msg, msgIndex, updateMsg } = cx;
  // States
  const [showEmojiPopover, setShowEmojiPopover] = useState(false);
  // Handlers
  const handleReactionClick = () => {
    setShowEmojiPopover(true);
  };
  const hideEmojiPopover = () => {
    setShowEmojiPopover(false);
  };
  return (
    <div
      className={`
                flex items-center
                space-x-3
                sm:opacity-0 sm:group-hover:opacity-100
                sm:transition-all
                ${msg.isSelfDC && "mr-2 flex-row-reverse space-x-reverse"}
                ${!msg.isSelfDC && "ml-2 flex-row"}
            `}
    >
      <div className="flex flex-col text-muted hover:text-muted-light">
        <div className="flex shrink-0 flex-row gap-4">
          {/* Delete */}
          <DeleteButton />
          <CalendarBtn />
          {/* Reply To */}
          {/* <div>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                            className="cursor-pointer"
                            viewBox="0 0 16 16"
                            width="16"
                            height="16"
                            fill="currentColor"
                            style={{
                                display: "inline-block",
                                verticalAlign: "text-bottom",
                                overflow: "visible",
                            }}
                        >
                            <path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"></path>
                        </svg>
                    </div> */}
          {/* React */}
          <div className="relative">
            <EmojiPopoverBtn handleReactionClick={handleReactionClick} />
            <EmojiPopover
              show={showEmojiPopover}
              hidePopover={hideEmojiPopover}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
