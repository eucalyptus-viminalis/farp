export default function SendButton() {
    return (
        <button className="rounded-lg font-semibold border border-transparent bg-action-primary text-light active:border-action-primary-active disabled:bg-action-primary-disabled disabled:text-action-primary-disabled disabled:active:border-transparent px-[0.9333rem] py-[0.4333rem] text-sm !mb-[1px] flex h-[40px] w-[40px] min-w-[40px] items-center justify-center self-end !rounded-full !p-0 !text-action-purple bg-action disabled:!bg-overlay-medium">
            <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className="pl-[3px] text-light"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                fill="currentColor"
                style={{
                    display: "inline-block",
                    verticalAlign: "text-bottom",
                    overflow: "visible",
                }}
            >
                <path d="M1.513 1.96a1.374 1.374 0 0 1 1.499-.21l19.335 9.215a1.147 1.147 0 0 1 0 2.07L3.012 22.25a1.374 1.374 0 0 1-1.947-1.46L2.49 12 1.065 3.21a1.375 1.375 0 0 1 .448-1.25Zm2.375 10.79-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 0 1 0 1.5Z"></path>
            </svg>
        </button>
    );
}
