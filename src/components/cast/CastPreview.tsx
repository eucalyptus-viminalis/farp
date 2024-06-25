"use client";

import { ReactNode } from "react";
import PFPPreview from "./pfp/PFPPreview";
import { CastType } from "@/types/types";
import { CastState } from "@/types/types";
import { PreviewMode } from "@/types/types";
import EmbedsContainerPreview from "./embeds/EmbedsContainerPreview";
import CastHeaderPreview from "@/components/cast/CastHeaderPreview";
import BottomBarPreview from "@/components/cast/BottomBarPreview";
import { CastPreviewContext } from "@/contexts/CastPreviewContext";
import DisplayNameConvo from "./display-name/DisplayNameConvo.preview";
import UsernamePreview from "./username/UsernamePreview";
import AgoPreview from "./ago/AgoPreview";
import CastText from "./cast-text/CastText";

type CastProps = {
    children?: ReactNode;
    cast: CastState;
    previewMode: PreviewMode;
    castType: CastType;
    lastToDisplay?: boolean;
    lastIndex?: boolean;
    showingNested?:boolean
};

// Assuming root cast
export function CastPreview(props: CastProps) {
    // Props
    const { cast, previewMode, castType, lastToDisplay, lastIndex } = props;
    return (
        <CastPreviewContext.Provider value={{ cast, castType, previewMode }}>
            <div className="bg-app">
                <div className="relative">
                    <div
                        className={`relative px-4 py-2 hover:bg-overlay-faint ${
                            castType === "nested-reply"
                                ? "pl-14"
                                : "border-t border-faint"
                        }`}
                    >
                        {previewMode === "expanded-web" &&
                            castType === "nested-reply" && (
                                <div
                                    className="absolute border-faint h-[47.5px] w-12 rounded-lg border-b-2 border-l-2 border-solid !border-l-transparent"
                                    style={{
                                        left: 36,
                                        top: -29,
                                    }}
                                ></div>
                            )}
                        {previewMode === "expanded-web" &&
                            (castType === "reply" && props.showingNested ||
                                castType === "nested-reply") && (
                                <>
                                    <div
                                        className="absolute top-0 w-[1px] border-l-2 border-faint border-solid"
                                        style={{
                                            left: 38,
                                            height: 28,
                                        }}
                                    ></div>
                                    {!lastIndex && (
                                        <div
                                            className="absolute bottom-0 w-[1px] border-l-2 border-faint border-solid"
                                            style={{
                                                left: 38,
                                                top: 28,
                                            }}
                                        ></div>
                                    )}
                                </>
                            )}
                        <div className="relative flex flex-col">
                            <div className="relative flex">
                                {/* PFP */}
                                <PFPPreview />
                                {/* Main Content */}
                                {previewMode === "expanded-web" &&
                                    castType === "root-cast" && (
                                        <div className="pl-3">
                                            <DisplayNameConvo />
                                            <div className="flex gap-1">
                                                {/* <span
                                                    className="relative h-min w-auto"
                                                    data-state="closed"
                                                >
                                                    <a
                                                        href="/colludingnode"
                                                        title=""
                                                        className="text-base text-muted hover:underline"
                                                    >
                                                        @colludingnode
                                                    </a>
                                                </span> */}
                                                <UsernamePreview username={cast.usernameOverride}/>
                                                <div className="text-base text-muted">
                                                    ·
                                                </div>
                                                <AgoPreview ago={cast.ago}/>
                                            </div>
                                        </div>
                                    )}
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
                                            {/* {cast.castText} */}
                                            <CastText castText={cast.castText}/>
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
                    {lastToDisplay && !lastIndex && (
                        <div className="relative flex cursor-pointer flex-row items-center py-1 pl-[70px] hover:bg-overlay-faint">
                            <div
                                className="absolute top-0 w-[1px] border-l-2 border-faint border-dotted"
                                style={{
                                    left: 38,
                                    height: 28,
                                }}
                            ></div>
                            <div
                                className="absolute bottom-0 w-[1px] border-l-2 border-faint border-none"
                                style={{
                                    left: 38,
                                    height: 28,
                                }}
                            ></div>
                            <div className="relative mr-1 cursor-pointer text-xs text-link hover:underline">
                                Show more
                            </div>
                            <div className="relative flex flex-row items-center pt-1"></div>
                        </div>
                    )}
                </div>
            </div>
        </CastPreviewContext.Provider>
    );
}
