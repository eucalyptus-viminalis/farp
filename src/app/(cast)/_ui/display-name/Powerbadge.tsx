export default function Powerbadge() {
    return (
        <span className="relative h-min w-auto" data-state="closed">
            <a href="/undefined" title="" className="relative min-w-0">
                <div className="flex min-w-0 flex-row items-center">
                    <span className="!block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap break-words text-default hover:underline text-base font-semibold">
                        {" "}
                    </span>
                    <div className="ml-1 flex flex-row items-center space-x-1">
                        <div className="flex flex-shrink-0 items-center justify-center rounded-full text-active-badge h-[14px] w-[14px]">
                            <img
                                loading="lazy"
                                src="/ActiveBadge.png"
                                alt="Active Badge"
                                className="object-contain"
                                style={{ width: "12px", height: "12px" }}
                            />
                        </div>
                    </div>
                </div>
            </a>
        </span>
    );
}
