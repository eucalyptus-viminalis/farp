import { EmbeddedCast, SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export const DEFAULT_PFP_URL = "/dwr.png";

export type Embed = EmbeddedCast

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
    embeds: Embed[]
    castText: string;
    replyCount: number;
    likeCount: number;
    channelName?: string;
    castHash?: string
    replies?: CastState[];
    user?: SearchedUser;
};

export type CastType = "root-cast" | "reply" | "quoted-cast" | "nested-reply";

export const ROOT_CAST_DEFAULT: CastState = {
    ago: "3h",
    bookmarked: false,
    activeBadgeOverride: true,
    castText: "",
    displayNameOverride: "Dan Romero",
    imageEmbeds: [],
    embeds: [],
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

export const REPLY_DEFAULT: CastState = {
    ago: "2m",
    bookmarked: false,
    activeBadgeOverride: true,
    castText: "",
    displayNameOverride: "Vitalik Buterin",
    imageEmbeds: [],
    embeds: [],
    liked: false,
    pfpOverride: "https://i.imgur.com/IzJxuId.jpg",
    recasted: false,
    usernameOverride: "vitalik.eth",
    user: undefined,
    replyCount: 42,
    likeCount: 69,
    channelName: undefined,
    replies: [],
};

export const NESTED_REPLY_DEFAULT: CastState = {
    ago: "1m",
    bookmarked: false,
    activeBadgeOverride: true,
    castText: "",
    displayNameOverride: "Vitalik Buterin",
    imageEmbeds: [],
    embeds: [],
    liked: false,
    pfpOverride: "https://i.imgur.com/IzJxuId.jpg",
    recasted: false,
    usernameOverride: "vitalik.eth",
    user: undefined,
    replyCount: 42,
    likeCount: 69,
    channelName: undefined,
    replies: [],
};
