export default function ActionIcon() {
    return (
        <div 
            // className="
            //     group flex w-9 
            //     cursor-pointer 
            //     flex-row items-center justify-center text-sm text-faint
            // "
            className="
                group flex w-9 
                flex-row items-center justify-center text-sm text-faint
            "
        >
            <div 
                // className="
                //     group flex flex-row items-center justify-center rounded-full p-2 transition-colors 
                //     hover:bg-gray-200 
                //     group-hover:bg-gray-200
                //     dark:hover:bg-overlay-medium 
                //     dark:group-hover:bg-overlay-medium
                // "
                className="
                    group flex flex-row items-center justify-center rounded-full p-2 transition-colors 
                "
            >
                <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    className="octicon octicon-apps"
                    viewBox="0 0 16 16"
                    width="18"
                    height="18"
                    fill="currentColor"
                    style={{
                        display: 'inline-block',
                        verticalAlign: 'text-bottom',
                        overflow: 'visible'
                    }} 
                >
                    <path d="M1.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 0 1 5.75 7.5h-2.5A1.75 1.75 0 0 1 1.5 5.75Zm7 0c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 8.5 5.75Zm-7 7c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5a1.75 1.75 0 0 1-1.75-1.75Zm7 0c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5a1.75 1.75 0 0 1-1.75-1.75ZM3.25 3a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5A.25.25 0 0 0 6 5.75v-2.5A.25.25 0 0 0 5.75 3Zm7 0a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm-7 7a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm7 0a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
            </div>
        </div>
    );
}
