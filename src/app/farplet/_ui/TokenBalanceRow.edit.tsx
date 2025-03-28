import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useFarplet } from "../_hooks/useFarplet";
import USDBalance from "./USDBalance.edit";
import TokenBalanceEditable from "./TokenBalanceEditable.edit";
import { TokenBalance } from "@/app/_context/FarpletContext";

type Props = {
  tokenBalance: TokenBalance;
  index: number;
};
export default function TokenBalanceRow(props: Props) {
  const { state, dispatch } = useFarplet();
  const { tokenBalance, index } = props;
  const deleteTokenBalance = () => {
    dispatch({
      type: "DELETE_TOKEN_BALANCE",
      payload: {
        index,
      },
    });
  };
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
      <div className="flex relative h-full p-1 flex-col justify-center rounded-full overflow-visible items-center">
        {logoSrc ? (
          <Image
            alt={"token-logo-" + i}
            src={logoSrc}
            width={48}
            height={48}
            className="object-fit object-center rounded-full"
          />
        ) : (
          <span className="bg-gray-700 text-gray-400">no image</span>
        )}
        {(tokenBalance.chainId == "base" ||
          tokenBalance.chainId == "solana") && (
          <Image
            alt={tokenBalance.name}
            className="absolute bg-black bottom-0 right-0 h-6 w-6 transform rounded-full border-white dark:border-black border-2 object-contain"
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
        <div className="flex flex-row gap-1 justify-start items-center">
          <span>{tokenBalance.name}</span>
          <div
            className="flex p-0.5 items-center justify-center hover:bg-yellow-500 hover:bg-opacity-30 rounded-full"
            title={`Remove ${tokenBalance.symbol}`}
          >
            <Cross2Icon
              className="inline hover:cursor-pointer"
              onClick={deleteTokenBalance}
              width={24}
              height={24}
              color="var(--yellow-9)"
            />
          </div>
        </div>
        <TokenBalanceEditable index={index} />
        {/* <div className="flex gap-2 flex-row">
          <span className="text-[var(--yellow-11)]">
            {parseFloat(tokenBalance.balance.toFixed(6)).toString()}
          </span>
          <span className="text-gray-400">{tokenBalance.symbol}</span>
        </div> */}
      </div>
      <USDBalance index={index} />
      {/* <div className="flex flex-col justify-center">
        <span className="px-4 text-[var(--yellow-11)] text-xl">
          {"$" + tokenBalance.usdBalance.toFixed(2)}
        </span>
      </div> */}
    </div>
  );
}
