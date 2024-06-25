"use client";

import TimelineWebNavBarHome from "./nav/Nav";
import { CastPreview } from "./cast/CastPreview";
import { CastState } from "@/types/types";
import { useContext, useEffect, useState } from "react";
import { getTrendingCasts } from "../app/serverAction";
import {
    CastWithInteractions,
    EmbedUrl,
    EmbeddedCast,
    SearchedUser,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { EditContext } from "@/contexts/EditContext";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const useRealCasts = () => {
    const [realCasts, setRealCasts] = useState<CastWithInteractions[]>([]);

    // Fetch real casts and update state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTrendingCasts();
                setRealCasts(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return { realCasts };
};

function isEmbedUrl(embed: EmbeddedCast): embed is EmbedUrl {
    return (embed as EmbedUrl).url !== undefined;
}

export default function TimelineWebPreview() {
    // Context
    const con = useContext(EditContext);
    const rootCast = con.state.rootCast;

    // Hooks
    const { realCasts } = useRealCasts();

    const realCastShapes: CastState[] = realCasts.map((realCast) => {
        return {
            activeBadgeOverride: realCast.author.power_badge,
            ago: timeAgo.format(new Date(realCast.timestamp), "twitter-now"),
            bookmarked: false,
            castText: realCast.text,
            displayNameOverride: realCast.author.display_name ?? "",
            imageEmbeds: realCast.embeds.filter(isEmbedUrl).map((e) => e.url),
            likeCount: realCast.reactions.likes_count,
            liked: false,
            pfpOverride: realCast.author.pfp_url ?? "./dwr.png",
            recasted: false,
            replyCount: realCast.replies.count,
            usernameOverride: realCast.author.username,
            channelName: realCast.channel?.name,
            user: realCast.author as SearchedUser,
        };
    });

    return (
        <>
            {/* 
<main
className="h-full w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]"
>
    <div className="w-full h-full">
        <div className="h-full min-h-screen border-default sm:border-x"> */}
            {/* Mode buttons */}
            <TimelineWebNavBarHome />
            {/* Root cast */}
            <CastPreview
                cast={rootCast}
                previewMode={"timeline-web"}
                castType="root-cast"
            />
            {realCastShapes.map((cast, i) => (
                <CastPreview
                    key={"cast-" + i}
                    castType="root-cast"
                    cast={cast}
                    previewMode="timeline-web"
                />
            ))}
        </>
    );
}
