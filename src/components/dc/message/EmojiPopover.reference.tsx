import React from 'react';

const EmojiPopover = () => {
    return (
        <div
            data-radix-popper-content-wrapper=""
            style={{
                position: 'fixed',
                left: '0px',
                top: '0px',
                transform: 'translate(164.5px, 798.5px)',
                minWidth: 'max-content',
                willChange: 'transform',
                zIndex: 'auto',
                // '--radix-popper-available-width': '1004px',
                // '--radix-popper-available-height': '210.708px',
                // '--radix-popper-anchor-width': '16px',
                // '--radix-popper-anchor-height': '21.333px',
                // '--radix-popper-transform-origin': '50% 0px',
            }}
        >
            <div
                data-side="bottom"
                data-align="center"
                data-state="open"
                role="dialog"
                id="radix-:rk1:"
                tabIndex={-1}
                style={{
                    outline: 'currentcolor',
                    // '--radix-popover-content-transform-origin': 'var(--radix-popper-transform-origin)',
                    // '--radix-popover-content-available-width': 'var(--radix-popper-available-width)',
                    // '--radix-popover-content-available-height': 'var(--radix-popper-available-height)',
                    // '--radix-popover-trigger-width': 'var(--radix-popper-anchor-width)',
                    // '--radix-popover-trigger-height': 'var(--radix-popper-anchor-height)',
                }}
            >
                <div className="z-[1000] inline-block rounded-full p-1 bg-app border-default shadow-[0_20px_60px_15px_rgba(0,0,0,.08)] dark:shadow-[0_20px_60px_15px_rgba(255,255,255,.08)] ml-6">
                    <div className="z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium">❤️</div>
                    <div className="z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium">👍</div>
                    <div className="z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium">➕</div>
                    <div className="z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium">😂</div>
                    <div className="z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium">😮</div>
                    <div className="inline-block w-9 items-center justify-start rounded-full p-1 text-center align-middle text-xl text-muted hover:cursor-pointer hover:bg-overlay-medium" 
                        // type="button" 
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rke:" data-state="closed">+</div>
                </div>
            </div>
        </div>
    );
};

export default EmojiPopover;
