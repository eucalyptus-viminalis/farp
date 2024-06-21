"use client";

import { EditContext } from "@/app/edit/context";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function Ago() {
    // Props
    // Context
    const context = useContext(EditContext)
    const cast = context.state.rootCast
    // Context mutations
    const updateAgo =(ago: string)=> {
        context.dispatch({type:'SET_ROOT_CAST', payload:{...cast, ago}})
    }
    // Component states
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        setInputFocused(true)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }
    const handleFocus = () => {
        setInputFocused(true)
        if (inputRef.current) {
            inputRef.current.select()
        }
    }
    const handleBlur =() => {
        setInputFocused(false)
        if (!cast.ago) {
            updateAgo('1h')
        }
    }
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        updateAgo(e.currentTarget.value)
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

    if (inputFocused) {
        return (
            <input
                ref={inputRef}
                type="text"
                className={`
                    bg-inherit
                    ${!inputFocused && "hidden"}
                    font-mono
                `}
                style={{
                    minWidth: '3ch',
                    width: cast.ago.length + 1 + 'ch'
                }}
                autoFocus
                onFocus={handleFocus}
                onChange={handleOnChange}
                value={cast.ago}
                onBlur={handleBlur}
            />
        )
    } else {
        return (
        <div
            className="
                text-muted hover:underline
            "
            title="Override ago text"
            onClick={handleClick}
        >
            {cast.ago}
        </div>
        )
    }
}
