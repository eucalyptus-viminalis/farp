import React from 'react';

type ReactionProps = {
    reaction: string
    isSelfDC?: boolean
}
const Reaction = (props: ReactionProps) => {
    const {reaction, isSelfDC} = props
    return (
        <div
            // type="button"
            id="radix-:rpc:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
        >
            {/* <div className="-mt-1 flex px-1 flex-row"> */}
            <div className={`
                -mt-1 flex px-1 
                ${isSelfDC ? 'flex-row-reverse' : 'flex-row'}
            `}
            >
                <div className="border-3 flex cursor-pointer flex-row rounded-full border px-2 text-sm backdrop-blur-0 bg-direct-cast border-app">
                    <div className="flex flex-col justify-center py-1 pb-[.3rem] pr-1">{reaction}</div>
                    <div className="flex flex-col justify-center pl-1 pt-[.10rem] text-xs font-semibold">1</div>
                </div>
            </div>
        </div>
    );
};

export default Reaction;
