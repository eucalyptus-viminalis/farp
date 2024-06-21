"use client";

import { EditContext } from "@/app/edit/context";
import { useContext, useRef, useState, useEffect, ChangeEvent } from "react";

// Assuming root cast
export default function DisplayName() {
    // Context
    // TODO: create CastContext
    const context = useContext(EditContext)
    const displayName = context.state.rootCast.displayNameOverride
    const activeBadge = context.state.rootCast.activeBadgeOverride
    // States
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
        if (!displayName) {
            context.dispatch({type: "SET_ROOT_CAST", payload: {...context.state.rootCast, displayNameOverride: context.state.rootCast.user?.display_name ?? 'Dan Romero'}})
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        context.dispatch({type: "SET_ROOT_CAST", payload: {...context.state.rootCast, displayNameOverride: e.target.value}})
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
        <span className="relative h-min w-auto" data-state="closed">
            <div className="relative min-w-0">
                <div className="flex min-w-0 flex-row items-center">
                    {inputFocused ? (
                        <input
                            ref={inputRef}
                            type="text"
                            className={`
                                bg-inherit
                                font-mono
                                ${!inputFocused && "hidden"}
                            `}
                            style={{
                                minWidth: "12ch",
                                width: displayName.length + "ch",
                            }}
                            autoFocus
                            onFocus={handleFocus}
                            onChange={handleOnChange}
                            value={displayName}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <span
                            title="Override display name"
                            onClick={handleClick}
                            className="
                                !block 
                                min-w-0 
                                overflow-hidden 
                                text-ellipsis text-default text-base
                                whitespace-nowrap 
                                break-words 
                                hover:underline 
                                font-semibold
                            "
                        >
                            {displayName}
                        </span>
                    )}
                    {activeBadge && (
                        <div className="ml-1 flex flex-row items-center space-x-1">
                            <div className="flex flex-shrink-0 items-center justify-center rounded-full text-active-badge h-[14px] w-[14px]">
                                <img
                                    loading="lazy"
                                    src="/ActiveBadge.png"
                                    alt="Active Badge"
                                    className="object-contain"
                                    width={12}
                                    height={12}
                                    // style="width: 12px; height: 12px;"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </span>
    );
}
