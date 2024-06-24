"use client";

import TimelineWebNavBarHome from "../../components/nav/Nav";
import { CastPreview } from "../../components/cast/CastPreview";
import { CastState, PreviewMode } from "@/types/types";
import { useEffect, useState } from "react";
import { getData } from "./serverAction";
import {
    CastWithInteractions,
    EmbedUrl,
    EmbeddedCast,
    SearchedUser,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ActionButton from "@/components/button/ActionButton";
import { ConvoWebNavBar } from "@/components/nav/ConvoWebNavBar";
import TimelineWebPreview from "./TimelineWebPreview";
import ExpandedWebPreview from "./ExpandedWebPreview";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

type PreviewNodeProps = {
    rootCast: CastState;
};

const useRealCasts = () => {
    const [realCasts, setRealCasts] = useState<CastWithInteractions[]>([]);

    // Fetch real casts and update state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
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

function PreviewNode(props: PreviewNodeProps) {
    // Props
    const { rootCast } = props;
    // States
    const [previewMode, setPreviewMode] = useState<PreviewMode>("timeline-web");
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

    const handleOnClick = (previewMode: PreviewMode) => {
        setPreviewMode(previewMode);
    };

    return (
        <>
{/* 
<main
className="h-full w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]"
>
    <div className="w-full h-full">
        <div className="h-full min-h-screen border-default sm:border-x"> */}
            {/* Mode buttons */}
            <div
                className="
                    flex
                    justify-center
                    p-2
                "
            >
                <ActionButton
                    handleOnClick={() => handleOnClick("timeline-web")}
                    withBg={previewMode === "timeline-web"}
                >
                    {`Timeline (Web)`}
                </ActionButton>
                <ActionButton
                    handleOnClick={() => handleOnClick("expanded-web")}
                    withBg={previewMode === "expanded-web"}
                >
                    {`Expanded (Web)`}
                </ActionButton>
            </div>
            {previewMode === 'timeline-web' && (
                <TimelineWebPreview/>
            )}
            {previewMode === 'expanded-web' && (
                // <ConvoWebNavBar />
                <ExpandedWebPreview/>
            )}
            {/* Root cast */}
            {/* <CastPreview
                cast={rootCast}
                previewMode={previewMode}
                castType="root-cast"
            /> */}
        </>
    );
}

export default PreviewNode;
