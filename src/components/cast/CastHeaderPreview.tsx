import Kebab from "./icons/Kebab";
import AgoPreview from "./ago/AgoPreview";
import DisplayNamePreview from "./display-name/DisplayNamePreview";
import Username from "./username/Username";
import UsernamePreview from "./username/UsernamePreview";

type CastHeaderProps = {
    displayName: string;
    activeBadge?: boolean;
    username: string;
    ago: string;
    asEmbed?: boolean;
};

export default function CastHeaderPreview(props: CastHeaderProps) {
    const { asEmbed, displayName, username, ago, activeBadge } = props;

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
                <Username asEmbed />
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
                    <DisplayNamePreview
                        displayName={displayName}
                        activeBadge={activeBadge}
                    />
                    <UsernamePreview username={username} />
                    <div className="text-muted">·</div>
                    <AgoPreview ago={ago} />
                </div>
                <Kebab />
            </div>
        );
    }
}
