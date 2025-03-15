"use client";

import PFP from "@/components/cast/pfp/PFP.dcEdit";
import ResetBtn from "./ResetBtn.farpletEdit";
import { formatAddress } from "../_lib/formatAddress";

export default function TopNav() {
  const addy = "0xdfsdfsfsd";
  return (
    <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
      <div className="flex sm:flex sm:px-4 h-14 flex-row items-center justify-between">
        <div className="w-full">
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col justify-center space-x-2">
              {/* PFP */}
              <PFP />
            </div>
            <div className="flex flex-col text-center justify-around pl-2">
              <span className="text-2xl font-bold">Warplet</span>

              <span className="text-base text-[#576472] dark:text-[#9FA3AF]">
                {formatAddress(addy)}
              </span>
            </div>
            <div className="flex flex-col justify-around">
              <div className="right flex flex-col">
                <div className="flex flex-row space-x-4">
                  <ResetBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LeftChevronSVG() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      className="octicon octicon-arrow-left"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      style={{
        display: "inline-block",
        verticalAlign: "text-bottom",
        overflow: "visible",
      }}
    >
      <path d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"></path>
    </svg>
  );
}
