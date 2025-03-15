"use server";

export async function fetchTokenPrice(tokenId: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch token price for ${tokenId}`);
    }

    const data = await response.json();
    return data?.[tokenId]?.usd ?? null; // Return price or null if not found
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}
