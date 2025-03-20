"use client";

import { useEffect, useState } from "react";
import {
  DexSearchResponsePair,
  DexSearchResponsePairWithInfo,
} from "./useTokens.dex";
import { useAllMids } from "./useAllMids";
import { TokenInfo } from "@/contexts/FarpletContext";

export const useTokens = (q: string) => {
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const { data: hyperliquidPrices } = useAllMids(debouncedQ);

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

        // Filter tokens that have the `info` attribute, is base token, has liquidity
        const filteredTokens: DexSearchResponsePairWithInfo[] = (
          data.pairs || []
        ).filter(
          (token: DexSearchResponsePair) =>
            (token.liquidity?.usd &&
              token.marketCap &&
              token.chainId == "base") ||
            (token.chainId == "solana" && token.info && token.info.imageUrl),
        );

        console.log("filteredTokens", JSON.stringify(filteredTokens, null, 2));

        const newTokens: TokenInfo[] = filteredTokens.map((token) => {
          return {
            name: token.baseToken.name,
            symbol: token.baseToken.symbol,
            infoFrom: "dexscreener",
            logo: token.info.imageUrl,
            header: token.info.header,
            address: token.baseToken.address,
            isNativeToken: false,
            price: token.priceUsd,
            marketCap: token.marketCap,
            liquidity: token.liquidity.usd,
            pairCreatedAt: token.pairCreatedAt,
            chainId: token.chainId,
          };
        });

        // Create Hyperliquid tokens from HL results
        const hlTokens: TokenInfo[] =
          hyperliquidPrices && Object.keys(hyperliquidPrices).length > 0
            ? Object.entries(hyperliquidPrices).map(([symbol, price]) => ({
                name: symbol,
                symbol,
                isNativeToken: true, // Assuming HL tokens are native
                price: price.toString(),
                infoFrom: "hyperliquid",
              }))
            : [];
        setTokens([...hlTokens, ...newTokens]);
      } catch (error) {
        console.error("Error fetching tokens useTokens.mixed.ts:", error);
      }
    };

    fetchTokens();
  }, [debouncedQ, hyperliquidPrices]); // Include `hyperliquidPrices` as a dependency

  return { tokens };
};
