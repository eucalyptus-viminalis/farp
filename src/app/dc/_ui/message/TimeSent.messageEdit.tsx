"use client";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { MessageEditContext } from "../../_context/MessageEditContext";

export default function TimeSent() {
  // Context
  const cx = useContext(MessageEditContext);
  const { msg, updateMsg, msgIndex } = cx;

  // Component States
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [timeStr, setTimeStr] = useState(msg.timeDisplay);

  // Context mutations
  const updateTime = (time: string) => {
    updateMsg(
      {
        ...msg,
        timeDisplay: time,
      },
      msgIndex,
    );
  };

  // Handlers
  const handleClick = () => {
    setInputFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleFocus = () => {
    setInputFocused(true);
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  const handleBlur = () => {
    updateTime(timeStr.length !== 0 ? timeStr : "4:20 PM");
    setInputFocused(false);
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTimeStr(e.currentTarget.value);
  };

  // Effects
  useEffect(() => {
    setTimeStr(msg.timeDisplay);
  }, [msg.timeDisplay]);
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleBlur();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleBlur]);

  // DOM
  if (inputFocused) {
    return (
      <input
        ref={inputRef}
        type="text"
        className={`
                    absolute
                    ${msg.isSelfDC && "-translate-x-full"}
                    min-w-[50px]
                    w-max !min-w-0
                    bg-inherit
                    bg-app
                    text-lg sm:text-base
                    ${!inputFocused && "hidden"}
                    font-mono
                `}
        style={{
          minWidth: "8ch",
          width: timeStr.length + 1 + "ch",
        }}
        autoFocus
        onFocus={handleFocus}
        onChange={handleOnChange}
        value={timeStr}
        onBlur={handleBlur}
      />
    );
  } else {
    return (
      <div
        className={`
                    mr-2 min-w-[50px] text-xs
                    w-max !min-w-0 text-end
                    text-[var(--yellow-9)]
                    sm:hover:underline
                `}
        title="Override time text"
        onClick={handleClick}
      >
        {msg.timeDisplay}
      </div>
    );
  }
}
