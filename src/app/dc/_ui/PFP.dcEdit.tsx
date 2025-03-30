"use client";

import { useContext, useRef, useState } from "react";
import { UploadIcon } from "@radix-ui/react-icons";
import { DCEditContext } from "@/app/_context/DCEditContext";

type PFPProps = {
  size?: number;
};

export default function PFP(props: PFPProps) {
  // Props
  const { size } = props;
  const pfpSize = size ?? 36;

  // Context
  const cx = useContext(DCEditContext);
  const { dispatch, state } = cx;
  const pfpUrl = state.pfpOverride;
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State
  const [showOverlay, setShowOverlay] = useState(false);
  // State mutations
  const overridePFP = (newPfpUrl: string) => {
    // cx.updateCast({...cast, pfpOverride: newPfpUrl})
    dispatch({
      type: "OVERRIDE_PFP",
      payload: newPfpUrl,
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
      className="relative inline-block sm:hover:cursor-pointer h-min shrink-0"
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
                `}
        alt="avatar"
        style={{
          width: `${pfpSize}px`,
          height: `${pfpSize}px`,
          minWidth: `${pfpSize}px`,
          minHeight: `${pfpSize}px`,
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
          <UploadIcon width={pfpSize} height={pfpSize} />
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
