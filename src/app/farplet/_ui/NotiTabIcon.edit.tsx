import { IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useFarplet } from "../_hooks/useFarplet";

export default function NotiTabIcon() {
  // Context
  const context = useFarplet();

  // Context mutations
  const updateNotiCount = (count: number) => {
    context.dispatch({
      type: "SET_NOTI_COUNT",
      payload: {
        notiCount: count,
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
    if (!context.state.notiCount) {
      updateNotiCount(1);
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateNotiCount(e.currentTarget.valueAsNumber);
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
      onClick={handleClick}
      className="relative flex text-[var(--yellow-9)] items-center justify-center"
    >
      {/* Notification Icon */}
      <IonIcon className="w-7 h-7" icon={notificationsOutline} />

      {/* Red Circle (Badge) */}
      <span className="w-5 h-5 bg-red-600 flex items-center justify-center text-center text-xs rounded-full absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row items-center justify-center">
          {/* <div> */}
          {inputFocused ? (
            <input
              ref={inputRef}
              type="number"
              className={`
                text-lg
                                bg-inherit
                                bg-app
                                font-mono
                                ${!inputFocused && "hidden"}
                            `}
              style={{
                minWidth: "4ch",
                width: context.state.notiCount.toString().length + 2 + "ch",
              }}
              autoFocus
              onFocus={handleFocus}
              onChange={handleOnChange}
              value={context.state.notiCount}
              onBlur={handleBlur}
            />
          ) : (
            <span
              className="
                          text-xs font-bold
                          text-[var(--yellow-9)] dark:text-[var(--yellow-9)]
                          hover:underline
                          "
              title={"Override noti count"}
            >
              {context.state.notiCount}
            </span>
          )}
          {/* </div> */}
        </div>
      </span>
    </div>
  );
}
