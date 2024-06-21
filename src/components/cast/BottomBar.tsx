import LeftIcons from "@/app/LeftIcons";
import StatsRow from "../../app/StatsRow";
import RightIcons from "@/app/RightIcons";

export default function BottomBar() {
    return (
        <div className="flex w-full flex-col items-start">
            <ActionRow />
            <StatsRow
                channelName="farcards"
            />
        </div>
    );
}

export function ActionRow() {
    return (
        <div
        className="ml-[-8px] flex w-full flex-row items-center justify-between" 
        >
            <LeftIcons/>
            <RightIcons/>
        </div>
    )
}