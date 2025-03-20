"use client";
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
    body: JSON.stringify({ type: "allMids" }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Hyperliquid prices");
  }

  const data: Record<string, string> = await response.json();

  // Convert string prices to numbers
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, parseFloat(value)]),
  );
}

export function useAllMids(q: string) {
  return useQuery<Record<string, number>>({
    queryKey: ["hlAllMids", q],
    queryFn: async () => {
      const allPrices = await fetchHyperliquidPrices();
      return Object.fromEntries(
        Object.entries(allPrices).filter(([key]) =>
          q ? key.toLowerCase().includes(q.toLowerCase()) : true,
        ),
      );
    },
    staleTime: 60 * 1000, // Cache data for 1 minute before refetching
    refetchOnWindowFocus: false, // Prevent auto-refetch when switching tabs
  });
}
