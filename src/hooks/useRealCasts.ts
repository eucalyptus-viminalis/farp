import { timeAgo } from "@/timeago";

import { getTrendingCasts } from "@/app/serverAction";
import { CastState } from "@/types/types";
import { EmbedCastId, EmbedUrl, EmbeddedCast, SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useState, useEffect } from "react";

export function isEmbedUrl(embed: EmbeddedCast): embed is EmbedUrl {
    return (embed as EmbedUrl).url !== undefined;
}
export function isEmbedCastId(embed: EmbeddedCast): embed is EmbedCastId {
    return (embed as EmbedCastId).cast_id !== undefined;
}

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
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }
    const shuffleCasts = () => {
        setTrendingCasts(shuffleArray([...trendingCasts]));
    };

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
                        imageEmbeds: [],
                        embeds: realCast.embeds,
                        likeCount: realCast.reactions.likes_count,
                        liked: false,
                        pfpOverride: realCast.author.pfp_url ?? "./dwr.png",
                        recasted: false,
                        replyCount: realCast.replies.count,
                        usernameOverride: realCast.author.username,
                        channelName: realCast.channel?.name,
                        user: realCast.author as SearchedUser,
                        castHash: realCast.hash
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

