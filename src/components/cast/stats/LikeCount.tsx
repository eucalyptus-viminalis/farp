"use client";

import { EditContext } from "@/app/edit/context";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function LikeCount() {
    // Context
    const context = useContext(EditContext)
    const cast = context.state.rootCast
    // Context mutations
    const updateLikeCount = (count: number) => {
        context.dispatch({type:'SET_ROOT_CAST',payload:{...cast, likeCount: count}})
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
        if (!cast.likeCount) {
            updateLikeCount(420)
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        updateLikeCount(e.currentTarget.valueAsNumber)
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
                            minWidth: "4ch",
                            width: cast.likeCount.toString().length + 2 + "ch",
                        }}
                        autoFocus
                        onFocus={handleFocus}
                        onChange={handleOnChange}
                        value={cast.likeCount}
                        onBlur={handleBlur}
                    />
                ) : (
                    <span
                        className="
                            mr-1 text-sm font-semibold text-[#576472] dark:text-[#9FA3AF]
                            hover:underline
                        "
                        title={'Override like count'}
                        onClick={handleClick}
                    >
                        {cast.likeCount}
                    </span>
                )}
                <span className="text-sm text-[#576472] dark:text-[#9FA3AF]">
                    likes
                </span>
            </div>
        </div>
    );
}
