"use client";

import dynamic from "next/dynamic";
import { useFarcasterCtx } from "./_context/FarcasterCtx";

const WagmiBaseProvider = dynamic(
  () => import("@/app/_context/WagmiProvider"),
  {
    ssr: false,
  },
);

export function WagmiBaseProviderProviderLOL({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useFarcasterCtx();

  // Only mount wagmi inside a Farcaster host. Outside one the SDK still
  // "loads" but sdk.wallet.ethProvider is undefined, so frameConnector's
  // autoconnect throws RpcResponse.InternalErrorError in a plain browser.
  return (
    <>
      {state.isSdkLoaded && state.farcasterContext ? (
        <WagmiBaseProvider>{children}</WagmiBaseProvider>
      ) : (
        children
      )}
    </>
  );
}
