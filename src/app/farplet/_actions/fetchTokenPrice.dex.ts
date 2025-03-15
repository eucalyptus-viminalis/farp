"use server";

export async function fetchTokenPrice(
  chainId: string,
  tokenAddress: string,
): Promise<number | null> {
  console.log("@fetchTokenPrice.dex");
  try {
    const response = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch token price for ${tokenAddress}`);
    }

    const data = await response.json();
    const pair = data[0];
    return pair?.priceUsd ? Number(pair.priceUsd) : null; // Return price or null if not found
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}
