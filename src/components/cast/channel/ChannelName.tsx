"use client";

import { CastEditContext } from "@/contexts/CastEditContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

const DEFAULT_CHANNEL_NAME = "degen";
export default function ChannelName() {
    // Context
    const context = useContext(CastEditContext)
    const cast = context.cast
    // Context mutation
    const updateChannelName = (channelName: string) => {
        context.updateCast({...cast, channelName})
    }
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
        if (!cast.channelName) {
            updateChannelName(DEFAULT_CHANNEL_NAME)
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        updateChannelName(e.currentTarget.value)
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

    if (inputFocused || !cast.channelName) {
        return (
            <input
                ref={inputRef}
                type="text"
                className={`
                        bg-inherit
                        ${!inputFocused && "hidden"}
                        font-mono
                        text-lg sm:text-base
                    `}
                style={{
                    minWidth: "8ch",
                    width: cast.channelName ? cast.channelName.length + 1 + "ch" : '8ch',
                }}
                autoFocus
                onFocus={handleFocus}
                onChange={handleOnChange}
                value={cast.channelName}
                onBlur={handleBlur}
            />
        );
    } else {
        return (
            <div>
                <span className="mx-1 text-sm text-[#576472] dark:text-[#9FA3AF]">
                    ·
                </span>
                <span
                    className="cursor-pointer overflow-hidden text-ellipsis text-sm text-[#576472] hover:underline dark:text-[#9FA3AF]"
                    title={"Override channel name"}
                    onClick={handleClick}
                >
                    {`/${cast.channelName}`}
                </span>
            </div>
        );
    }
}
