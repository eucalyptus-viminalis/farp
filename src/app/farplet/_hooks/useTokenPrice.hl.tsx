import { useQuery } from "@tanstack/react-query";

export type HyperliquidPriceResponse = {
  markPx: string; // Hyperliquid's mark price
  oraclePx: string; // Oracle price (more stable)
  name: string; // Token name (e.g., ETH, BTC)
};

export async function fetchHyperliquidPrices(): Promise<
  Record<string, number>
> {
  const response = await fetch("https://api.hyperliquid.xyz/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "metaAndAssetCtxs" }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Hyperliquid prices");
  }

  const data = await response.json();

  // Extract token prices
  const assetData = data[1]; // The second part of the response contains asset prices
  const prices: Record<string, number> = {};

  assetData.forEach((asset: HyperliquidPriceResponse) => {
    if (asset.name) {
      prices[asset.name] = parseFloat(asset.oraclePx); // Use oracle price for stability
    }
  });

  return prices;
}

export function useHyperliquidPrices(tokenIds: string[]) {
  return useQuery<Record<string, number>>({
    queryKey: ["hyperliquidPrice", tokenIds.join(",")],
    queryFn: async () => {
      const allPrices = await fetchHyperliquidPrices();
      return Object.fromEntries(
        Object.entries(allPrices).filter(([key]) => tokenIds.includes(key)),
      );
    },
    enabled: tokenIds.length > 0, // Fetch only if tokens exist
    staleTime: 60 * 1000, // Cache data for 1 minute before refetching
    refetchOnWindowFocus: false, // Prevent auto-refetch when switching tabs
  });
}
