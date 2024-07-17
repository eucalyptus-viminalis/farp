'use client'

import { useContext } from "react";
import { MessageEditContext } from "@/contexts/MessageEditContext";
import HoverActions from "./HoverActions.messageEdit";
import CaptionWithTimestamp from "./CaptionWithTimestamp.messageEdit";
import ImageEmbed from "./ImageEmbed.messageEdit";
import Reaction from "./Reaction";

type MessageProps = {
    bigGap?: boolean
    translate?: number;
    isReply?: boolean;
};
export default function Message(props: MessageProps) {
    const { translate, isReply, bigGap } =
        props;
    const cx = useContext(MessageEditContext)
    const {deleteMsg,msg,updateMsg,msgIndex} = cx
    const {isSelfDC} = msg
    return (
        <div
            data-index={msgIndex}
            className={`
                    w-full
                    ${translate && 'absolute top-0'} 
                    ${!translate && ''}
                `}
            style={{
                transform: translate ? `translateY(${translate}px) scaleY(-1)` : 'scaleY(-1)',
            }}
        >
            <div className="mr-[2px] flex flex-col">
                <div
                    className={`
                        group flex max-w-[80%]     
                        ${!isSelfDC && "flex-row self-start"}
                        ${isSelfDC && "flex-row-reverse self-end"}
                        ${bigGap ? 'mb-3' : 'mb-1'}
                `}
                >
                    <div className="flex flex-col">
                        <div
                            className={`
                                flex 
                                ${!isSelfDC && "flex-row"}
                                ${isSelfDC && "flex-row-reverse"}
                            `}
                        >
                            <div className="flex flex-col">
                                {/* <div className="flex flex-row rounded-lg p-2 bg-direct-cast text-default"> */}
                                {msg.imgSrc && (
                                    // <ImageEmbed
                                    //     imgSrc={msg.imgSrc} 
                                    //     timeDisplay={msg.timeDisplay}
                                    //     hasCaption={msg.txt && msg.txt.trim().length !== 0 ? true : false}
                                    // />
                                    <ImageEmbed/>
                                )}
                                {msg.txt && (
                                    <CaptionWithTimestamp/>
                                )}
                                {/* Reactions */}
                                {msg.reaction && (
                                    <Reaction
                                        reaction={msg.reaction} 
                                        isSelfDC={msg.isSelfDC}
                                    />
                                )}
                            </div>
                            {/* Hover actions */}
                            {/* <div className="flex items-center space-x-3 opacity-0 transition-all group-hover:opacity-100 ml-2 flex-row"> */}
                            <HoverActions/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
