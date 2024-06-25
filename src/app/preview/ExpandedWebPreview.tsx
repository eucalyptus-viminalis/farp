"use client";
import { ConvoWebNavBar } from "@/components/nav/ConvoWebNavBar";
import ConvoRootCast from "../convo/ConvoRootCast";
import ReplyCast from "../convo/ReplyCast";
import NestedReplyCast from "../convo/NestedReplyCast";
import { useContext } from "react";
import { EditContext } from "@/contexts/EditContext";
import { CastPreviewProvider } from "@/contexts/CastPreviewContext";
import UsernameSearch from "@/components/cast/username/UsernameSearch";

const MAX_NESTED_REPLY_DISPLAY = 2;

export default function ExpandedWebPreview() {
    const cx = useContext(EditContext);
    const rootCast = cx.state.rootCast;
    return (
        <>
            <div className="flex ml-2 text-inherit flex-row gap-1 justify-start items-center">
                {`Replying as: `}<UsernameSearch/>
            </div>
            <ConvoWebNavBar />
            <div className="fade-in min-h-screen">
                {/* Root cast */}
                <CastPreviewProvider
                    cast={rootCast}
                    castType="root-cast"
                    previewMode="expanded-web"
                >
                    <ConvoRootCast />
                </CastPreviewProvider>
                {/* First Reply */}
                {rootCast.replies &&
                    rootCast.replies.map((reply, i) => {
                        if (i === 0) {
                            return (
                                <div key={i}>
                                    <ReplyCast
                                        key={`reply-${i}`}
                                        showingNested={i === 0 && reply.replies && reply.replies.length > 0}
                                        lastIndex={
                                            i ===
                                                (rootCast.replies?.length ??
                                                    0) -
                                                    1 ?? false
                                        }
                                        cast={reply}
                                    />
                                    {/* Map nested replies */}
                                    {reply.replies &&
                                        reply.replies
                                            .slice(0, MAX_NESTED_REPLY_DISPLAY)
                                            .map((nestedReply, j) => {
                                                return (
                                                    <NestedReplyCast
                                                        key={`nested-reply-${j}`}
                                                        cast={nestedReply}
                                                        lastToDisplay={
                                                            j ===
                                                            MAX_NESTED_REPLY_DISPLAY -
                                                                1
                                                        }
                                                    />
                                                );
                                            })}
                                </div>
                            );
                        } else {
                            return (
                                <ReplyCast
                                    cast={reply}
                                    key={i}
                                    lastIndex={
                                        i ===
                                            (rootCast.replies?.length ?? 0) -
                                                1 ?? false
                                    }
                                />
                            );
                        }
                    })}
                {/* <ReplyCast cast={rootCast} />
                <NestedReplyCast cast={rootCast} />
                <NestedReplyCast
                    cast={rootCast}
                    lastToDisplay
                /> */}
            </div>
        </>
    );
}
