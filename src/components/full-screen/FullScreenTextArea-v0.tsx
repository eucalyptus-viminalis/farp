"use client";

import { EditContext } from "@/contexts/EditContext";
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
        // setCastText(e.currentTarget.value);
        updateCastText(e.currentTarget.value);
        // adjustTextareaHeight();
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
                    // onFocus={() => setTextareaFocused(true)}
                    onChange={onChangeHandler}
                    value={cast.castText}
                    // autoFocus
                    // className={`
                    //     bg-inherit
                    //     w-full
                    //     resize-none
                    //     outline-none
                    //     overflow-clip
                    //     ${!textareaFocused && "hover:cursor-pointer"}
                    // `}
                    spellCheck={false}
                ></textarea>
                {/* <Cross1Icon
                            className="
                                absolute stroke-[var(--violet-7)] top-0 right-0 m-8
                            "
                            width={64} height={64}
                        /> */}
                {/* <EnterIcon
                            className="
                                absolute bottom-0 right-0 m-8 stroke-[var(--violet-7)]
                            "
                            width={64} height={64}
                        /> */}
            </div>
            {/* <div 
                        className="
                            fixed bottom-0 left-0
                            z-20 
                            border-t border-faint
                            bg-app
                            w-screen
                            h-20
                        ">
                        <button
                            className="
                                absolute bottom-0 right-0 m-8 stroke-[var(--violet-7)]
                                px-2 py-4
                                dark
                                text-[var(--violet-10)]
                                bg-[--violet-3]
                                flex flex-row justify-between gap-8
                            " 
                        >
                            <span>Done</span>
                            <span className="font-mono rounded-lg border border-[var(--custom-6)] flex items-center justify-center">esc</span>
                        </button>
                        </div> */}
        </div>
    );
}

export default FullScreenTextArea;
