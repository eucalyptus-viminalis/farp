import {ResetIcon} from '@radix-ui/react-icons'
export default function ResetBtn() {
    return (
        <button
            type="button"
            id="radix-:r85:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            className="cursor-default"
        >
            {/* <div className="relative flex h-8 w-8 flex-col items-center justify-center rounded-full text-muted hover:text-action-purple hover:bg-overlay-faint"> */}
            <div 
                className={`
                    relative 
                    flex flex-row items-center justify-center gap-1
                    h-8
                    rounded-full 
                    text-[var(--yellow-9)]
                    hover:text-action-purple 
                    hover:bg-overlay-faint
                `}
            >
                {/* <svg
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
                        verticalAlign: "text-bottom",
                        overflow: "visible",
                    }}
                >
                    <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                </svg> */}
                <ResetIcon/>
                Reset
            </div>
        </button>
    );
}
