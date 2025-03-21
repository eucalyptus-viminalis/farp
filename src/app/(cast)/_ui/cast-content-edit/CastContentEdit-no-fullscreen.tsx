"use client";

import "./custom.css";
import {
    ChangeEvent,
    KeyboardEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import UploadImagesBar from "../cast/UploadImagesBar";
import { CastEditContext } from "@/contexts/CastEditContext";

// Assumming root cast
export default function CastContentEdit() {
    // Props
    // Context
    const context = useContext(CastEditContext);
    const cast = context.cast;
    // States
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaFocused, setTextareaFocused] = useState<boolean>(false);
    const [showFullscreen, setShowFullScreen] = useState(false);
    // Handlers
    const handleDivClick = () => {
        setShowFullScreen(true);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };
    useEffect(() => {
        if (textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [showFullscreen, textareaRef]);
    const checkAtSymbol = (text: string, position: number) => {
        // Extract text up to the cursor position
        const textBeforeCursor = text.slice(0, position);
        // Check for the last word before the cursor
        const lastWordMatch = textBeforeCursor.match(/(\S+)$/);

        if (lastWordMatch) {
            const lastWord = lastWordMatch[0];
            // Split the textBeforeCursor by space
            const wordsArray = textBeforeCursor.split(" ");
            // Find the index of the last word in the wordsArray
            const lastWordIndex = wordsArray.length - 1;
            // Alert if the last word starts with an '@' and is not part of invalid cases
            if (
                lastWord.startsWith("@") &&
                lastWord.length > 1 &&
                !lastWord.startsWith("@@")
            ) {
                alert("Cursor is on a word that starts with @");
            }
        }
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // e.preventDefault()
        if (textareaRef.current) {
            const index = textareaRef.current.selectionStart;
            // alert(index)
            checkAtSymbol(cast.castText, index);
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        // if (e.currentTarget.value.at(-1) === '@' && e.currentTarget.value.at()) {
        //     alert('@')
        // }
        // if (e.currentTarget.value === '@' && !cast.castText.at(cast.castText.length -1)) {
        //     alert('go')
        // }
        updateCastText(e.currentTarget.value);
        adjustTextareaHeight();
    };
    const updateCastText = (text: string) => {
        // context.dispatch({type:'SET_ROOT_CAST', payload: {...cast, castText: text}})
        context.updateCast({ ...cast, castText: text });
    };
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
                                text-2xl
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
                        onKeyDown={onKeyDownHandler}
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
                    ></textarea> */}
                    {/* Overlay */}
                    <div
                        id="striped-overlay"
                        className={`
                            absolute
                            hidden
                            z-10
                            ${!textareaFocused && "group-hover:block"}
                            w-full h-full
                            top-0 left-0
                            ${!textareaFocused && "striped-box"}
                        `}
                    ></div>
                </div>
                {/* Upload images */}
                <UploadImagesBar />
            </div>
        </div>
    );
}
