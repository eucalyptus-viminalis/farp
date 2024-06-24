import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ConvoRootCast from "./ConvoRootCast";
import { ActionRow } from "@/components/cast/BottomBar";
import StatsRow from "@/components/cast/stats/StatsRow.preview";
import ReplyCard from "./ReplyCard";
import ReplyCast from "./ReplyCast";
import { CastState } from "@/types/types";
import NestedReplyCast from "./NestedReplyCast";

const exampleReply: CastState = {
    activeBadgeOverride: true,
    ago: "2d",
    bookmarked: false,
    castText: "ironically the reason venmo took off is bc it was public",
    displayNameOverride: "Matthew",
    imageEmbeds: [],
    likeCount: 153,
    liked: false,
    pfpOverride:
        "https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=144/https%3A%2F%2Fi.imgur.com%2FuwD4rUh.jpg",
    recasted: false,
    replyCount: 3,
    usernameOverride: "matthew",
    channelName: undefined,
    user: undefined,
};
const exampleReply2: CastState = {
    activeBadgeOverride: true,
    ago: "2d",
    bookmarked: false,
    castText:
        "What privacy would you like to see? Run through a mixer by default ?",
    displayNameOverride: "Samuel",
    imageEmbeds: [],
    likeCount: 1,
    liked: false,
    pfpOverride:
        "https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=144/https%3A%2F%2Fi.imgur.com%2FOHMozjv.jpg",
    recasted: false,
    replyCount: 0,
    usernameOverride: "samuellhuber",
    channelName: undefined,
    user: undefined,
};
const exampleNestedReply: CastState = {
    activeBadgeOverride: false,
    ago: "1d",
    bookmarked: false,
    castText:
        "Are you sure? They provide a “private” option which is pretty popular from my experience",
    displayNameOverride: "c-node",
    imageEmbeds: [],
    likeCount: 153,
    liked: false,
    pfpOverride:
        "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/8fde65c5-824f-4d29-10ac-94ac0d44bb00/w=72,h=72,fit=cover,anim=false",
    recasted: false,
    replyCount: 3,
    usernameOverride: "colludingnode",
    channelName: undefined,
    user: undefined,
};

const exampleNestedReply2: CastState = {
    activeBadgeOverride: true,
    ago: "1d",
    bookmarked: false,
    castText: "unironically\n\nftfy",
    displayNameOverride: "dawufi",
    imageEmbeds: [],
    likeCount: 153,
    liked: false,
    pfpOverride:
        "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/dcea4fdb-e4c0-4fcb-a5d0-bd0afff1b800/w=72,h=72,fit=cover,anim=false",
    recasted: false,
    replyCount: 3,
    usernameOverride: "dawufi",
    channelName: undefined,
    user: undefined,
};

export default function ConvoPage() {
    return (
        <main className="h-full w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]">
            <div className="h-full w-full">
                <div className="h-full min-h-screen border-default sm:border-x">
                    <ConvoWebNavBar />
                    <div className="fade-in">
                        {/* Root cast */}
                        <ConvoRootCast />
                        {/* First Reply */}
                        <ReplyCast cast={exampleReply} />
                        <NestedReplyCast cast={exampleNestedReply} />
                        <NestedReplyCast
                            cast={exampleNestedReply2}
                            lastToDisplay
                        />
                        <ReplyCast
                            cast={exampleReply2}
                            lastIndex
                            lastToDisplay
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

const ConvoWebNavBar = () => {
    return (
        <nav className="sticky top-0 z-10 flex-col border-b-0 bg-app border-default sm:border-b sm:border-b-0">
            <div className="hidden sm:flex sm:px-4 h-14 flex-row items-center justify-between">
                <h2 className="font hidden flex-row items-center text-center text-xl font-bold decoration-0 sm:flex sm:text-left">
                    <div className="mr-1 flex cursor-pointer flex-col items-center justify-center rounded-full p-2 hover:bg-overlay-faint">
                        <ArrowLeftIcon />
                    </div>
                    Conversation
                </h2>
                <div className="hidden sm:block">
                    <button className="rounded-lg font-semibold disabled:opacity-50 bg-action text-light px-4 py-2 text-sm">
                        Cast
                    </button>
                </div>
            </div>
        </nav>
    );
};
