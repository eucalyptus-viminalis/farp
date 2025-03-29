import { inter } from "@/fonts/fonts";

export default function ReplyExample() {
    return (
        <div
            data-index="0"
            className="absolute top-0 w-full"
            style={{ transform: "translateY(16px) scaleY(-1)" }}
        >
            <div className="mr-[2px] flex flex-col">
                <div className="group flex max-w-[80%] flex-row self-start mb-0">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <div className="flex flex-row rounded-lg p-2 bg-direct-cast text-default">
                                    <pre
                                        className={
                                            inter.className +
                                            " relative grow justify-stretch place-self-start whitespace-pre-wrap text-[.95rem] leading-[1.3rem] break-gracefully"
                                        }
                                    >
                                        <div className="mb-2 flex w-full min-w-0 flex-row rounded-md cursor-pointer">
                                            <div className="w-2 rounded-l-md bg-self-direct-cast"></div>
                                            <div className="flex min-w-0 grow flex-col justify-between p-2 bg-reply-direct-cast rounded-r-md">
                                                <div className="flex flex-row justify-between text-xs font-semibold text-white">
                                                    <div className="opacity-75">
                                                        You
                                                    </div>
                                                </div>
                                                <div className="w-[24rem] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap break-words text-white">
                                                    will b quite busy next
                                                    couple months
                                                </div>
                                            </div>
                                        </div>
                                        {"Oops :(\n\nBest of luck 🤞🏽"}
                                        <div className="mb-[2px] ml-2 inline-flex space-x-1 text-right opacity-0">
                                            <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 text-end">
                                                3:03 PM
                                            </div>
                                        </div>
                                        <div className="absolute bottom-[-4pt] right-[-2pt] mb-[2px] ml-2 inline-flex space-x-1 text-right">
                                            <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 text-end">
                                                3:03 PM
                                            </div>
                                        </div>
                                    </pre>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
