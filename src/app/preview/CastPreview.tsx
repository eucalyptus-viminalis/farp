"use client";
import React, { ReactNode } from "react";
import PFPPreview from "../../components/cast/pfp/PFPPreview";
import { CastState, PreviewMode } from "../edit/context";
import EmbedsContainerPreview from "../../components/cast/embeds/EmbedsContainerPreview";
import CastHeaderPreview from "@/components/cast/CastHeaderPreview";
import BottomBarPreview from "@/components/cast/BottomBarPreview";

type CastProps = {
    children?: ReactNode;
    cast: CastState
    previewMode: PreviewMode
};

type CastPreviewContextProps = {
    cast: CastState
}
export const CastPreviewContext = React.createContext<CastPreviewContextProps>({} as CastPreviewContextProps);

// Assuming root cast
export function CastPreview(props: CastProps) {
    // Props
    const { cast,previewMode } = props;
    // Assuming timeline-web preview mode
    return (
        <CastPreviewContext.Provider value={{cast}}>
            <div className="bg-app">
                <div className="relative">
                    <div className="relative px-4 py-2 hover:bg-overlay-faint border-t border-faint">
                        <div className="relative flex flex-col">
                            <div className="relative flex">
                                {/* PFP */}
                                <PFPPreview
                                    pfpDisplayType="rootCast"
                                    previewMode={previewMode}
                                    src={cast.pfpOverride}
                                />
                                {/* Main Content */}
                                <div className="relative w-full min-w-0">
                                    {/* Header row */}
                                    <CastHeaderPreview
                                        displayName={cast.displayNameOverride}
                                        username={cast.usernameOverride}
                                        activeBadge={cast.activeBadgeOverride}
                                        ago={cast.ago}
                                    />
                                    {/* Cast Content */}
                                    <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
                                        <div className="line-clamp-feed">
                                            {/* Style channel/mentions within castText */}
                                            {cast.castText}
                                        </div>
                                        {cast.imageEmbeds && (
                                            <EmbedsContainerPreview
                                                imgUrls={cast.imageEmbeds}
                                            />
                                        )}
                                    </div>
                                    {/* <BottomBar /> */}
                                    <BottomBarPreview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CastPreviewContext.Provider>
    );
}
