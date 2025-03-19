import { PaperAirplaneIcon } from "@primer/octicons-react";
import { Repeat, CopyIcon } from "lucide-react";

export default function BigButtons() {
  return (
    <div className="flex h-20 text-base font-semibold flex-row w-full gap-2 justify-between m-1 mb-4">
      <div className="flex flex-col gap-1 text-violet-500 items-center w-full justify-center rounded-2xl overflow-hidden bg-violet-50 bg-opacity-5">
        {/* icon */}
        <PaperAirplaneIcon size={24} className="-rotate-45" />
        <span className="text-gray-400">Send</span>
      </div>
      <div className="flex flex-col gap-1 text-violet-500 items-center w-full justify-center rounded-2xl overflow-hidden bg-violet-50 bg-opacity-5">
        {/* icon */}
        {/* <RepeatIcon /> */}
        <Repeat size={24} />
        <span className="text-gray-400">Swap</span>
      </div>
      <div className="flex flex-col gap-1 text-violet-500 items-center w-full justify-center rounded-2xl overflow-hidden bg-violet-50 bg-opacity-5">
        {/* icon */}
        <CopyIcon size={24} />
        <span className="text-gray-400">Copy</span>
      </div>
    </div>
  );
}
