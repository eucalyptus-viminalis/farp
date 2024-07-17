import { MessageEditContext } from '@/contexts/MessageEditContext';
import React, { useContext } from 'react';

type EmojiPopoverProps = {
    show: boolean
    hidePopover: () => void
}
const EMOJI_DEFAULTS = ['❤️', '👍', '😂','😮']
const EmojiPopover = (props: EmojiPopoverProps) => {
    const {show,hidePopover} = props
    return (
        <div
            hidden={!show}
            data-radix-popper-content-wrapper=""
            onMouseLeave={hidePopover}
            className={`
                absolute 
                -translate-x-1/2
                -translate-y-full
                `}
            style={{
                // left: '0px',
                // top: '0px',
                // transform: 'translate(164.5px, 798.5px)',
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
                    {EMOJI_DEFAULTS.map((emoji, i) => (
                        <EmojiButton
                            key={i} 
                            emoji={emoji}
                            hidePopover={hidePopover}
                        />
                    ))}
                    <div className="inline-block w-9 items-center justify-start rounded-full p-1 text-center align-middle text-xl text-muted hover:cursor-pointer hover:bg-overlay-medium" 
                        // type="button" 
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rke:" data-state="closed">+</div>
                </div>
            </div>
        </div>
    );
};

type EmojiButtonProps = {
    emoji: string
    hidePopover: () => void
}
function EmojiButton(props: EmojiButtonProps) {
    // Props
    const {emoji,hidePopover} = props
    // Context
    const cx = useContext(MessageEditContext)
    const {updateMsg, msg, msgIndex} = cx
    // Handler
    const handleClick = () => {
        updateMsg({
            ...msg,
            reaction: emoji
        }, msgIndex)
        hidePopover()
    }
    return (
        <div 
            // className="z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium">
            className={`
                z-[1001] inline-block items-center justify-start rounded-full p-2 align-middle text-sm text-muted hover:cursor-pointer hover:bg-overlay-medium
            `}
            onClick={handleClick}
        >
            {emoji}
        </div>
    )
}

export default EmojiPopover;
