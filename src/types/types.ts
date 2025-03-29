import { Reaction } from "@/components/dc/FullDC";
import {
  EmbeddedCast,
  SearchedUser,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";

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
  embeds: Embed[];
  castText: string;
  replyCount: number;
  likeCount: number;
  channelName?: string;
  castHash?: string;
  replies?: CastState[];
  user?: SearchedUser;
};

export type CastType = "root-cast" | "reply" | "quoted-cast" | "nested-reply";

export type DC = {
  txt: string;
  timeDisplay: string;
  isSelfDC: boolean;
  date?: string; // yyyy-mm-dd
  replyTo?: DC;
  reactions?: Reaction[];
  reaction?: string; // TODO: should use reactions instead
  imgSrc?: string;
};

export type Embed = EmbeddedCast;

export type PreviewMode =
  | "timeline-web"
  | "expanded-web"
  | "timeline-mobile"
  | "expanded-mobile";
