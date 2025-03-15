import { TokenBalance } from "@/contexts/FarpletContext";
import Image from "next/image";

type Props = {
  tokenBalance: TokenBalance;
  index: number;
};
export default function TokenBalanceRow(props: Props) {
  const { tokenBalance, index } = props;
  const i = index;
  return (
    <div
      key={i}
      className="flex h-[100px] flex-row gap-3 items-center justify-between w-full text-xl p-2"
    >
      {/* token logo */}
      <div className="flex h-full flex-col justify-center items-center">
        <Image
          alt={"token-logo-" + i}
          src={tokenBalance.logo}
          width={64}
          height={64}
          // objectFit={ ''}
          // fill
          className="object-contain object-center"
        />
      </div>
      {/* network logo */}
      <div className="flex flex-col justify-center grow">
        <span>{tokenBalance.name}</span>
        <span className="text-gray-400">
          {parseFloat(tokenBalance.balance.toFixed(6)).toString() +
            " " +
            tokenBalance.symbol}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="px-4 text-xl">
          {"$" + tokenBalance.usdBalance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
