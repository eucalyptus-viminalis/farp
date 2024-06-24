"use client";

import { useContext, useRef, useState } from "react";
import {UploadIcon} from '@radix-ui/react-icons'
import { CastEditContext } from "@/contexts/CastEditContext";

type PFPProps = {
    size: number;
    mr?: boolean;
};

export default function PFPUploadable(props: PFPProps) {
    // Props
    const { size, mr } = props;

    // Context
    const context = useContext(CastEditContext);
    const cast = context.cast
    const pfpUrl = cast.pfpOverride;
    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [showOverlay, setShowOverlay] = useState(false);
    // State mutations
    const overridePFP = (newPfpUrl: string) => {
        console.log('overriding')
        context.updateCast({...cast, pfpOverride: newPfpUrl})
    };

    // Handlers
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPfpUrl = e.target?.result as string;
                overridePFP(newPfpUrl);
                // Update the context or perform any additional actions as needed
                // context.dispatch({ type: 'SET_USER_PFP', payload: newPfpUrl });
                // Clear the input value to allow re-uploading the same file
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleMouseOver = (e: any) => {
        setShowOverlay(true);
    };
    const handleMouseLeave = (e: any) => {
        setShowOverlay(false);
    };

    // DOM
    return (
        <span
            title="Override pfp"
            className="relative hover:cursor-pointer h-min w-auto"
            data-state="closed"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleImageClick}
        >
            <img
                loading="lazy"
                src={pfpUrl}
                className={`
                    aspect-square 
                    shrink-0 
                    rounded-full 
                    border border-default 
                    object-cover 
                    bg-app 
                    relative 
                    
                    ${mr ? "mr-2" : ""} 
                `}
                alt="avatar"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                }}
            />
            {showOverlay && (
                <div
                    className={`
                        flex flex-col ${
                            "w-[" + size + "px]"
                        } rounded-full justify-center items-center absolute top-0 h-full bg-zinc-200 dark:bg-zinc-800 opacity-90
                    `}
                >
                    {/* <UploadSvgIcon /> */}
                        <UploadIcon width={32} height={32} />
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </span>
    );
}
