import { useQuery } from "@tanstack/react-query";

export type CoinGeckoPriceResponse = {
  [tokenId: string]: {
    usd: number;
  };
};

export function useCoinGeckoPrice(tokenIds: string[]) {
  const tokenIdsString = tokenIds.join(",");

  return useQuery<CoinGeckoPriceResponse>({
    queryKey: ["coinGeckoPrice", tokenIdsString],
    queryFn: async () => {
      if (!tokenIdsString) return {}; // Prevent unnecessary API calls
      const chainId = 1;
      const buyToken = 1;
      const sellToken = 2;
      const sellAmount = 234;
      const response = await fetch(
        `https://api.0x.org/swap/permit2/price?ids=${tokenIdsString}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch token prices");
      }

      return response.json();
    },
    enabled: tokenIds.length > 0, // Fetch only when tokens exist
    staleTime: 60 * 1000, // Cache data for 1 minute before refetching
    refetchOnWindowFocus: false, // Prevent auto-refetch when switching tabs
  });
}
