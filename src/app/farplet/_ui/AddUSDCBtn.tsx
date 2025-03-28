"use client";
import { FarpletContext } from "@/app/_context/FarpletContext";
import { PlusIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
export default function AddUSDCBtn() {
  const cx = useContext(FarpletContext);
  const { dispatch } = cx;
  const handleReset = () => {
    dispatch({
      payload: true,
      type: "ADD_USDC",
    });
  };
  const hasUSDC = cx.state.tokenBalances.some((bal) => bal.symbol === "USDC");

  return (
    <button
      type="button"
      title={hasUSDC ? "add USDC (disabled)" : "add USDC"}
      id="radix-:r85:"
      aria-haspopup="menu"
      aria-expanded="false"
      data-state="closed"
      onClick={handleReset}
      className="cursor-pointer text
      text-[var(--yellow-9)]
      disabled:text-gray-300
      disabled:dark:text-gray-600
      disabled:cursor-default
      "
      disabled={hasUSDC} // Disable if USDC exists
    >
      {/* <div className="relative flex h-8 w-8 flex-col items-center justify-center rounded-full text-muted hover:text-action-purple hover:bg-overlay-faint"> */}
      <div
        className={`
                    relative
                    flex flex-row items-center justify-center gap-0
                    h-8
                    rounded-full
                    hover:text-action-purple
                    hover:bg-overlay-faint
                `}
      >
        <PlusIcon
          aria-hidden="true"
          focusable="false"
          role="img"
          width="20"
          height="20"
          fill="currentColor"
          style={{
            display: "inline-block",
            verticalAlign: "text-bottom",
            overflow: "visible",
          }}
        />
        USDC
      </div>
    </button>
  );
}
