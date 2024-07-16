'use client'

import { DCEditContext } from "@/contexts/DCEditContext";
import { useContext } from "react";
import TipButton from "./TipButton";
import Kebab from "./Kebab";

export default function TopNav() {
    const cx = useContext(DCEditContext)
    const {state} = cx

    return (
        <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
            {/* <div className="hidden sm:flex sm:px-4 h-14 flex-row items-center justify-between"> */}
            <div className="flex sm:flex px-4 sm:px-4 h-14 flex-row items-center justify-between">
                {/* <div className="w-full"> */}
                <div className="w-full">
                    <div className="flex w-full flex-row">
                        <div className="mr-1 flex cursor-pointer flex-col items-center justify-center rounded-full p-2 hover:bg-overlay-faint lg:hidden">
                            <SVG1 />
                        </div>
                        <div className="flex flex-col justify-center space-x-2">
                            {/* PFP */}
                            <span
                                className="relative inline-block h-min shrink-0"
                                title={state.usernameOverride + ' avatar'}
                            >
                                <div className="relative">
                                    <img
                                        loading="lazy"
                                        // src={pfpUrl}
                                        src={state.pfpOverride}
                                        className="aspect-square shrink-0 rounded-full border object-cover bg-app border-default"
                                        alt={state.usernameOverride + " avatar"}
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            minWidth: "36px",
                                            minHeight: "36px",
                                        }}
                                    />
                                </div>
                            </span>
                        </div>
                        {/* DisplayName + UserName Col */}
                        <div className="flex grow flex-col justify-around pl-2">
                            <span
                                className="relative h-min w-auto"
                                data-state="closed"
                            >
                                <span
                                    className="items-left flex flex-col justify-center"
                                    title=""
                                >
                                    {/* Display Name + Badge */}
                                    <div className="flex min-w-0 flex-row items-center">
                                        <span className="!block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap break-words text-default sm:hover:underline text-base font-semibold">
                                            {state.displayNameOverride}
                                        </span>
                                        <div className="ml-1 flex flex-row items-center space-x-1">
                                            <div className="relative cursor-pointer rounded-full hover:bg-overlay-faint">
                                                <div className="flex flex-shrink-0 items-center justify-center rounded-full text-active-badge h-[14px] w-[14px]">
                                                    <img
                                                        loading="lazy"
                                                        src="/ActiveBadge.png"
                                                        alt="Active Badge"
                                                        className="object-contain"
                                                        style={{
                                                            width: "12px",
                                                            height: "12px",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Username */}
                                    <div className="text-xs text-faint">
                                        @{state.usernameOverride}
                                    </div>
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col justify-around">
                            <div className="right flex flex-col">
                                <div className="flex flex-row space-x-4">
                                {/* <div className="flex flex-row space-x-4 pr-2 sm:pr-0"> */}
                                    <TipButton/>
                                    <Kebab/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function SVG1() {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            className="octicon octicon-arrow-left"
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
            <path d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"></path>
        </svg>
    );
}
