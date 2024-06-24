import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export const DEFAULT_PFP_URL = "/dwr.png";

export type PreviewMode =
    | "timeline-web"
    | "expanded-web"
    | "timeline-mobile"
    | "expanded-mobile";

export type CastState = {
    pfpOverride: string;
    displayNameOverride: string;
    usernameOverride: string;
    activeBadgeOverride: boolean;
    ago: string;
    liked: boolean;
    recasted: boolean;
    bookmarked: boolean;
    imageEmbeds: string[];
    castText: string;
    replyCount: number;
    likeCount: number;
    channelName?: string;
    replies?: CastState[];
    user?: SearchedUser;
};

export type CastType = "root-cast" | "reply" | "quoted-cast" | "nested-reply";

export const CAST_STATE_DEFAULT: CastState = {
    ago: "1h",
    bookmarked: false,
    activeBadgeOverride: true,
    castText: "",
    displayNameOverride: "Dan Romero",
    imageEmbeds: [],
    liked: false,
    pfpOverride: DEFAULT_PFP_URL,
    recasted: false,
    usernameOverride: "dwr",
    user: undefined,
    replyCount: 69,
    likeCount: 420,
    channelName: "degen",
    replies: [],
};
