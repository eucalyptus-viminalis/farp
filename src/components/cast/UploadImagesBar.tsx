"use client";

import { EditContext } from "@/app/edit/context";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useContext, useRef, useState } from "react";

// Assumming root cast
// TODO: Create state for each cast and handler mutations with useEffect?
export default function UploadImagesBar() {
    // Props
    // Context
    const context = useContext(EditContext)
    const cast = context.state.rootCast
    // States
    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
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
                const imageUrl = e.target?.result as string;
                // setImageUrls((prev) => [...prev, imageUrl]);
                context.dispatch({type:"SET_ROOT_CAST", payload: {...cast, imageEmbeds: [...cast.imageEmbeds, imageUrl]}})
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
    const handleRemoveImage = (index: number) => {
        // setImageUrls((prev) => prev.filter((_, i) => i !== index));
        context.dispatch({type:"SET_ROOT_CAST", payload: {...cast, imageEmbeds: cast.imageEmbeds.filter((_,i)=>i !== index)}})
    };

    return (
        <div className="flex flex-row h-40 gap-2">
            {cast.imageEmbeds.map((imageUrl, index) => (
                <div 
                    key={index}
                    className="group relative rounded-md overflow-hidden h-40 w-40"
                    onClick={() => handleRemoveImage(index)}
                >
                    <div className="
                        w-full h-full 
                        bg-red-500 
                        absolute top-0 left-0 
                        opacity-0 
                        group-hover:opacity-70
                        transition-opacity duration-200
                        flex flex-col justify-center items-center
                        hover:cursor-pointer
                        z-10
                    ">
                        <TrashIcon width={64} height={64} color="white"/>
                    </div>
                    <Image
                        alt="pfp"
                        className="object-cover"
                        fill
                        src={imageUrl}
                        unoptimized
                    />
                </div>
            ))}
            {cast.imageEmbeds.length < 2 && (
                <div
                    title="Add image"
                    className="
                        border border-faint 
                        hover:cursor-pointer hover:bg-zinc-200 hover:opacity-70 dark:hover:bg-zinc-800 
                        w-40 
                        flex flex-col justify-center items-center 
                        p-2 
                        rounded-md 
                    "
                    onClick={handleImageClick}
                >
                    <PlusIcon width={64} height={64} color="#9FA3AF" />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            )}
        </div>
    );
}
