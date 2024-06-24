"use client";
import { ActionRow } from "@/components/cast/BottomBar";
import DisplayNameConvo from "@/components/cast/display-name/DisplayNameConvo.preview";
import StatsRow from "@/components/cast/stats/StatsRow.preview";
import { CastPreviewContext } from "@/contexts/CastPreviewContext";
import React, { useContext } from "react";
import ReplyCard from "./ReplyCard";
import EmbedsContainerPreview from "@/components/cast/embeds/EmbedsContainerPreview";

const ConvoRootCast = () => {
    const con = useContext(CastPreviewContext);
    const cast = con.cast;
    const { pfpOverride } = cast;
    return (
        <div>
            <div className="relative">
                <div className="relative p-4 pt-2">
                    {/* <div
            className="absolute top-0 w-[1px] border-l-2 border-faint border-none"
            style={{ left: '38px', height: '28px' }}
          ></div>
          <div
            className="absolute bottom-0 w-[1px] border-l-2 border-faint border-none"
            style={{ left: '38px', top: '28px' }}
          ></div> */}
                    <div className="flex w-full items-center">
                        <div className="flex w-full min-w-0 pb-2">
                            <span
                                className="relative h-min w-auto"
                                data-state="closed"
                            >
                                <div className="relative">
                                    <img
                                        loading="lazy"
                                        src={pfpOverride}
                                        className="aspect-square shrink-0 rounded-full border object-cover bg-app border-default"
                                        // alt="c-node avatar"
                                        alt={cast.usernameOverride + " avatar"}
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            minWidth: "48px",
                                            minHeight: "48px",
                                        }}
                                    />
                                    <div className="absolute bottom-0 right-0 mb-[-4px] mr-[-4px] flex h-[20px] w-[20px] items-center justify-center rounded-full border-[2px] bg-[#E2D8F4] border-app hover:bg-[#c1a9df]">
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            role="img"
                                            className="text-[#8A63D2]"
                                            viewBox="0 0 16 16"
                                            width="12.5"
                                            height="12.5"
                                            fill="currentColor"
                                            style={{
                                                display: "inline-block",
                                                verticalAlign: "top",
                                                overflow: "visible",
                                            }}
                                        >
                                            <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </span>
                            <div className="pl-3">
                                <DisplayNameConvo />
                                {/* <span className="flex flex-row items-center space-x-1">
                  <span className="relative h-min w-auto" data-state="closed">
                      <div className="flex min-w-0 flex-row items-center">
                        <span className="!block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap break-words text-default hover:underline text-base font-semibold">
                          {cast.displayNameOverride}
                        </span>
                      </div>
                  </span>
                </span> */}
                                <div className="flex gap-1">
                                    <span
                                        className="relative h-min w-auto"
                                        data-state="closed"
                                    >
                                        <span
                                            className="text-base text-muted hover:underline"
                                        >
                                            @{cast.usernameOverride}
                                        </span>
                                    </span>
                                    <div className="text-base text-muted">
                                        ·
                                    </div>
                                    <div className="text-base text-muted hover:underline">
                                        {cast.ago}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative cursor-pointer rounded-full px-1 text-muted hover:bg-gray-200">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                role="img"
                                className="octicon octicon-kebab-horizontal"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                style={{
                                    display: "inline-block",
                                    verticalAlign: "text-bottom",
                                    overflow: "visible",
                                }}
                            >
                                <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col whitespace-pre-wrap break-words text-lg leading-6 tracking-normal">
                        {cast.castText}
                        {cast.imageEmbeds.length > 0 && (
                            <EmbedsContainerPreview imgUrls={cast.imageEmbeds}/>
                        )}
                        {/* <div>
              I like
              <span className="relative w-full" data-state="closed">
                <a href="/~/channel/daimo" title="Daimo" className="relative hover:underline">
                  /daimo
                </a>
              </span>
              , but I can't use it until it has privacy. Currently, it's too dangerous. Using @Payy until that is fixed in
              <span className="relative w-full" data-state="closed">
                <a href="/~/channel/daimo" title="Daimo" className="relative hover:underline">
                  /daimo
                </a>
              </span>
              .
            </div> */}
                    </div>
                </div>
                <div className="px-4">
                    <ActionRow />
                </div>
                <StatsRow previewMode="expanded-web" />
                <ReplyCard />
            </div>
        </div>
    );
};

export default ConvoRootCast;
