// import Ago from "./ago/Ago";
// import Kebab from "../app/Kebab";
// import Username from "./username/Username";
// import DisplayName from "./display-name/DisplayName";
// import UsernameWorkingBefore from "./username/UsernameWorkingBefore";

import Kebab from "@/app/Kebab";
import Ago from "./ago/Ago";
import DisplayName from "./display-name/DisplayName";
// import Username from "./username/Username";
import UsernameWorkingBefore from "./username/UsernameWorkingBefore";
import Username from "./username/Username-v1";

type CastHeaderProps = {
    asEmbed?: boolean;
    ago: string;
};

export default function CastHeader(props: CastHeaderProps) {
    const { asEmbed, ago } = props;

    // TODO
    if (asEmbed) {
        return (
            <div className="flex h-[20px] min-w-0 flex-1 shrink flex-row items-center gap-1">
                <span className="relative h-min w-auto" data-state="closed">
                    <a
                        href="/pauline-unik"
                        title=""
                        className="relative truncate text-sm font-semibold text-default hover:underline"
                    >
                        Pauline Unik 🌶️
                    </a>
                </span>
                {/* <Username asEmbed /> */}
                <UsernameWorkingBefore asEmbed />
                <div className="text-muted">
                    <span className="text-sm">·</span>
                </div>
                <div className="text-muted">
                    <span className="text-sm">{ago}</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-row justify-between gap-2">
                <div className="flex min-w-0 flex-1 shrink flex-row items-baseline gap-1">
                    <DisplayName/>
                    {/* <Username /> */}
                    <Username />
                    {/* <UsernameWorkingBefore /> */}
                    <div className="text-muted">·</div>
                    <Ago />
                </div>
                <Kebab />
            </div>
        );
    }
}
