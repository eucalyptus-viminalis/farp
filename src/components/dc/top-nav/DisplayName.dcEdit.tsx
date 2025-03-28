"use client";

import { DCEditContext } from "@/app/_context/DCEditContext";
import { useContext, useRef, useState, useEffect, ChangeEvent } from "react";

// Assuming root cast
export default function DisplayName() {
  // Context
  const cx = useContext(DCEditContext);
  const { dispatch, state } = cx;
  const displayName = state.displayNameOverride;
  const activeBadge = state.activeBadgeOverride;
  // States
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setInputFocused(false);
    if (!displayName) {
      // cx.updateCast({...cast, displayNameOverride: cast.user?.display_name ?? 'Dan Romero'})
      dispatch({
        type: "OVERRIDE_DISPLAY_NAME",
        payload: state.user?.display_name ?? "unknown",
      });
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({
      type: "OVERRIDE_DISPLAY_NAME",
      payload: e.target.value,
    });
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

  return (
    <div className="flex min-w-0 flex-row items-center">
      {inputFocused ? (
        <input
          ref={inputRef}
          type="text"
          className={`
                                bg-inherit
                                text-lg sm:text-base
                                font-mono
                                ${!inputFocused && "hidden"}
                            `}
          style={{
            minWidth: "12ch",
            width: displayName.length + "ch",
          }}
          autoFocus
          onFocus={handleFocus}
          onChange={handleOnChange}
          value={displayName}
          onBlur={handleBlur}
        />
      ) : (
        <span
          title="Override display name"
          onClick={handleClick}
          className="
                                !block
                                min-w-0
                                overflow-hidden
                                text-ellipsis text-[var(--yellow-9)] text-base
                                whitespace-nowrap
                                break-words
                                sm:hover:underline
                                font-semibold
                            "
        >
          {displayName}
        </span>
      )}
      {activeBadge && (
        <div className="ml-1 flex flex-row items-center space-x-1">
          <div className="relative cursor-pointer rounded-full sm:hover:bg-overlay-faint">
            <div className="flex flex-shrink-0 items-center justify-center rounded-full text-active-badge h-[14px] w-[14px]">
              <img
                loading="lazy"
                src="/ActiveBadge.png"
                alt="Active Badge"
                className="object-contain"
                width={12}
                height={12}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
