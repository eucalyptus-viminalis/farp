import { PaperAirplaneIcon } from "@primer/octicons-react";
import { Repeat, CopyIcon } from "lucide-react";

export default function BigButtons() {
  return (
    <div className="flex h-20 px-2 text-base font-semibold flex-row w-full gap-2 justify-between m-1 mb-4">
      <div className="flex flex-col gap-1 text-[--violet-9] items-center w-full justify-center rounded-2xl overflow-hidden bg-gray-950 dark:bg-violet-50 bg-opacity-5 dark:bg-opacity-5">
        {/* icon */}
        <PaperAirplaneIcon size={16} className="mb-1.5 -rotate-45 scale-150" />
        {/* <PaperAirplaneIcon size={24} className="-rotate-45" /> */}
        <span className="text-[var(--gray-11)]">Send</span>
      </div>
      <div className="flex flex-col gap-1 text-[--violet-9] items-center w-full justify-center rounded-2xl overflow-hidden bg-gray-950 dark:bg-violet-50 bg-opacity-5 dark:bg-opacity-5">
        {/* icon */}
        <Repeat size={26} />
        <span className="text-[var(--gray-11)]">Swap</span>
      </div>
      <div className="flex flex-col gap-1 text-[--violet-9] items-center w-full justify-center rounded-2xl overflow-hidden bg-gray-950 dark:bg-violet-50 bg-opacity-5 dark:bg-opacity-5">
        {/* icon */}
        <CopyIcon size={26} className="transform scale-y-[-1]" />
        <span className="text-[var(--gray-11)]">Copy</span>
      </div>
    </div>
  );
}
