'use client'

import { useRef } from "react";

type ImageInputBtnProps = {
    updateImage: (imgStr: string) => void
}

export default function ImageInputBtn(props: ImageInputBtnProps) {
    // Props
    const {updateImage} = props

    // Component State
    const fileInputRef = useRef<HTMLInputElement>(null);

    // handlers
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                updateImage(imageUrl)
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
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // DOM
    return (
        <button
            className="rounded-lg font-semibold border border-transparent bg-action-primary text-light active:border-action-primary-active disabled:bg-action-primary-disabled disabled:text-action-primary-disabled disabled:active:border-transparent px-[0.9333rem] py-[0.4333rem] text-sm !mb-[1px] flex h-[40px] w-[40px] min-w-[40px] items-center justify-center self-end !rounded-full !bg-transparent !p-0 hover:!bg-overlay-faint disabled:hover:!bg-transparent"
            type="button"
            onClick={handleImageClick}
        >
            <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className="text-[var(--yellow-9)]"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                style={{
                    display: "inline-block",
                    verticalAlign: "text-bottom",
                    overflow: "visible",
                }}
            >
                <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
            </svg>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </button>
    );
}

                // <div
                //     title="Add image"
                //     className="
                //         border border-faint 
                //         sm:hover:cursor-pointer sm:hover:bg-zinc-200 sm:hover:opacity-70 sm:dark:hover:bg-zinc-800 
                //         w-40 
                //         flex flex-col justify-center items-center 
                //         p-2 
                //         rounded-md 
                //     "
                //     onClick={handleImageClick}
                // >
                //     <PlusIcon width={64} height={64} color="#9FA3AF" />
                    // <input
                    //     type="file"
                    //     ref={fileInputRef}
                    //     style={{ display: "none" }}
                    //     accept="image/*"
                    //     onChange={handleFileChange}
                    // />
                // </div>