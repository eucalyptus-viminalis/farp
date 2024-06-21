'use client'
import React, { ReactNode, useState } from "react";
import PFP from "../../app/PFP";
import CastHeader from "./CastHeader";
import ChannelLinkInCastText from "../../app/ChannelLinkInCastText";
import EmbedsContainer from "./embeds/EmbedsContainer";
import BottomBar from "./BottomBar";

type CastProps = {
    children?: ReactNode
    width?: number
}

function CastPrview(props: CastProps) {
    const [castText, setCastText] = useState<string>('')
    const {children, width} = props
    return (
        <div className={`bg-app ${width ? 'w-[' + width + 'px]' : 'w-[600px]'}`}>
            <div className="relative">
                <div className="relative px-4 py-2 hover:bg-overlay-faint border-t border-faint">
                    {/* Borders - hide these */}
                    {/* <div
                        className="absolute top-0 w-[1px] border-l-2 border-faint"
                        style={{ left: "38px", height: "28px" }}
                    ></div>
                    <div
                        className="absolute bottom-0 w-[1px] border-l-2 border-faint"
                        style={{ left: "38px", top: "28px" }}
                    ></div> */}
                    {/*  */}
                    <div className="relative flex flex-col">
                        <div className="relative flex">
                            <PFP
                            mr
                                href="/undefined"
                                src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/5eaf1d18-4f84-453b-62bd-d94c937ad600/original"
                                size={48}
                            />
                            {/* Main Content */}
                            <div className="relative w-full min-w-0">
                                <CastHeader 
                                    ago="42m" 
                                />
                                {/* Cast Content */}
                                <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
                                    <div className="line-clamp-feed">
                                        {castText ? (
                                            <span>castText</span>
                                        ): (
                                            <div className="min-h-32"></div>
                                        )}
                                    </div>
                                    {children && (
                                        <EmbedsContainer>
                                            {children} 
                                        </EmbedsContainer>
                                    )}
                                </div>
                                <BottomBar/>
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

export default CastPrview;
