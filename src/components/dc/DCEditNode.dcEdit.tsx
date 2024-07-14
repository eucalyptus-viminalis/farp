'use client'
import { useContext } from "react";
import Message from "./Message";
import { DCEditContext } from "@/contexts/DCEditContext";
import TopNav from "./top-nav/TopNav.dcEdit";
import MessageInput from "./bottom-bar/MessageInput.dcEdit";
import SendButton from "./bottom-bar/SendButton.dcEdit";
import ImageInputBtn from "./bottom-bar/ImageInputBtn.dcEdit";
import EmojiInputBtn from "./bottom-bar/EmojiInputBtn.dcEdit";
import MessageInputDraftJS from "./bottom-bar/MessageInputDraftJS.dcEdit";

export default function DCEditNode() {
    const cx = useContext(DCEditContext)
    const {dispatch,state,} = cx
    return (
        <div className="h-full w-full relative h-screen max-h-screen w-full grow">
            <div className="flex h-full w-full flex-col">
                <div className="flex w-full flex-col justify-center border-b bg-app border-default">
                    <TopNav />
                </div>
                <div className="flex h-full flex-col overflow-hidden pl-2">
                    {/* Scrollable area */}
                    <div
                        className="scrollbar-vert mt-0.5 h-full w-full overflow-auto scroll-auto"
                        // style={{ transform: "scaleY(-1)" }}
                    >
                        <div
                            className="relative min-h-full w-full flex flex-col justify-start"
                            style={{ 
                                // height: "400px", 
                                transform: 'scaleY(-1)'
                            }}
                        >
                            {/* DCs */}
                            {state.msgs.map((dc, i) => (
                                <Message 
                                    key={i} 
                                    castText={dc.txt}
                                    index={i}
                                    timeDisplayString={dc.timeDisplay}
                                    // translate={50}
                                    isSelfDC={dc.isSelfDC}
                                    bigGap={(i === 0 || state.msgs[i].isSelfDC !== state.msgs[i-1].isSelfDC)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative flex w-full flex-row justify-between border-t p-3 bg-overlay-faint border-default">
                    {/* Hidden */}
                    <input
                        type="file"
                        className="w-full rounded border p-2 text-sm bg-input border-default text-default hidden"
                        id="dc-img-input"
                        accept="image/jpeg,image/jpg,image/png"
                    />
                    <EmojiInputBtn/>
                    <ImageInputBtn/>
                    {/* <MessageInput/> */}
                    <MessageInputDraftJS/>
                    <SendButton/>
                </div>
            </div>
        </div>
    );
}
