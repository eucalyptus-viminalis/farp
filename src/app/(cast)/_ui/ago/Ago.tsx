"use client";

import { CastEditContext } from "@/app/(cast)/_context/CastEditContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function Ago() {
  // Props
  // Context
  const context = useContext(CastEditContext);
  const cast = context.cast;
  // Context mutations
  const updateAgo = (ago: string) => {
    context.updateCast({
      ...cast,
      ago,
    });
  };
  // Component states
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setInputFocused(false);
    if (!cast.ago) {
      updateAgo("1h");
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateAgo(e.currentTarget.value);
  };
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

  if (inputFocused) {
    return (
      <input
        ref={inputRef}
        type="text"
        className={`
                    bg-inherit
                    text-lg sm:text-base
                    ${!inputFocused && "hidden"}
                    font-mono
                `}
        style={{
          minWidth: "3ch",
          width: cast.ago.length + 1 + "ch",
        }}
        autoFocus
        onFocus={handleFocus}
        onChange={handleOnChange}
        value={cast.ago}
        onBlur={handleBlur}
      />
    );
  } else {
    return (
      <div
        // className="
        //     text-muted hover:underline
        // "
        className="
                text-[var(--yellow-9)]
                hover:underline
            "
        title="Override ago text"
        onClick={handleClick}
      >
        {cast.ago}
      </div>
    );
  }
}
