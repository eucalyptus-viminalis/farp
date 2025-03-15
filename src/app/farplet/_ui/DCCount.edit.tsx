"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFarplet } from "../_hooks/useFarplet";

export default function DCCount() {
  // Context
  const context = useFarplet();

  // Context mutations
  const updateDCCount = (count: number) => {
    context.dispatch({
      type: "SET_DC_COUNT",
      payload: {
        dcCount: count,
      },
    });
  };

  // Component States
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
    // DEBUG: might need to fix this?
    if (!context.state.dcCount) {
      updateDCCount(1);
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateDCCount(e.currentTarget.valueAsNumber);
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
    <div className="flex flex-row items-center justify-center">
      {/* <div> */}
      {inputFocused ? (
        <input
          ref={inputRef}
          type="number"
          className={`
                            bg-inherit
                            bg-app
                            font-mono
                            text-lg sm:text-base
                            ${!inputFocused && "hidden"}
                        `}
          style={{
            minWidth: "4ch",
            width: context.state.dcCount.toString().length + 2 + "ch",
          }}
          autoFocus
          onFocus={handleFocus}
          onChange={handleOnChange}
          value={context.state.dcCount}
          onBlur={handleBlur}
        />
      ) : (
        <span
          className="
                      text-base font-bold
                      text-[var(--yellow-9)] dark:text-[var(--yellow-9)]
                      hover:underline
                      "
          title={"Override dc count"}
          onClick={handleClick}
        >
          {context.state.dcCount}
        </span>
      )}
      {/* </div> */}
    </div>
  );
}
