"use client";

import TimelineWebNavBarHome from "./nav/Nav";
import { CastPreview } from "./cast/CastPreview";
import { CastState } from "@/types/types";
import { useContext, useEffect, useMemo, useState } from "react";
import { getTrendingCasts } from "../app/serverAction";
import {
    EmbedUrl,
    EmbeddedCast,
    SearchedUser,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { EditContext } from "@/contexts/EditContext";
import { GlobalContext } from "@/contexts/GlobalContext";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const useRealCasts = () => {
    const [trendingCasts, setTrendingCasts] = useState<CastState[]>([]);

    function shuffleArray<T>(array: T[]): T[] {
        let currentIndex = array.length, randomIndex;
    
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
    
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }
    const shuffleCasts = () => {
        setTrendingCasts(shuffleArray([...trendingCasts]))
    }

    // Fetch real casts and update state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTrendingCasts();
                const realCastShapes: CastState[] = result.map((realCast) => {
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
                setTrendingCasts(realCastShapes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return { realCasts: trendingCasts, shuffleCasts };
};

function isEmbedUrl(embed: EmbeddedCast): embed is EmbedUrl {
    return (embed as EmbedUrl).url !== undefined;
}

export default function TimelineWebPreview() {
    // Context
    const con = useContext(EditContext);
    const rootCast = con.state.rootCast;
    const globalCx = useContext(GlobalContext)
    return (
        <>
            {/* 
<main
className="h-full w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]"
>
    <div className="w-full h-full">
        <div className="h-full min-h-screen border-default sm:border-x"> */}
            {/* Mode buttons */}
            <button onClick={globalCx.shuffleCasts} className="pl-2 mb-2 text-[var(--yellow-9)]">Shuffle Casts</button>
            <TimelineWebNavBarHome />
            {/* Root cast */}
            <CastPreview
                cast={rootCast}
                previewMode={"timeline-web"}
                castType="root-cast"
            />
            {(!globalCx.trendingCasts || globalCx.trendingCasts.length === 0) && (
                <span className="pl-2">Loading trending casts...</span>
            )}
            {globalCx.trendingCasts.map((cast, i) => (
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
