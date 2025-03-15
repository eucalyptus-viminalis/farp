import { TokenBalance } from "@/contexts/FarpletContext";
import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { CrossIcon, X } from "lucide-react";
import Image from "next/image";
import { useFarplet } from "../_hooks/useFarplet";
import USDBalance from "./USDBalance.edit";
import TokenBalanceEditable from "./TokenBalanceEditable.edit";

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
        <div className="flex flex-row gap-2 justify-start items-center">
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
