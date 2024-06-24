"use client";
import React, { useContext, useRef, useState } from "react";
import BottomBar from "./BottomBar";
import CastContentEdit from "../cast-content-edit/CastContentEdit-no-fullscreen";
import CastHeader from "./CastHeader";
import PFPUploadable from "./pfp/PFPUploadable";
import { CastEditContext } from "@/contexts/CastEditContext";

type Reply = {
    index: number;
};

function CastEdit() {
    // Props
    const context = useContext(CastEditContext);
    const cast = context.cast;
    // States
    const [agoText, setAgoText] = useState<string>("42m");
    // Refs
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Handlers
    // const adjustTextareaHeight = () => {
    //     if (textareaRef.current) {
    //         textareaRef.current.style.height = "auto"; // Reset height
    //         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    //     }
    // };
    return (
        <div className="">
            <div className="relative">
                <div className="relative px-4 py-2 hover:bg-overlay-faint border-t border-faint">
                    <div className="relative flex flex-col">
                        <div className="relative flex">
                            <PFPUploadable mr size={48} />
                            {/* Main Content */}
                            <div className="relative w-full min-w-0">
                                <CastHeader/>
                                {/* Cast Content */}
                                <CastContentEdit />
                                <BottomBar />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Border */}
                {/* <div
                        className="absolute top-0 w-[1px] border-l-2 border-faint"
                        style={{ left: "38px", height: "28px" }}
                    ></div>
                    <div
                        className="absolute bottom-0 w-[1px] border-l-2 border-faint"
                        style={{ left: "38px", top: "28px" }}
                    ></div> */}
                {/*  */}
            </div>
        </div>
    );
}

export default CastEdit;
