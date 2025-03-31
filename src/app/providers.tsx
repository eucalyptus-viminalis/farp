"use client";

import sdk, { Context } from "@farcaster/frame-sdk";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  const [context, setContext] = useState<Context.FrameContext | undefined>();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      console.log("trying to load sdk");
      const ctx = await sdk.context;
      console.log("await sdk.context: ", JSON.stringify(ctx, null, 2));
      setContext(ctx);
      if (ctx) {
        setIsSDKLoaded(true);
        sdk.actions.ready();
      }
    };
    if (sdk && !isSDKLoaded) {
      load();
    }
  }, [isSDKLoaded]);
  // only add provider if context loaded?
  return (
    <>
      {context ? <WagmiBaseProvider>{children}</WagmiBaseProvider> : children}
    </>
  );
}
