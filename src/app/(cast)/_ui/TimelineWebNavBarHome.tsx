import React from "react";

const TimelineWebNavBarHome = () => {
  return (
    <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default h-14 sm:h-28">
      <div className="hidden sm:flex sm:px-4 h-14 flex-row items-center justify-between">
        <h2 className="font hidden flex-row items-center text-center text-xl font-bold decoration-0 sm:flex sm:text-left">
          Home
        </h2>
        <div className="hidden sm:block">
          <button className="rounded-lg font-semibold disabled:opacity-50 bg-action text-light px-4 py-2 text-sm">
            Cast
          </button>
        </div>
      </div>
      <div>
        <div className="flex h-14 flex-row items-center justify-around border-b border-faint">
          <span className="current flex h-full w-full items-center justify-center text-inherit">
            <div className="relative flex h-full w-full flex-col items-center justify-center hover:bg-overlay-faint">
              <div className="relative flex h-full items-center justify-center text-base font-semibold text-default">
                Home
                <div className="absolute bottom-0 h-1 w-full min-w-[56px] rounded-full bg-highlight"></div>
              </div>
            </div>
          </span>
          <span className="flex h-full w-full items-center justify-center text-inherit">
            <div className="relative flex h-full w-full flex-col items-center justify-center hover:bg-overlay-faint">
              <div className="relative flex h-full items-center justify-center text-base font-semibold text-muted">
                Trending
              </div>
            </div>
          </span>
          <span className="flex h-full w-full items-center justify-center text-inherit">
            <div className="relative flex h-full w-full flex-col items-center justify-center hover:bg-overlay-faint">
              <div className="relative flex h-full items-center justify-center text-base font-semibold text-muted">
                Frames
              </div>
            </div>
          </span>
          <span className="flex h-full w-full items-center justify-center text-inherit">
            <div className="relative flex h-full w-full flex-col items-center justify-center hover:bg-overlay-faint">
              <div className="relative flex h-full items-center justify-center text-base font-semibold text-muted">
                All channels
              </div>
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TimelineWebNavBarHome;
