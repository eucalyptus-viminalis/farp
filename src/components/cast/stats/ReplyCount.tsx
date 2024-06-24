"use client";

import { CastEditContext } from "@/contexts/CastEditContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function ReplyCount() {
    // Context
    const context = useContext(CastEditContext)
    const cast = context.cast
    // Context mutations
    const updateReplyCount = (count: number) => {
        context.updateCast({...cast, replyCount: count})
    }
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
        if (!cast.replyCount) {
            updateReplyCount(69)
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        updateReplyCount(e.currentTarget.valueAsNumber)
    }
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Enter') {
                handleBlur();
            }
        };

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener('keydown', handleKeyDown);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [handleBlur]);
    return (
        <div className="flex flex-row items-center">
            <div>
                {inputFocused ? (
                    <input
                        ref={inputRef}
                        type="number"
                        className={`
                            bg-inherit
                            font-mono
                            ${!inputFocused && "hidden"}
                        `}
                        style={{
                            minWidth: '2ch',
                            width: cast.replyCount.toString().length + 2 + "ch",
                        }}
                        autoFocus
                        onFocus={handleFocus}
                        onChange={handleOnChange}
                        value={cast.replyCount}
                        onBlur={handleBlur}
                    />
                ) : (
                    <span
                        className="
                            mr-1 text-sm font-semibold text-[#576472] dark:text-[#9FA3AF]
                            hover:underline
                        "
                        title="Override reply count"
                        onClick={handleClick}
                    >
                        {cast.replyCount.toString()}
                    </span>
                )}
                <span className="text-sm text-[#576472] dark:text-[#9FA3AF]">
                    replies
                </span>
            </div>
            <span className="mx-1 text-muted">·</span>
        </div>
    );
}
