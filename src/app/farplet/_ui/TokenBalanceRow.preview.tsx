import { TokenBalance } from "@/contexts/FarpletContext";
import Image from "next/image";

type Props = {
  tokenBalance: TokenBalance;
  index: number;
};
export default function TokenBalanceRow(props: Props) {
  const { tokenBalance, index } = props;
  const i = index;

  // Get token logo
  const logoSrc = tokenBalance.logo
    ? tokenBalance.logo
    : ["eth", "usdc"].includes(tokenBalance.symbol?.toLowerCase() ?? "")
      ? `/${tokenBalance.symbol.toLowerCase()}.png`
      : null;

  return (
    <div
      key={i}
      className="flex flex-row gap-3 items-center justify-between w-full text-base py-2"
    >
      {/* token logo */}
      <div className="flex relative p-1 h-full flex-col justify-center rounded-full overflow-visible items-center">
        {logoSrc && (
          <Image
            alt={"token-logo-" + i}
            src={logoSrc}
            width={48}
            height={48}
            className="object-contain object-center rounded-full"
          />
        )}
        {(tokenBalance.chainId == "base" ||
          tokenBalance.chainId == "solana") && (
          <Image
            alt={tokenBalance.name}
            className="absolute bg-black bottom-0 right-0 h-6 w-6 transform rounded-full border-black border-2 object-contain"
            // sizes="24px"
            width={32}
            height={32}
            src={`/${tokenBalance.chainId}.svg`}
            unoptimized
          />
        )}
      </div>
      {/* network logo */}
      <div className="flex flex-col gap-0 justify-center grow">
        <span className="">{tokenBalance.name}</span>
        <span className="text-gray-400">
          {parseFloat(tokenBalance.balance.toFixed(6)).toString() +
            " " +
            tokenBalance.symbol}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="px-2 text-base">
          {"$" + tokenBalance.usdBalance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
