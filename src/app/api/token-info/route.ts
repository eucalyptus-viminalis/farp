import { NextResponse } from "next/server";

export type HyperliquidPriceResponse = {
  symbol: string; // Crypto symbol (e.g., "ETH", "BTC", "SOL")
  markPrice: number; // Hyperliquid's internal trading price
  oraclePrice: number; // External aggregated price (more stable)
  openInterest: number; // Market open interest (number of contracts open)
  prevDayPrice: number; // Previous day's price
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol")?.toUpperCase();

  if (!symbol) {
    return NextResponse.json(
      { error: "Missing 'symbol' query parameter" },
      { status: 400 },
    );
  }

  try {
    // Fetch data from Hyperliquid API
    const response = await fetch("https://api.hyperliquid.xyz/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "metaAndAssetCtxs" }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Hyperliquid");
    }

    const data = await response.json();
    // Extract metadata from `data[0].universe`
    const assetIndex = data[0].universe.findIndex(
      (asset: any) => asset.name === symbol,
    );

    // If the symbol is not found in the universe
    if (assetIndex === -1) {
      return NextResponse.json(
        { error: `Asset '${symbol}' not found` },
        { status: 404 },
      );
    }

    // Get the corresponding price data from `data[1]`
    const assetPriceData = data[1][assetIndex];

    return NextResponse.json({
      symbol,
      markPrice: parseFloat(assetPriceData.markPx), // Hyperliquid's internal trading price
      oraclePrice: parseFloat(assetPriceData.oraclePx), // External aggregated price
      openInterest: parseFloat(assetPriceData.openInterest), // Market open interest
      prevDayPrice: parseFloat(assetPriceData.prevDayPx), // Previous day's price
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
