"use client";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {EnterIcon, Cross1Icon,} from '@radix-ui/react-icons'
import { EditContext } from "@/contexts/EditContext";
import FullScreenTextArea from "../full-screen/FullScreenTextArea-v0-refurbished";
import UploadImagesBar from "../cast/UploadImagesBar";

// Assumming root cast
export default function CastContentEdit() {
    // Props
    // Context
    const context = useContext(EditContext)
    const cast = context.state.rootCast
    // States
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaFocused, setTextareaFocused] = useState<boolean>(false);
    const [showFullscreen, setShowFullScreen] = useState(false)
    // Handlers
    const handleDivClick = () => {
        setShowFullScreen(true)
    };
    useEffect(()=> {
        if (textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
          }
    },[showFullscreen, textareaRef])
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        // setCastText(e.currentTarget.value);
        updateCastText(e.currentTarget.value)
        // adjustTextareaHeight();
    };
    const updateCastText = (text: string) => {
        context.dispatch({type:'SET_ROOT_CAST', payload: {...cast, castText: text}})
    }
    // const adjustTextareaHeight = () => {
    //     if (textareaRef.current) {
    //         textareaRef.current.style.height = "auto"; // Reset height
    //         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    //     }
    // };
    return (
        <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
            {showFullscreen && (
                <FullScreenTextArea onBlur={{}} textareaRef={textareaRef}/>
            )}
            <div className="line-clamp-feed">
                <div
                    className={`
                        ${!showFullscreen && "transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"}
                        ${!showFullscreen && "hover:cursor-pointer"}
                        min-h-32
                    `}
                    onClick={handleDivClick}
                >
                    {cast.castText ? (
                        <span
                            className="
                                absolute
                                hover:cursor-pointer
                            "
                        >
                            {cast.castText}
                        </span>
                    ) : (
                        <span
                            className="
                                absolute
                                text-muted
                                hover:cursor-pointer
                            "
                        >
                            Start farping...
                        </span>
                    )}
                    {/* <textarea
                        ref={textareaRef}
                        onBlur={() => setTextareaFocused(false)}
                        onFocus={() => setTextareaFocused(true)}
                        onChange={onChangeHandler}
                        value={cast.castText}
                        className={`
                            bg-inherit 
                            w-full
                            resize-none
                            outline-none
                            overflow-clip
                            ${!textareaFocused && "hover:cursor-pointer"}
                        `}
                        spellCheck={false}
                    ></textarea> */}
                </div>
                {/* Upload images */}
                <UploadImagesBar/>
            </div>
        </div>
    );
}
