import { frameConnector } from "@/lib/frameConnector";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [frameConnector()],
});

export default function WagmiBaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
