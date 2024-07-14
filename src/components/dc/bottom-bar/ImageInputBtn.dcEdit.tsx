export default function ImageInputBtn() {
    return (
        <button
            className="rounded-lg font-semibold border border-transparent bg-action-primary text-light active:border-action-primary-active disabled:bg-action-primary-disabled disabled:text-action-primary-disabled disabled:active:border-transparent px-[0.9333rem] py-[0.4333rem] text-sm !mb-[1px] flex h-[40px] w-[40px] min-w-[40px] items-center justify-center self-end !rounded-full !bg-transparent !p-0 hover:!bg-overlay-faint disabled:hover:!bg-transparent"
            type="button"
        >
            <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className="text-action-purple"
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
                <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
            </svg>
        </button>
    );
}
