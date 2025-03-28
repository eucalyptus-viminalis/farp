import { formatAddress } from "../_lib/formatAddress";
import { DicesIcon } from "lucide-react";
import { useFarplet } from "../_hooks/useFarplet";
import Username from "./Username.edit";
import PFP from "./PFP.edit";

export default function TopNav() {
  const { state, dispatch } = useFarplet();
  const addy = state.addy;
  function randomAddy(): string {
    const randomBytes = new Uint8Array(20); // Ethereum addresses are 20 bytes
    crypto.getRandomValues(randomBytes); // Use browser's secure random number generator

    const hex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return "0x" + hex;
  }
  const handleOnClickGenerateRandomAddy = () => {
    const newAddy = randomAddy();
    dispatch({
      type: "OVERRIDE_ADDY",
      payload: {
        addy: newAddy,
      },
    });
  };
  return (
    <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
      <div className="flex p-0 h-18 flex-row items-center justify-between">
        <div className="w-full h-full">
          <div className="flex w-full relative h-full flex-row justify-between">
            <div className="flex m-3 z-50 flex-col justify-center space-x-0">
              {/* PFP */}
              <PFP />
              <Username />
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
              {/* Dice roll */}
              <span className="flex flex-col h-full items-center justify-center text-[var(--yellow-9)] pl-2 absolute transform translate-x-full right-0">
                <div
                  title="roll random addy"
                  className="hover:bg-[var(--yellow-4)] rounded-full p-2 cursor-pointer"
                  onClick={handleOnClickGenerateRandomAddy}
                >
                  <DicesIcon />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
