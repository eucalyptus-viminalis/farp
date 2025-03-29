import StatsRow from "./StatsRow";
import LeftIcons from "./icons/LeftIcons";
import RightIcons from "./icons/RightIcons";

export default function BottomBar() {
  return (
    <div className="flex w-full flex-col items-start">
      <ActionRow />
      <StatsRow channelName="farcards" />
    </div>
  );
}

export function ActionRow() {
  return (
    <div className="ml-[-8px] flex w-full flex-row items-center justify-between">
      <LeftIcons />
      <RightIcons />
    </div>
  );
}
