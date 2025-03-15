"use client";

import { useEffect, useState } from "react";

// refer to example at bottom of this file
export interface DexSearchResponsePair {
  chainId: "base" | "solana";
  dexId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceUsd: string;
  liquidity: {
    usd: number;
  };
  marketCap: string;
  pairCreatedAt: number;
  info?: {
    imageUrl?: string;
    header?: string;
    openGraph?: string;
  };
}

export interface DexSearchResponsePairWithInfo extends DexSearchResponsePair {
  info: {
    imageUrl: string;
    header?: string;
    openGraph?: string;
  };
}

export const useTokens = (q: string) => {
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [tokens, setTokens] = useState<DexSearchResponsePairWithInfo[]>([]);

  // Debounce the query before making API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQ(q);
    }, 300); // Adjust debounce delay as needed (e.g., 300ms)

    return () => clearTimeout(handler);
  }, [q]);

  useEffect(() => {
    if (!debouncedQ) {
      setTokens([]);
      return;
    }

    const fetchTokens = async () => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/search?q=${debouncedQ}`,
        );
        const data = await response.json();
        console.log("dex search data", JSON.stringify(data, null, 2));

        // Filter tokens that have the `info` attribute
        const filteredTokens: DexSearchResponsePairWithInfo[] = (
          data.pairs || []
        ).filter(
          (token: DexSearchResponsePair) => token.info && token.info.imageUrl,
        );
        console.log("filteredTokens", JSON.stringify(filteredTokens, null, 2));
        setTokens(filteredTokens || []);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [debouncedQ]);

  return { tokens };
};

// {
//   "chainId": "base",
//   "dexId": "pancakeswap",
//   "url": "https://dexscreener.com/base/0x54d281c7cc029a9dd71f9acb7487dd95b1eecf5a",
//   "pairAddress": "0x54D281c7cc029a9Dd71F9ACb7487dd95B1EecF5a",
//   "baseToken": {
//     "address": "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
//     "name": "Degen",
//     "symbol": "DEGEN"
//   },
//   "quoteToken": {
//     "address": "0x4200000000000000000000000000000000000006",
//     "name": "Wrapped Ether",
//     "symbol": "WETH"
//   },
//   "priceNative": "0.000001677",
//   "priceUsd": "0.003180",
//   "txns": {
//     "m5": {
//       "buys": 3,
//       "sells": 4
//     },
//     "h1": {
//       "buys": 52,
//       "sells": 59
//     },
//     "h6": {
//       "buys": 379,
//       "sells": 406
//     },
//     "h24": {
//       "buys": 1777,
//       "sells": 1884
//     }
//   },
//   "volume": {
//     "h24": 144834.37,
//     "h6": 26042.5,
//     "h1": 6336.88,
//     "m5": 65.33
//   },
//   "priceChange": {
//     "m5": -0.09,
//     "h1": 0.72,
//     "h6": 1.18,
//     "h24": 0.87
//   },
//   "liquidity": {
//     "usd": 90409.58,
//     "base": 12658382,
//     "quote": 26.4509
//   },
//   "fdv": 117583774,
//   "marketCap": 56397677,
//   "pairCreatedAt": 1721028501000,
//   "info": {
//     "imageUrl": "https://dd.dexscreener.com/ds-data/tokens/base/0x4ed4e862860bed51a9570b96d89af5e1b0efefed.png?key=ac292c",
//     "header": "https://dd.dexscreener.com/ds-data/tokens/base/0x4ed4e862860bed51a9570b96d89af5e1b0efefed/header.png?key=ac292c",
//     "openGraph": "https://cdn.dexscreener.com/token-images/og/base/0x4ed4e862860bed51a9570b96d89af5e1b0efefed?timestamp=1741942800000",
//     "websites": [
//       {
//         "label": "Website",
//         "url": "https://www.degen.tips/"
//       },
//       {
//         "label": "Warpcast",
//         "url": "https://warpcast.com/~/channel/degen"
//       }
//     ],
//     "socials": [
//       {
//         "type": "twitter",
//         "url": "https://twitter.com/degentokenbase"
//       },
//       {
//         "type": "telegram",
//         "url": "https://t.me/degentokenbase"
//       }
//     ]
//   }
// },
