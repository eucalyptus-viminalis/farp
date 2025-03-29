import { ArrowLeftIcon } from "lucide-react";

export const ConvoWebNavBar = () => {
  return (
    <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
      <div className="hidden sm:flex sm:px-4 h-14 flex-row items-center justify-between">
        <h2 className="font hidden flex-row items-center text-center text-xl font-bold decoration-0 sm:flex sm:text-left">
          <div className="mr-1 flex cursor-pointer flex-col items-center justify-center rounded-full p-2 hover:bg-overlay-faint">
            <ArrowLeftIcon />
          </div>
          Conversation
        </h2>
        <div className="hidden sm:block">
          <button className="rounded-lg font-semibold disabled:opacity-50 bg-action text-light px-4 py-2 text-sm">
            Cast
          </button>
        </div>
      </div>
    </nav>
  );
};
