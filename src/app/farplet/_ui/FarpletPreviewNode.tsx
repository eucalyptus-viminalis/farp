"use client";
import TopNav from "./TopNav.farpletEdit";
import BigButtons from "./BigButtons";
import BottomBar from "./BottomBar.preview";
import { useFarplet } from "../_hooks/useFarplet";
import TopNavFarplet from "./TopNavFarplet.preview";
import TokenBalanceRow from "./TokenBalanceRow.preview";
import TabRow from "./TabRow.preview";
import { ChevronDown } from "lucide-react";

export default function FarpletPreviewNode() {
  const { dispatch, state, totalBalanceUSD } = useFarplet();
  // const scrollRef = useRef<HTMLDivElement>(null);
  // const prevMsgsLengthRef = useRef(msgs.length);

  // TODO: i think this is to change scroll down when msgs are added. probably not useful here
  // useEffect(() => {
  //   if (scrollRef.current && msgs.length > prevMsgsLengthRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  //   prevMsgsLengthRef.current = msgs.length;
  // }, [msgs.length]);
  return (
    // <div className="h-full w-full relative h-screen max-h-screen w-full grow">
    <div>
      <div className="h-full w-full relative h-screen max-h-screen w-full grow">
        <div className="flex h-full w-full flex-col">
          <div className="flex w-full flex-col justify-center bg-app border-default">
            <TopNavFarplet />
          </div>
          <div className="flex h-full flex-col overflow-auto px-2">
            {/* Scrollable area */}
            <div className="h-full mt-2 w-full overflow-auto scroll-auto">
              {/* Big balance */}
              <span className="text-5xl w-full flex flex-row justify-center items-center font-semibold text-center p-5 mb-2">
                {"$" + totalBalanceUSD().toFixed(2)}
              </span>
              {/* Big Buttons */}
              <BigButtons />
              {/* sticky tab */}
              <TabRow />
              {/* <div className="scrollbar-vert min-h-full w-full"> */}
              <div className="scrollbar-vert min-h-full w-full overflow-auto">
                {state.tokenBalances.map((tokenBalance, i) => (
                  <TokenBalanceRow
                    index={i}
                    key={i}
                    tokenBalance={tokenBalance}
                  />
                ))}
                <div className="p-2 mt-6 mb-24 w-full flex">
                  <div className="flex flex-row font-semibold gap-2 text-gray-400 justify-center items-center rounded-full p-3 bg-gray-50 bg-opacity-5">
                    <span className="">Show all</span>
                    <ChevronDown />
                  </div>
                </div>
              </div>
              {/* <div
              className="relative min-h-full w-full flex flex-col justify-start"
              style={{
                // height: "400px",
                transform: "scaleY(-1)",
              }}
            ></div> */}
            </div>
          </div>
          <div>
            <BottomBar />
          </div>
          {/* maybe put the tab icons here? */}
          {/* <BottomInputBar /> */}
        </div>
      </div>
    </div>
  );
}
