import PFP from "@/components/cast/pfp/PFP.dcEdit";
import ResetBtn from "./ResetBtn.farpletEdit";
import { formatAddress } from "../_lib/formatAddress";

export default function TopNav() {
  const addy = "0xdfsdfsfsd";
  return (
    <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
      <div className="flex p-3 sm:px-4 h-14 flex-row items-center justify-between">
        <div className="w-full h-full">
          <div className="flex w-full relative h-full flex-row justify-between">
            <div className="flex flex-col justify-center space-x-2">
              {/* PFP */}
              <PFP />
            </div>
            <div
              id="center-overlay"
              className="absolute left-1/2 h-full gap-1 transform -translate-x-1/2 flex flex-col text-center justify-center"
            >
              <span className="text-xl font-semibold">Wallet</span>

              <span className="text-xs text-[#576472] dark:text-[#9FA3AF]">
                {formatAddress(addy).slice(0, 2) +
                  formatAddress(addy).slice(2).toUpperCase()}
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
