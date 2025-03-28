"use client";

import { EditContext } from "@/app/_context/EditContext";
import { ChangeEvent, useContext } from "react";

type FullScreenTextAreaProps = {
  onBlur: any;
  textareaRef: any;
};

function FullScreenTextArea(props: FullScreenTextAreaProps) {
  // Props
  const { onBlur, textareaRef } = props;
  // Context
  const context = useContext(EditContext);
  const cast = context.state.rootCast;
  // Context state mutations
  const updateCastText = (text: string) => {
    context.dispatch({
      type: "SET_ROOT_CAST",
      payload: { ...cast, castText: text },
    });
  };
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateCastText(e.currentTarget.value);
  };
  return (
    <div
      className="
                sm:text-4xl md:text-5xl lg:6xl
                bg-app
            "
    >
      <div
        className="
                    fixed z-10 top-0 left-0
                    w-screen min-h-screen
                    bg-inherit
                    opacity-90
                    dark
                "
      >
        <textarea
          className="
                        resize-none overflow-clip outline-none
                        min-h-screen w-full
                        p-10 sm:p-12 md:p-14
                        bg-inherit
                    "
          onBlur={onBlur}
          ref={textareaRef}
          onChange={onChangeHandler}
          value={cast.castText}
          spellCheck={false}
        ></textarea>
      </div>
    </div>
  );
}

export default FullScreenTextArea;
