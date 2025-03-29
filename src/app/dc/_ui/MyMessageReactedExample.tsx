import { inter } from "@/fonts/fonts";
import React from "react";
import DoubleCheckmarks from "./read-status/DoubleCheckmarks";

const MyMessageReactedExample = () => {
    return (
        <div
            data-index="2"
            className="absolute top-0 w-full"
            style={{ transform: "translateY(188px) scaleY(-1)" }}
        >
            <div className="mr-[2px] flex flex-col">
                <div className="group flex max-w-[80%] flex-row-reverse self-end mb-1">
                    <div className="flex flex-col">
                        <div className="flex flex-row-reverse">
                            <div className="flex flex-col">
                                <div className="flex flex-row rounded-lg p-2 bg-self-direct-cast text-light rounded-br">
                                    <pre
                                        className={
                                            inter.className +
                                            " relative grow justify-stretch place-self-start whitespace-pre-wrap text-[.95rem] leading-[1.3rem] break-gracefully"
                                        }
                                    >
                                        hey i’ll check it out but dont think l
                                        i’ll hav time to participate : /
                                        <div className="mb-[2px] ml-2 inline-flex space-x-1 text-right opacity-0">
                                            <div className="mr-2 min-w-[50px] text-xs text-light w-max !min-w-0 text-end">
                                                12:01 PM
                                            </div>
                                            <div className="flex w-5 flex-row items-center">
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="img"
                                                    className="text-direct-casts-checkmark -mr-[6.5px]"
                                                    viewBox="0 0 16 16"
                                                    width="12"
                                                    height="12"
                                                    fill="currentColor"
                                                    style={{
                                                        display: "inline-block",
                                                        verticalAlign:
                                                            "text-bottom",
                                                        overflow: "visible",
                                                    }}
                                                >
                                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
                                                </svg>
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="img"
                                                    className="rounded-full bg-self-direct-cast text-direct-casts-checkmark"
                                                    viewBox="0 0 16 16"
                                                    width="12"
                                                    height="12"
                                                    fill="currentColor"
                                                    style={{
                                                        display: "inline-block",
                                                        verticalAlign:
                                                            "text-bottom",
                                                        overflow: "visible",
                                                    }}
                                                >
                                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-[-4pt] right-[-2pt] mb-[2px] ml-2 inline-flex space-x-1 text-right">
                                            <div className="mr-2 min-w-[50px] text-xs text-light w-max !min-w-0 text-end">
                                                12:01 PM
                                            </div>
                                            <DoubleCheckmarks/>
                                        </div>
                                    </pre>
                                    <div className="-mt-1 flex px-1 flex-row-reverse">
                                        <div className="border-3 flex cursor-pointer flex-row rounded-full border px-2 text-sm backdrop-blur-0 bg-direct-cast border-app">
                                            <div className="flex flex-col justify-center py-1 pb-[.3rem] pr-1">
                                                👍
                                            </div>
                                            <div className="flex flex-col justify-center pl-1 pt-[.10rem] text-xs font-semibold">
                                                1
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 opacity-0 transition-all group-hover:opacity-100 mr-2 flex-row-reverse space-x-reverse mb-8">
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
                                                    verticalAlign:
                                                        "text-bottom",
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
                                                    verticalAlign:
                                                        "text-bottom",
                                                    overflow: "visible",
                                                }}
                                            >
                                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex"
                                    aria-haspopup="dialog"
                                    aria-expanded="false"
                                    aria-controls="radix-:rn2:"
                                    data-state="closed"
                                >
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        role="img"
                                        className="mt-0.5 cursor-pointer text-muted hover:text-muted-light"
                                        viewBox="0 0 16 16"
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        style={{
                                            display: "inline-block",
                                            verticalAlign: "text-bottom",
                                            overflow: "visible",
                                        }}
                                    >
                                        <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyMessageReactedExample;
