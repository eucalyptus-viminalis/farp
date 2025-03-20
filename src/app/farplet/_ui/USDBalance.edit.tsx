"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useFarplet } from "../_hooks/useFarplet";
import { fetchTokenPrice } from "../_actions/fetchTokenPrice.dex";
import { fetchTokenPrice as fetchHL } from "../_actions/fetchTokenPrice.hl";

// Assuming root cast
type Props = {
  index: number;
};
export default function USDBalance(props: Props) {
  // Context
  const { state, dispatch } = useFarplet();
  const { index } = props;
  const tokenBalance = state.tokenBalances[index];
  const usdBalance = tokenBalance.usdBalance;
  // States
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [q, setQ] = useState<number | null>(usdBalance);
  const [q, setQ] = useState<number>(usdBalance);

  // Handlers
  const handleClick = () => {
    setInputFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleFocus = () => {
    setInputFocused(true);
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const handleBlur = async () => {
    console.log("handleBlur triggered");
    setInputFocused(false);
    if (q) {
      const { chainId, address } = tokenBalance;
      if (!(chainId && address)) {
        console.error("chaindId or address missing");
        console.debug("tokenBalance", JSON.stringify(tokenBalance, null, 2));
        return;
      }
      let price = null;
      if (tokenBalance.isNativeToken) {
        price = await fetchHL(tokenBalance.symbol);
      } else {
        price = await fetchTokenPrice(chainId.toString(), address);
      }
      if (!price) {
        console.error("Failed to fetch token price.");
        console.debug("tokenBalance", JSON.stringify(tokenBalance, null, 2));
        return;
      }
      const tokenBalanceAmount = Number((q / price).toFixed(5)); // Returns a number
      // Dispatch to context
      dispatch({
        type: "UPDATE_TOKEN_BALANCE",
        payload: {
          index,
          tokenBalance: {
            ...tokenBalance,
            balance: tokenBalanceAmount,
            usdBalance: q,
          },
        },
      });
    }
    if (!usdBalance) {
      // TODO: Some default update
      dispatch({
        type: "UPDATE_TOKEN_BALANCE",
        payload: {
          index,
          tokenBalance: {
            ...tokenBalance,
            usdBalance: 100,
          },
        },
      });
    }
  };

  // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const amt = Number(e.target.value);
  //   e.preventDefault();
  //   setQ(amt);
  // };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const numValue = e.target.valueAsNumber;
    console.log("e.target.value", e.target.value);
    console.log("q === undefined", q === undefined);
    setQ(numValue);
    // if (!value) {
    //   console.log("!value");
    //   setQ(null);
    // }

    // Allow only valid numbers
    // if (/^\d*\.?\d*$/.test(value)) {
    //   setQ(value === "" ? 0 : parseFloat(value));
    // }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleBlur();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  });

  return (
    <div className="flex min-w-0 flex-row items-center">
      {inputFocused ? (
        <input
          ref={inputRef}
          type="number"
          className={`
                                bg-inherit
                                text-base
                                font-mono
                                ${!inputFocused && "hidden"}
                            `}
          style={{
            minWidth: "12ch",
            width: q.toString().length + "ch",
          }}
          autoFocus
          onFocus={handleFocus}
          onChange={handleOnChange}
          // value={q ? q : ""}
          // value={q?.toString() === "0" ? 0 : q === undefined ? undefined : q}
          value={q ?? ""}
          onBlur={handleBlur}
        />
      ) : (
        <span
          title="Override usdBalance"
          onClick={handleClick}
          className="
                                !block
                                min-w-0
                                px-4
                                overflow-hidden
                                text-ellipsis text-[var(--yellow-9)] text-base
                                whitespace-nowrap
                                break-words
                                sm:hover:underline
                            "
        >
          {"$" + usdBalance.toFixed(2)}
        </span>
      )}
    </div>
  );
}

// <span className="px-4 text-[var(--yellow-11)] text-xl">
//   {"$" + tokenBalance.usdBalance.toFixed(2)}
// </span>
