"use client";
import { useContext, useEffect, useRef } from "react";
import { DCEditContext } from "@/contexts/DCEditContext";
import TopNav from "./top-nav/TopNav.dcEdit";
import BottomInputBar from "./bottom-bar/BottomInputBar";
import Message from "./message/Message.messageEdit";
import { MessageEditProvider } from "@/contexts/MessageEditContext";

export default function DCEditNode() {
  const cx = useContext(DCEditContext);
  const { dispatch, state } = cx;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { msgs } = state;
  const prevMsgsLengthRef = useRef(msgs.length);

  useEffect(() => {
    if (scrollRef.current && msgs.length > prevMsgsLengthRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    prevMsgsLengthRef.current = msgs.length;
  }, [msgs.length]);
  return (
    // <div className="h-full w-full relative h-screen max-h-screen w-full grow">
    <div className="w-full relative h-[70vh] sm:h-[75vh] max-h-screen w-full grow">
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full flex-col justify-center border-b bg-app border-default">
          <TopNav />
        </div>
        <div className="flex h-full flex-col overflow-hidden pl-2">
          {/* Scrollable area */}
          <div
            className="scrollbar-vert mt-0.5 h-full w-full overflow-auto scroll-auto"
            ref={scrollRef}
            // style={{ transform: "scaleY(-1)" }}
          >
            <div
              className="relative min-h-full w-full flex flex-col justify-start"
              style={{
                // height: "400px",
                transform: "scaleY(-1)",
              }}
            >
              {/* DCs */}
              {state.msgs.toReversed().map((dc, i) => (
                <MessageEditProvider
                  dispatch={dispatch}
                  msg={dc}
                  key={state.msgs.length - 1 - i}
                  msgIndex={state.msgs.length - 1 - i}
                >
                  <Message
                    key={state.msgs.length - 1 - i}
                    bigGap={
                      i === 0 ||
                      state.msgs[i].isSelfDC !== state.msgs[i - 1].isSelfDC
                    }
                  />
                </MessageEditProvider>
              ))}
            </div>
          </div>
        </div>
        <BottomInputBar />
      </div>
    </div>
  );
}
