"use client";

import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

export interface FarpletContextType {
  state: FarpletState;
  dispatch: Dispatch<FarpletAction>;
}
export const FarpletContext = createContext<FarpletContextType>(
  {} as FarpletContextType,
);

export type TokenInfo = {
  name: string;
  symbol: string;
  isNativeToken: boolean;
  logo?: string;
  chainId?: "base" | "solana"; // dexscreener chainIds
  header?: string;
  coinGeckoId?: string;
  networkLogo?: string;
  address?: string;
  decimals?: number;
  price?: string | null; // Added Hyperliquid price field
  marketCap?: number;
  liquidity?: number;
  pairCreatedAt?: number;
  infoFrom: "dexscreener" | "hyperliquid";
};
export type TokenBalance = {
  name: string;
  balance: number;
  symbol: string;
  usdBalance: number;
  isNativeToken: boolean;
  logo?: string;
  chainId?: "base" | "solana"; // dexscreener chainIds
  header?: string;
  coinGeckoId?: string;
  networkLogo?: string;
  address?: string;
  decimals?: number;
};

export interface FarpletState {
  totalUsdBalance: number;
  pfpOverride: string;
  tokenBalances: TokenBalance[];
  notiCount: number;
  dcCount: number;
  user?: SearchedUser;
  addy: string;
}

const initialETHBalance: TokenBalance = {
  usdBalance: 2202.49,
  balance: 1.13,
  name: "Ethereum",
  networkLogo: "/base.jpg",
  coinGeckoId: "ethereum",
  isNativeToken: true,
  logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  symbol: "ETH",
  address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  chainId: "base",
  decimals: 18,
};
const initialUSDCBalance: TokenBalance = {
  usdBalance: 6239.12,
  balance: 6239.12,
  name: "USD Coin",
  coinGeckoId: "usd-coin",
  networkLogo: "/base.jpg",
  logo: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  isNativeToken: false,
  symbol: "USDC",
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  chainId: "base",
  decimals: 6,
};

const initialTokenBalances: TokenBalance[] = [
  initialETHBalance,
  initialUSDCBalance,
];

const initialState: FarpletState = {
  dcCount: 7,
  notiCount: 3,
  totalUsdBalance: 30609.7,
  pfpOverride: "/vitalik.jpeg",
  addy: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  tokenBalances: initialTokenBalances,
  user: undefined,
};
// {
//   symbol: "USDC",
//   name: "USD Coin",
//   image:
//     "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
//   address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
//   decimals: 6,
// },
export type FarpletAction =
  | { type: "SET_USER"; payload: { user: SearchedUser } }
  | { type: "SET_DC_COUNT"; payload: { dcCount: number } }
  | { type: "SET_NOTI_COUNT"; payload: { notiCount: number } }
  | { type: "SET_TOTAL_USD_BALANCE"; payload: { totalUsdBalance: number } }
  | { type: "ADD_TOKEN_BALANCE"; payload: { tokenBalance: TokenBalance } }
  | {
      type: "UPDATE_TOKEN_BALANCE";
      payload: { tokenBalance: TokenBalance; index: number };
    }
  | { type: "DELETE_TOKEN_BALANCE"; payload: { index: number } }
  | { type: "RESET_TOKEN_BALANCE"; payload: true }
  | { type: "ADD_ETH"; payload: true }
  | { type: "ADD_USDC"; payload: true }
  | { type: "OVERRIDE_PFP"; payload: { pfpOverride: string } }
  | { type: "OVERRIDE_ADDY"; payload: { addy: string } };

const reducer = (state: FarpletState, action: FarpletAction): FarpletState => {
  const { payload, type } = action;
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload.user,
        pfpOverride: payload.user.pfp_url ?? "/vitalik.jpeg",
      };

    case "SET_DC_COUNT":
      return {
        ...state,
        dcCount: payload.dcCount,
      };

    case "SET_NOTI_COUNT":
      return {
        ...state,
        notiCount: payload.notiCount,
      };

    case "SET_TOTAL_USD_BALANCE":
      return {
        ...state,
        totalUsdBalance: payload.totalUsdBalance,
      };

    case "ADD_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalances: [...state.tokenBalances, payload.tokenBalance],
      };

    case "UPDATE_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalances: state.tokenBalances.map((token, index) =>
          index === payload.index ? payload.tokenBalance : token,
        ),
      };

    case "DELETE_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalances: state.tokenBalances.filter(
          (_, i) => i !== payload.index,
        ),
      };

    case "RESET_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalances: initialTokenBalances,
      };
    case "ADD_ETH":
      return {
        ...state,
        tokenBalances: [...state.tokenBalances, initialETHBalance],
      };
    case "ADD_USDC":
      return {
        ...state,
        tokenBalances: [...state.tokenBalances, initialUSDCBalance],
      };

    case "OVERRIDE_PFP":
      return { ...state, pfpOverride: payload.pfpOverride };

    case "OVERRIDE_ADDY":
      return { ...state, addy: payload.addy };

    default:
      return state;
  }
};

export const FarpletProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FarpletContext.Provider value={{ state, dispatch }}>
      {children}
    </FarpletContext.Provider>
  );
};
