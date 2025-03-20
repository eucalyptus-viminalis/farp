"use client";
import { FarpletContext } from "@/contexts/FarpletContext";
import { PlusIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
export default function AddETHBtn() {
  const cx = useContext(FarpletContext);
  const { dispatch } = cx;
  const handleReset = () => {
    dispatch({
      payload: true,
      type: "ADD_ETH",
    });
  };
  const hasETH = cx.state.tokenBalances.some((bal) => bal.symbol === "ETH");

  return (
    <button
      type="button"
      title={hasETH ? "add ETH (disabled)" : "add ETH"}
      id="radix-:r85:"
      aria-haspopup="menu"
      aria-expanded="false"
      data-state="closed"
      onClick={handleReset}
      className="cursor-pointer text
      text-[var(--yellow-9)]
      disabled:text-gray-500
      disabled:cursor-default
      "
      disabled={hasETH} // Disable if ETH exists
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
        {"ETH"}
      </div>
    </button>
  );
}
