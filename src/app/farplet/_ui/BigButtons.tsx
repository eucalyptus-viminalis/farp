import { PaperAirplaneIcon } from "@primer/octicons-react";
import { Repeat, CopyIcon } from "lucide-react";

export default function BigButtons() {
  return (
    <div className="flex h-28 text-xl font-semibold flex-row gap-3 justify-between m-4">
      <div className="flex flex-col gap-2 text-violet-400 items-center w-full justify-center rounded-3xl overflow-hidden bg-violet-50 bg-opacity-5">
        {/* icon */}
        <PaperAirplaneIcon size={36} className="-rotate-45" />
        <span className="text-gray-400">Send</span>
      </div>
      <div className="flex flex-col gap-2 text-violet-400 items-center w-full justify-center rounded-3xl overflow-hidden bg-violet-50 bg-opacity-5">
        {/* icon */}
        {/* <RepeatIcon /> */}
        <Repeat size={36} />
        <span className="text-gray-400">Swap</span>
      </div>
      <div className="flex flex-col gap-2 text-violet-400 items-center w-full justify-center rounded-3xl overflow-hidden bg-violet-50 bg-opacity-5">
        {/* icon */}
        <CopyIcon size={36} />
        <span className="text-gray-400">Copy</span>
      </div>
    </div>
  );
}
