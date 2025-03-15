"use client";

import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
  useDeferredValue,
} from "react";
import Image from "next/image";
import { useFarplet } from "../_hooks/useFarplet";
import { PlusIcon, SearchIcon } from "lucide-react";
import {
  DexSearchResponsePair,
  DexSearchResponsePairWithInfo,
  useTokens,
} from "../_hooks/useTokens.dex";
import { newton } from "viem/chains";

const DEFAULT_USERNAME = "dwr";

// Assumming root cast
export default function TokenSearch() {
  // Context
  const context = useFarplet();

  // States
  // const [q, setQ] = useState<string>(username ?? "");
  const [q, setQ] = useState<string>("");
  const [showTokens, setShowTokens] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLLabelElement>(null);
  const deferredQ = useDeferredValue(q);
  const [mousingAround, setMousingAround] = useState(false);

  // Queried Data
  const { tokens } = useTokens(deferredQ);

  // State mutations
  const addToken = async (newToken: DexSearchResponsePairWithInfo) => {
    console.log("addToken triggered");
    console.log("newToken", JSON.stringify(newToken, null, 2));

    // Fetch price from the server action
    // const tokenPrice = await fetchTokenPrice(newToken.id);
    const tokenPrice = Number(newToken.priceUsd);

    if (!tokenPrice) {
      console.error("Failed to fetch token price.");
      return;
    }

    const startingUSDBalance = 3069.37;
    const tokenBalanceAmount = startingUSDBalance / tokenPrice; // Calculate balance

    // Dispatch to context
    context.dispatch({
      type: "ADD_TOKEN_BALANCE",
      payload: {
        tokenBalance: {
          address: newToken.baseToken.address,
          chainId: newToken.chainId,
          balance: tokenBalanceAmount,
          logo: newToken.info.imageUrl,
          name: newToken.baseToken.name,
          symbol: newToken.baseToken.symbol,
          usdBalance: startingUSDBalance,
          header: newToken.info.header,
        },
      },
    });
  };

  // Handlers
  const onTokenRowClick = (e: any) => {
    e.preventDefault();
    const newToken = tokens[selectedIndex];
    addToken(newToken);
    setQ("");
    setShowInput(false);
    setShowTokens(false);
    // if (containerRef.current) {
    //   containerRef.current.hidden = true;
    // }
    // setShowUsers(false);
  };

  const handleMouseLeave = () => {
    setMousingAround(false);
  };
  const onMouseEnter = (_: MouseEvent<HTMLLIElement>, i: number) => {
    setMousingAround(true);
    setSelectedIndex(i);
  };
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key)
    // console.log(e.keyCode)
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, tokens.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (
      e.key === "Enter" &&
      selectedIndex >= 0 &&
      selectedIndex < tokens.length
    ) {
      e.preventDefault();
      const newToken = tokens[selectedIndex];
      addToken(newToken);
      setQ("");
      setShowTokens(false);
    } else if (e.key === "Escape") {
      console.log('e.key === "Secape"');
      inputRef.current?.blur(); // Explicitly remove focus
      // e.preventDefault();
    } else if (e.keyCode == 27) {
      e.preventDefault();
    }
  };
  const onSpanClick = () => {
    setShowInput(true);
    setShowTokens(true);
  };
  // Select the input when it appears
  useEffect(() => {
    if (showInput && inputRef.current) {
      // inputRef.current.focus()
      inputRef.current.select();
    }
  }, [showInput, inputRef]);

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const onFocus = () => {
    setShowTokens(true);
  };
  // TODO: If we have currently editing token context, may need this
  // useEffect(() => {
  //   setQ(username);
  // }, [username]);

  const handleBlur = () => {
    setShowTokens(false);
    // if (!username) {
    //   overrideTokenName(DEFAULT_USERNAME);
    // }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // overrideTokenName(e.currentTarget.value.trim());
    setQ(e.currentTarget.value.trim());
    setSelectedIndex(-1);
    setShowTokens(true);
  };

  // TODO: Get rid of this? not using in Username.editcontext either..
  // const onBlur = (e: FocusEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   if (!mousingAround) {
  //     setShowInput(false);
  //     if (!cast.usernameOverride) {
  //       overrideTokenName(DEFAULT_USERNAME);
  //       setQ(DEFAULT_USERNAME);
  //     }
  //     setShowUsers(false);
  //   }
  // };

  // Effects
  useEffect(() => {
    setSelectedIndex(-1);
  }, [tokens]);

  // Fetch users and update state when query value changes
  // Close user list when user clicks outside container
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowTokens(false);
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleBlur();
      }
    };
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        console.log('handleKeyPress, event.key === "Escape"');
        handleBlur();
      }
    };
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }
    window.addEventListener("keypress", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleBlur]);

  return (
    <div className="flex flex-row p-2 mt-2 mr-2 items-center border border-[var(--yellow-9)]">
      {/* <PlusIcon className="text-gray-400" /> */}
      <SearchIcon className="text-gray-400" />
      <label
        // className="flex flex-row"
        htmlFor="token-search-input"
        ref={containerRef}
        className="w-full pr-1"
      >
        <input
          ref={inputRef}
          autoFocus
          onFocus={onFocus}
          name="token-search-input"
          placeholder="Search"
          className="
                    bg-inherit text-inherit font-mono
                    text-lg sm:text-base
                        relative
                        scrollbar-vert
                        mx-1
                        max-h-[600px] min-h-[40px]
                        overflow-hidden overflow-y-auto break-words
                        p-2
                        bg-input
                        text-default
                "
          style={{
            minWidth: "20ch",
            // width: cast.usernameOverride.length + 1 + "ch",
            // width: q.length + 3 + "ch",
            width: "100%",
            maxWidth: "100%",
            // maxWidth: "30ch",
          }}
          onChange={onInputChange}
          value={q}
          // onBlur={onBlur}
          // onBlurCapture={()=>console.log('onblur captured')}
          type="text"
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
        />

        <ul
          onMouseLeave={handleMouseLeave}
          className="absolute z-10 rounded-lg border border-faint bg-app overflow-auto max-h-72"
          hidden={!showTokens || tokens.length == 0}
          style={{
            width: inputRef.current
              ? `${inputRef.current.offsetWidth}px`
              : "100%",
          }}
        >
          {showTokens &&
            tokens.map((token, index) => (
              // <li key={token.id} className="p-2 border-b">
              //   <img
              //     src={token.thumb}
              //     alt={token.name}
              //     className="w-6 h-6 inline-block mr-2"
              //   />
              //   {token.name} ({token.symbol.toUpperCase()})
              // </li>
              <li
                key={token.pairAddress}
                className={`bg-app p-2 border-b-2 border-faint ${
                  selectedIndex === index ? "underline" : ""
                }`}
                onMouseEnter={(e) => onMouseEnter(e, index)}
                onClick={onTokenRowClick}
              >
                <div className="flex flex-row">
                  {token.info.imageUrl ? (
                    <div className="relative rounded-full overflow-hidden h-[64px] w-[64px]">
                      <Image
                        alt={token.baseToken.name}
                        className="object-cover"
                        sizes="64px"
                        fill
                        src={token.info.imageUrl}
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span>no image</span>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {token.baseToken.name}
                    </span>
                    <span className="text-muted">
                      {"(" + token.baseToken.symbol + ")"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </label>
    </div>
  );
}
