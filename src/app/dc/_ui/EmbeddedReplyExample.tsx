import { inter } from "@/fonts/fonts";
import React from "react";

const EmbeddedReplyExample = () => {
    return (
        <div
            data-index="3"
            className="absolute top-0 w-full"
            style={{ transform: "translateY(270px) scaleY(-1)" }}
        >
            <div className="mr-[2px] flex flex-col">
                <div className="group flex max-w-[80%] flex-row self-start mb-3">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <div>
                                    <div className="relative my-1 flex grow cursor-pointer flex-col justify-stretch place-self-start">
                                        <div className="flex flex-col overflow-hidden rounded-lg border bg-overlay-faint border-default w-[286px]">
                                            <img
                                                loading="lazy"
                                                src="https://proxy.wrpcd.net/?url=https%3A%2F%2Fethglobal.com%2Fog.png&amp;s=9468bcd82d4bbd4b4a13c7d6c9f813401124a8dd335b0a276d7c72303067eea4"
                                                alt="Farcaster frame image"
                                                className="h-[150px] object-cover bg-overlay-light"
                                            />
                                            <div className="flex flex-row items-center p-2 text-xs bg-faint text-muted">
                                                <div className="flex flex-row items-center overflow-hidden">
                                                    <svg
                                                        viewBox="0 0 13 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="mr-1 size-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M0 2.35886C0 1.78431 0.465768 1.31854 1.04032 1.31854H11.4435C12.0181 1.31854 12.4839 1.78431 12.4839 2.35887V10.6814C12.4839 11.256 12.0181 11.7218 11.4435 11.7218H1.04032C0.46577 11.7218 0 11.256 0 10.6814V2.35886ZM0.960745 2.78444C0.960745 2.49716 1.19363 2.26428 1.48091 2.26428H11.0039C11.2911 2.26428 11.524 2.49716 11.524 2.78444V8.36435C11.524 8.65163 11.2911 8.88451 11.0039 8.88451H1.48091C1.19363 8.88451 0.960745 8.65163 0.960745 8.36435V2.78444ZM1.44089 9.8303C1.17571 9.8303 0.960745 10.042 0.960745 10.3032C0.960745 10.5643 1.17571 10.776 1.44089 10.776H2.40119C2.66637 10.776 2.88134 10.5643 2.88134 10.3032C2.88134 10.042 2.66637 9.8303 2.40119 9.8303H1.44089ZM4.32179 9.8303C4.05661 9.8303 3.84164 10.042 3.84164 10.3032C3.84164 10.5643 4.05661 10.776 4.32179 10.776H5.28208C5.54726 10.776 5.76223 10.5643 5.76223 10.3032C5.76223 10.042 5.54726 9.8303 5.28208 9.8303H4.32179ZM6.72253 10.3032C6.72253 10.042 6.9375 9.8303 7.20268 9.8303H8.16298C8.42816 9.8303 8.64313 10.042 8.64313 10.3032C8.64313 10.5643 8.42816 10.776 8.16298 10.776H7.20268C6.9375 10.776 6.72253 10.5643 6.72253 10.3032ZM10.0836 9.8303C9.81839 9.8303 9.60342 10.042 9.60342 10.3032C9.60342 10.5643 9.81839 10.776 10.0836 10.776H11.0439C11.309 10.776 11.524 10.5643 11.524 10.3032C11.524 10.042 11.309 9.8303 11.0439 9.8303H10.0836Z"
                                                            fill="#8B99A4"
                                                        />
                                                    </svg>
                                                    <div className="truncate">
                                                        <a
                                                            className="text-muted hover:underline"
                                                            title="Farcaster Frame"
                                                            href="https://ethglobal.com/events/superhack2024#partners"
                                                            target="_blank"
                                                        >
                                                            ethglobal.com
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="ml-2 flex grow flex-row">
                                                    <div className="flex grow"></div>
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-highlight-gray text-default">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="size-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row rounded-lg p-2 bg-direct-cast text-default">
                                                <pre
                                                    className={
                                                        inter.className +
                                                        " relative grow justify-stretch place-self-start whitespace-pre-wrap text-[.95rem] leading-[1.3rem] break-gracefully"
                                                    }
                                                >
                                                    Hey, I found this upcoming
                                                    superchain hack.
                                                    <a
                                                        className="relative inline cursor-pointer text-link hover:underline underline"
                                                        title="https://ethglobal.com/events/superhack2024#partners"
                                                        href="https://ethglobal.com/events/superhack2024#partners"
                                                        target="_blank"
                                                    >
                                                        ethglobal.com/events/super...
                                                    </a>
                                                    Do you think we can team up
                                                    to hack? Still exploring
                                                    ideas of what we can build.
                                                    Will hit you up once I come
                                                    up with something concrete.
                                                    <div className="mb-[2px] ml-2 inline-flex space-x-1 text-right opacity-0">
                                                        <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 text-end">
                                                            1d
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-[-4pt] right-[-2pt] mb-[2px] ml-2 inline-flex space-x-1 text-right">
                                                        <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 text-end">
                                                            1d
                                                        </div>
                                                    </div>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 opacity-0 transition-all group-hover:opacity-100 ml-2 flex-row">
                    <div className="flex flex-col text-muted hover:text-muted-light">
                        <div className="flex shrink-0 flex-row gap-2">
                            <div>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="img"
                                    className="cursor-pointer"
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
                                    <path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
                                </svg>
                            </div>
                            <div>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="img"
                                    className="cursor-pointer"
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
                                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbeddedReplyExample;
