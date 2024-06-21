type DisplayNameProps = {
    displayName: string;
    activeBadge?: boolean;
};

export default function DisplayNamePreview(props: DisplayNameProps) {
    const { displayName, activeBadge } = props;

    return (
        <span className="relative h-min w-auto" data-state="closed">
            <div className="relative min-w-0">
                <div className="flex min-w-0 flex-row items-center">
                    {/* Display Name */}
                    <span
                        title="Override display name"
                        className="
                                !block 
                                min-w-0 
                                overflow-hidden 
                                text-ellipsis text-default text-base
                                whitespace-nowrap 
                                break-words 
                                hover:underline 
                                font-semibold
                            "
                    >
                        {displayName}
                    </span>
                    {/* Active Badge */}
                    {activeBadge && (
                        <div className="ml-1 flex flex-row items-center space-x-1">
                            <div className="flex flex-shrink-0 items-center justify-center rounded-full text-active-badge h-[14px] w-[14px]">
                                <img
                                    loading="lazy"
                                    src="/ActiveBadge.png"
                                    alt="Active Badge"
                                    className="object-contain"
                                    width={12}
                                    height={12}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </span>
    );
}
