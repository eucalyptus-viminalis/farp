import React from "react";
import PFP from "./PFP";

import ChannelLinkInCastText from "./ChannelLinkInCastText";
import CastHeader from "../components/CastHeader";
import BottomBar from "../components/cast/BottomBar";

function QuoteCast() {
    return (
        <div className="">
            <div className="relative">
                <div className="relative cursor-pointer px-4 py-2 hover:bg-overlay-faint border-t border-faint">
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
                                        <ChannelLinkInCastText />
                                        {" forever"}
                                    </div>
                                    <div className="mt-2 inline-flex flex-col justify-center space-y-1">
                                        <span>
                                            <div className="relative flex w-full flex-col pt-2 rounded-lg border border-faint">
                                                <a
                                                    href="/pauline-unik/0x941c47b6"
                                                    title=""
                                                    className="absolute inset-0"
                                                ></a>
                                                <div className="flex flex-row items-center space-x-1 px-3">
                                                    <PFP 
                                                        src="https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,w=60/https%3A%2F%2Fi.imgur.com%2FUrc2CHT.gif" 
                                                        href="/pauline-unik"
                                                        size={20}
                                                    />
                                                    <CastHeader 
                                                        ago="3h" 
                                                        asEmbed
                                                    />
                                                </div>
                                                <div className="line-clamp-feed mt-2 px-3 text-base leading-5 tracking-normal break-gracefully text-default">
                                                    <div className="line-clamp-feed">
                                                        Had an absolute blast
                                                        chatting with
                                                        @tako-unik, @beachcrypto
                                                        and @undefined for the
                                                        LF x ocs series. WHERE'S
                                                        YOUR RESTING BEACH
                                                        FACE?? 🌶️ 🏝️ 🌶️ 🏝️ 🌶️ 🏝️
                                                        🌶️ 🏝️
                                                    </div>
                                                </div>
                                                <div className="flex w-full flex-col mt-2 items-center overflow-hidden rounded-b-lg border-t border-default">
                                                    <div
                                                        className="flex w-full flex-col"
                                                        style={{
                                                            maxWidth: "281px",
                                                        }}
                                                    >
                                                        <div
                                                            className="w-full"
                                                            style={{
                                                                aspectRatio:
                                                                    "0.5625 / 1",
                                                                maxHeight:
                                                                    "500px",
                                                                maxWidth:
                                                                    "281px",
                                                            }}
                                                        >
                                                            <div
                                                                className="video-player max-h-[500px]"
                                                                style={{
                                                                    aspectRatio:
                                                                        "0.5625 / 1",
                                                                    //   '--player-width': '281px',
                                                                    //   '--player-height': '500px',
                                                                    //   '--media-width': '281px',
                                                                    //   '--media-height': '500px',
                                                                }}
                                                                data-media-player=""
                                                                tabIndex={0}
                                                                role="region"
                                                                aria-label="Video Player"
                                                                data-orientation="portrait"
                                                                aria-busy="false"
                                                                data-load="visible"
                                                                data-can-seek=""
                                                                data-loop=""
                                                                data-media-type="video"
                                                                data-muted=""
                                                                data-paused=""
                                                                data-playsinline=""
                                                                data-remote-state="disconnected"
                                                                data-stream-type="on-demand"
                                                                data-view-type="video"
                                                                data-layout="video"
                                                                data-pointer="fine"
                                                                data-can-fullscreen=""
                                                                data-can-pip=""
                                                                data-can-load=""
                                                                data-can-load-poster=""
                                                                data-can-play=""
                                                                data-controls=""
                                                                data-can-airplay=""
                                                            >
                                                                <div data-media-provider="">
                                                                    <video
                                                                        crossOrigin=""
                                                                        preload=""
                                                                        aria-hidden="true"
                                                                        disableRemotePlayback={
                                                                            false
                                                                        }
                                                                        playsInline={
                                                                            false
                                                                        }
                                                                    >
                                                                        <source
                                                                            type="video/mp4"
                                                                            src="blob:https://warpcast.com/f9260b19-aa68-44fc-9f6f-245b16e90015"
                                                                        />
                                                                    </video>
                                                                    <img
                                                                        className="vds-poster"
                                                                        src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/bdbe12ec-2cb0-43e5-6219-b47263de7f00/poster"
                                                                        alt="Poster"
                                                                        style={{
                                                                            objectFit:
                                                                                "cover",
                                                                            width: "281px",
                                                                            height: "500px",
                                                                            backgroundColor:
                                                                                "rgb(0, 0, 0)",
                                                                            opacity: 1,
                                                                            aspectRatio:
                                                                                "0.5625",
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className="vds-media vds-main-media"
                                                                        aria-hidden="false"
                                                                        style={{
                                                                            position:
                                                                                "absolute",
                                                                            top: "0px",
                                                                            left: "0px",
                                                                            width: "281px",
                                                                            height: "500px",
                                                                            transform:
                                                                                "none",
                                                                        }}
                                                                    >
                                                                        <div
                                                                            data-media-focus-target=""
                                                                            tabIndex={
                                                                                -1
                                                                            }
                                                                        ></div>
                                                                        <div
                                                                            className="vds-media-display vds-media"
                                                                            aria-hidden="false"
                                                                            style={{
                                                                                position:
                                                                                    "absolute",
                                                                                top: "0px",
                                                                                left: "0px",
                                                                                width: "281px",
                                                                                height: "500px",
                                                                                transform:
                                                                                    "none",
                                                                                backgroundColor:
                                                                                    "rgba(0, 0, 0, 0)",
                                                                            }}
                                                                        >
                                                                            <div
                                                                                data-media-play-button=""
                                                                                tabIndex={
                                                                                    0
                                                                                }
                                                                                role="button"
                                                                                aria-label="Play"
                                                                            >
                                                                                <div className="vds-playback-button vds-play-button">
                                                                                    <div className="vds-playback-icons">
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            viewBox="0 0 90 90"
                                                                                            className="vds-playback-icon vds-play-icon"
                                                                                            aria-hidden="true"
                                                                                        >
                                                                                            <path d="M60.2 45 34.5 29.2v31.6L60.2 45z"></path>
                                                                                        </svg>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="vds-error-display vds-media-display vds-hidden"
                                                                    aria-hidden="true"
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "0px",
                                                                        left: "0px",
                                                                        width: "281px",
                                                                        height: "500px",
                                                                        transform:
                                                                            "none",
                                                                        backgroundColor:
                                                                            "rgba(0, 0, 0, 0)",
                                                                    }}
                                                                >
                                                                    <div
                                                                        data-media-replay-button=""
                                                                        tabIndex={
                                                                            0
                                                                        }
                                                                        role="button"
                                                                        aria-label="Replay"
                                                                    >
                                                                        <div className="vds-playback-button vds-replay-button">
                                                                            <div className="vds-playback-icons">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 90 90"
                                                                                    className="vds-playback-icon vds-replay-icon"
                                                                                    aria-hidden="true"
                                                                                >
                                                                                    <path d="M60.2 45 34.5 29.2v31.6L60.2 45z"></path>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="h-0"
                                                            style={{
                                                                paddingTop:
                                                                    "177.7778%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
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

export default QuoteCast;
