"use client";

import { useEffect, useState } from "react";

// "{
//   \"id\": \"lolcat-2\",
//   \"name\": \"Lolcat\",
//   \"api_symbol\": \"lolcat-2\",
//   \"symbol\": \"LOLCAT\",
//   \"market_cap_rank\": 5039,
//   \"thumb\": \"https://coin-images.coingecko.com/coins/images/51097/thumb/lolcat.jpg\",
//   \"large\": \"https://coin-images.coingecko.com/coins/images/51097/large/lolcat.jpg\"
// }"

export type CoinGeckoToken = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export const useTokens = (q: string) => {
  const [tokens, setTokens] = useState<CoinGeckoToken[]>([]);

  useEffect(() => {
    if (!q || q.length <= 0) {
      setTokens([]);
      return;
    }

    const fetchTokens = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${q}`,
        );
        const data = await response.json();
        const coins: CoinGeckoToken[] = data.coins;
        setTokens(coins || []);
      } catch (error) {
        console.error("Error fetching tokens useTokens.tsx:", error);
      }
    };

    fetchTokens();
  }, [q]);

  return { tokens };
};
