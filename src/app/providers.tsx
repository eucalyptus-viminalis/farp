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

  // only add provider if context loaded?
  return (
    <>
      {state.isSdkLoaded ? (
        <WagmiBaseProvider>{children}</WagmiBaseProvider>
      ) : (
        children
      )}
    </>
  );
}
