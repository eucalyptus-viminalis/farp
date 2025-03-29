export default function DoubleCheckmarks() {
    return (
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
                    verticalAlign: "text-bottom",
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
                    verticalAlign: "text-bottom",
                    overflow: "visible",
                }}
            >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
            </svg>
        </div>
    );
}
