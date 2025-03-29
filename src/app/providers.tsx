"use client";

import sdk, { Context } from "@farcaster/frame-sdk";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";
import { DCEditProvider } from "./_context/DCEditContext";
import { EditProvider } from "./_context/EditContext";
import { FarpletProvider } from "./_context/FarpletContext";
import { GlobalContextProvider } from "./_context/GlobalContext";
import MyQueryClientProvider from "./_context/QueryContext";

const WagmiBaseProvider = dynamic(
  () => import("@/app/_context/WagmiProvider"),
  {
    ssr: false,
  },
);

export function Providers({ children }: { children: React.ReactNode }) {
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

  const InnerProviders = ({ children }: { children: ReactNode }) => (
    <MyQueryClientProvider>
      <GlobalContextProvider>
        <EditProvider>
          <DCEditProvider>
            <FarpletProvider>{children}</FarpletProvider>
          </DCEditProvider>
        </EditProvider>
      </GlobalContextProvider>
    </MyQueryClientProvider>
  );

  return context ? (
    <WagmiBaseProvider>
      <InnerProviders>{children}</InnerProviders>
    </WagmiBaseProvider>
  ) : (
    <InnerProviders>{children}</InnerProviders>
  );
}
