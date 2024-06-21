"use client";

import { useContext, useRef, useState } from "react";
import {UploadIcon} from '@radix-ui/react-icons'
import { EditContext } from "@/app/edit/context";

type PFPProps = {
    size: number;
    mr?: boolean;
};

export default function PFPUploadable(props: PFPProps) {
    // Props
    const { size, mr } = props;

    // Context
    const context = useContext(EditContext);
    const cast = context.state.rootCast;
    const pfpUrl = cast.pfpOverride;
    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [showOverlay, setShowOverlay] = useState(false);
    // State mutations
    const override = (newPfpUrl: string) => {
        context.dispatch({
            type: "SET_ROOT_CAST",
            payload: { ...cast, pfpOverride: newPfpUrl },
        });
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
                override(newPfpUrl);
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

function UploadSvgIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
            ></path>
        </svg>
    );
}
