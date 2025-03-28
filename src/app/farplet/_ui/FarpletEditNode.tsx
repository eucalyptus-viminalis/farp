"use client";
import TopNav from "./TopNav.farpletEdit";
import BottomBar from "./BottomBar.edit";
import { useFarplet } from "../_hooks/useFarplet";
import TokenBalanceRow from "./TokenBalanceRow.edit";
import TokenSearch from "./TokenSearch.edit";
import BigButtons from "./BigButtons";
import TabRow from "./TabRow.preview";
import AddETHBtn from "./AddETHBtn";
import AddUSDCBtn from "./AddUSDCBtn";
import ResetBtn from "./ResetBtn.farpletEdit";

export default function FarpletEditNode() {
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
    <div className="relative h-[70vh] sm:h-[75vh] max-h-screen w-full grow">
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full flex-col justify-center bg-app border-default">
          <TopNav />
          {/* Big balance */}
          <span className="text-5xl w-full flex flex-row justify-center items-center font-semibold text-center p-5 mb-2">
            {"$" + totalBalanceUSD().toFixed(2)}
          </span>
          {/* <TabRow /> */}
        </div>
        <div className="flex relative h-full flex-col overflow-auto pl-2">
          {state.tokenBalances.map((tokenBalance, i) => (
            <TokenBalanceRow index={i} key={i} tokenBalance={tokenBalance} />
          ))}
          <div className="flex mt-2 flex-col justify-around mr-2">
            <div className="right flex flex-col">
              <div className="flex flex-row gap-3">
                <AddETHBtn />
                <AddUSDCBtn />
                <ResetBtn />
              </div>
            </div>
          </div>
          <TokenSearch />
          {/* <div>
            <button className="flex rounded-xl flex-col justify-center items-center w-20 h-20 text-7xl text-[var(--yellow-11)] bg-gray-50 bg-opacity-5">
              <PlusIcon size={64} />
            </button>
          </div> */}
          {/* Show all row */}
          {/* <div className="p-2 mt-6 mb-24 w-full flex">
            <div className="flex flex-row font-semibold gap-2 text-gray-400 justify-center items-center rounded-full p-3 bg-gray-50 bg-opacity-5">
              <span className="">Show all</span>
              <ChevronDown />
            </div>
          </div> */}
          {/* Scrollable area */}
          <div
            className="scrollbar-vert mt-0.5 h-full w-full overflow-auto scroll-auto"
            // ref={scrollRef}
            // style={{ transform: "scaleY(-1)" }}
          >
            <div
              className="relative min-h-full w-full flex flex-col justify-start"
              style={{
                // height: "400px",
                transform: "scaleY(-1)",
              }}
            ></div>
          </div>
        </div>
        <div>
          <BottomBar />
        </div>
        {/* maybe put the tab icons here? */}
        {/* <BottomInputBar /> */}
      </div>
    </div>
  );
}
