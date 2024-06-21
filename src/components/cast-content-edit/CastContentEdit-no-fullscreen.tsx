"use client";

import './custom.css'
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { EditContext } from "../../app/edit/context";
import UploadImagesBar from '../cast/UploadImagesBar';

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
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    };
    useEffect(()=> {
        if (textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
          }
    },[showFullscreen, textareaRef])
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        updateCastText(e.currentTarget.value)
        adjustTextareaHeight();
    };
    const updateCastText = (text: string) => {
        context.dispatch({type:'SET_ROOT_CAST', payload: {...cast, castText: text}})
    }
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
        }
    };
    return (
        <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
            <div className="line-clamp-feed">
                <div
                    className={`
                        ${!textareaFocused && "hover:cursor-pointer"}
                        min-h-32
                        relative
                        group
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
                    <textarea
                        ref={textareaRef}
                        onBlur={() => setTextareaFocused(false)}
                        onFocus={() => setTextareaFocused(true)}
                        onChange={onChangeHandler}
                        value={cast.castText}
                        className={`
                            bg-inherit 
                            w-full
                            min-h-32
                            resize-none
                            outline-none
                            overflow-clip
                            ${!textareaFocused && "hover:cursor-pointer"}
                        `}
                        spellCheck={false}
                    ></textarea>
                    {/* Overlay */}
                    <div
                        id='striped-overlay'
                        className={`
                            absolute
                            hidden
                            z-10
                            ${!textareaFocused && 'group-hover:block'}
                            w-full h-full
                            top-0 left-0
                            ${!textareaFocused && 'striped-box'}
                        `}   
                    ></div>
                </div>
                {/* Upload images */}
                <UploadImagesBar/>
            </div>
        </div>
    );
}
