export default function TopNav() {
    const pfpUrl =
        "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/8614dfae-0aa3-48ee-ef1b-6c5dc59db800/w=72,h=72,fit=cover,anim=false";
    const username = "deployer";
    const displayname = "Deployer";
    return (
        <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
            {/* <div className="hidden sm:flex sm:px-4 h-14 flex-row items-center justify-between"> */}
            <div className="sm:flex sm:px-4 h-14 flex-row items-center justify-between">
                <div className="w-full">
                    <div className="flex w-full flex-row">
                        <div className="mr-1 flex cursor-pointer flex-col items-center justify-center rounded-full p-2 hover:bg-overlay-faint lg:hidden">
                            <SVG1 />
                        </div>
                        <div className="flex flex-col justify-center space-x-2">
                            {/* PFP */}
                            <span
                                className="relative inline-block h-min shrink-0"
                                title={displayname}
                            >
                                <div className="relative">
                                    <img
                                        loading="lazy"
                                        src={pfpUrl}
                                        className="aspect-square shrink-0 rounded-full border object-cover bg-app border-default"
                                        alt={username + " avatar"}
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
                        <div className="flex grow flex-col justify-around pl-2">
                            <span
                                className="relative h-min w-auto"
                                data-state="closed"
                            >
                                <span
                                    className="items-left flex flex-col justify-center"
                                    title=""
                                >
                                    <div className="flex min-w-0 flex-row items-center">
                                        <span className="!block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap break-words text-default hover:underline text-base font-semibold">
                                            {displayname}
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
                                    <div className="text-xs text-faint">
                                        @{username}
                                    </div>
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col justify-around">
                            <div className="right flex flex-col">
                                <div className="flex flex-row space-x-4">
                                    <div className="relative flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full text-muted hover:text-action-purple hover:bg-overlay-faint">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                d="M8.953 17.474a8.151 8.151 0 01-3.27-.664 8.668 8.668 0 01-2.699-1.835 8.668 8.668 0 01-1.834-2.698 8.15 8.15 0 01-.664-3.27c0-1.157.221-2.244.664-3.262a8.712 8.712 0 011.826-2.706 8.669 8.669 0 012.698-1.835A8.151 8.151 0 018.944.54a8.15 8.15 0 013.27.664 8.641 8.641 0 012.707 1.835 8.64 8.64 0 011.834 2.706 8.092 8.092 0 01.664 3.262 8.15 8.15 0 01-.664 3.27 8.668 8.668 0 01-1.834 2.698 8.64 8.64 0 01-2.706 1.835 8.092 8.092 0 01-3.262.664zm0-1.412a6.9 6.9 0 002.747-.547 7.183 7.183 0 002.25-1.511 6.999 6.999 0 001.51-2.25 6.9 6.9 0 00.548-2.747 6.9 6.9 0 00-.548-2.748 7.111 7.111 0 00-1.519-2.25 6.88 6.88 0 00-2.25-1.51 6.9 6.9 0 00-2.747-.548 6.9 6.9 0 00-2.747.548c-.852.36-1.6.863-2.241 1.51a7.182 7.182 0 00-1.511 2.25 6.992 6.992 0 00-.54 2.748c0 .98.18 1.895.54 2.747a7.183 7.183 0 001.51 2.25 7.182 7.182 0 002.25 1.51 6.9 6.9 0 002.748.549zm-.009-2.315a.4.4 0 01-.282-.108.382.382 0 01-.108-.283v-.597a3.094 3.094 0 01-1.469-.515 1.931 1.931 0 01-.805-1.162 3.973 3.973 0 00-.033-.125 1.07 1.07 0 01-.009-.132.471.471 0 01.482-.49c.121 0 .224.036.307.108a.643.643 0 01.207.307c.067.277.208.512.424.706.221.193.52.318.896.373V9.372l-.058-.017c-.692-.16-1.215-.404-1.569-.73-.354-.326-.531-.753-.531-1.278 0-.565.202-1.03.606-1.395.404-.37.921-.592 1.552-.664v-.573c0-.26.13-.39.39-.39.111 0 .202.036.274.108a.367.367 0 01.116.282v.573c.532.061.991.238 1.378.531.393.288.645.656.756 1.104.01.045.02.089.025.133.01.039.016.08.016.125a.484.484 0 01-.14.357.472.472 0 01-.35.132c-.243 0-.412-.135-.506-.406a1.365 1.365 0 00-.431-.673 1.513 1.513 0 00-.748-.348v2.316l.117.025c.72.127 1.261.362 1.627.705.365.343.548.797.548 1.361 0 .626-.222 1.121-.665 1.486-.437.36-.98.573-1.627.64v.58c0 .117-.038.21-.116.283a.371.371 0 01-.274.108zm-.39-5.396V6.243c-.354.06-.633.188-.838.382a.911.911 0 00-.299.672c0 .243.086.45.257.622.177.166.451.305.822.415l.058.017zm.78 1.22v2.258c.427-.05.742-.174.947-.373.21-.205.315-.454.315-.747a.952.952 0 00-.24-.665c-.161-.177-.44-.32-.839-.431l-.183-.042z"
                                                className="fill-current"
                                            ></path>
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        id="radix-:r85:"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        data-state="closed"
                                    >
                                        <div className="relative flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full text-muted hover:text-action-purple hover:bg-overlay-faint">
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
                                                    verticalAlign:
                                                        "text-bottom",
                                                    overflow: "visible",
                                                }}
                                            >
                                                <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                                            </svg>
                                        </div>
                                    </button>
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
