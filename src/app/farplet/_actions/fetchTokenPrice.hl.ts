"use server";

import { appConfig } from "@/app/appConfig";

export async function fetchTokenPrice(tokenId: string): Promise<number | null> {
  try {
    const response = await fetch(
      `${appConfig.hostUrl}/api/token-info?symbol=${tokenId.toUpperCase()}`,
    );

    if (!response.ok) {
      console.error("failed to fetch token price @ fetchTokenPrice.hl.ts");
      throw new Error(`Failed to fetch token price for ${tokenId}`);
    }

    const data = await response.json();

    return data?.oraclePrice ?? null; // Return `oraclePrice` (or `markPrice` if needed)
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}
