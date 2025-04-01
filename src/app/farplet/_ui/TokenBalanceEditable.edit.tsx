"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useFarplet } from "../_hooks/useFarplet";
import { fetchTokenPrice } from "../_actions/fetchTokenPrice.dex";
import { fetchTokenPrice as fetchHL } from "../_actions/fetchTokenPrice.hl";

// Assuming root cast
type Props = {
  index: number;
};
export default function TokenBalanceEditable(props: Props) {
  // Context
  const { state, dispatch } = useFarplet();
  const { index } = props;
  const tokenBalance = state.tokenBalances[index];
  const balance = tokenBalance.balance;
  // States
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [q, setQ] = useState<number | null>(usdBalance);
  const [q, setQ] = useState<number>(balance);

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
      const usdBalance = q * price; // Calculate balance
      // Dispatch to context
      dispatch({
        type: "UPDATE_TOKEN_BALANCE",
        payload: {
          index,
          tokenBalance: {
            ...tokenBalance,
            balance: q,
            usdBalance: usdBalance,
          },
        },
      });
    }
    if (!balance) {
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
              text-lg
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
        <div className="flex gap-2 flex-row">
          <span
            title="Override token balance"
            onClick={handleClick}
            className="
                                  !block
                                  min-w-0
                                  overflow-hidden
                                  text-ellipsis text-[var(--yellow-9)]
                                  whitespace-nowrap
                                  break-words
                                  sm:hover:underline
                              "
          >
            {parseFloat(tokenBalance.balance.toFixed(6)).toString()}
          </span>
          <span className="text-gray-400">{tokenBalance.symbol}</span>
        </div>
      )}
    </div>
  );
}

/* <div className="flex gap-2 flex-row">
  <span className="text-[var(--yellow-11)]">
    {parseFloat(tokenBalance.balance.toFixed(6)).toString()}
  </span>
  <span className="text-gray-400">{tokenBalance.symbol}</span>
</div> */
