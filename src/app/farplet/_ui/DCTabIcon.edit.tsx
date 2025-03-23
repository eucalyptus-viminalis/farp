import { IonIcon } from "@ionic/react";
import { chatbubblesOutline } from "ionicons/icons";
import { useFarplet } from "../_hooks/useFarplet";
import { useState, useRef, ChangeEvent, useEffect } from "react";

export default function DCTabIcon() {
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
  });
  return (
    <div
      className="relative flex text-[var(--yellow-9)] items-center justify-center"
      onClick={handleClick}
    >
      {/* Notification Icon */}
      <IonIcon className="w-7 h-7" icon={chatbubblesOutline} />
      {/* Red Circle (Badge) */}
      <span className="w-5 h-5 flex items-center justify-center text-center text-xs rounded-full bg-red-600 absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
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
                                text-lg
                                ${!inputFocused && "hidden"}
                            `}
              style={{
                minWidth: "2ch",
                width:
                  String(context.state.dcCount.toString().length + 1) + "ch",
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
                          text-xs font-bold
                          text-[var(--yellow-9)] dark:text-[var(--yellow-9)]
                          hover:underline
                          "
              title={"Override dc count"}
            >
              {context.state.dcCount}
            </span>
          )}
          {/* </div> */}
        </div>
      </span>
    </div>
  );
}
