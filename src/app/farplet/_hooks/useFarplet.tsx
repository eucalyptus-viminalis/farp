"use client";

import { FarpletContext } from "@/contexts/FarpletContext";
import { useContext } from "react";

export function useFarplet() {
  const { dispatch, state } = useContext(FarpletContext);

  // Function to calculate total USD balance
  const totalBalanceUSD = () => {
    return state.tokenBalances.reduce(
      (acc, token) => acc + token.usdBalance,
      0,
    );
  };

  return { state, dispatch, totalBalanceUSD };
}
