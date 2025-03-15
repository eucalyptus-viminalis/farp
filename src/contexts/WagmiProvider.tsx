import { frameConnector } from "@/lib/frameConnector";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [frameConnector()],
});

// const queryClient = new QueryClient();

export default function WagmiBaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      {/* <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider> */}
      {children}
    </WagmiProvider>
  );
}
