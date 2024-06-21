import Navbar from "../../components/nav/Nav";
import { CastPreview } from "./CastPreview";
import { CastState } from "../edit/context";
import { useEffect, useState } from "react";
import { getData } from "./serverAction";
import { CastWithInteractions, EmbedUrl, EmbeddedCast, SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


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
    const { rootCast } = props;
    const { realCasts } = useRealCasts();
    const realCastShapes: CastState[] = realCasts.map(realCast => {
        return {
            activeBadgeOverride: realCast.author.power_badge,
            ago: timeAgo.format(new Date(realCast.timestamp), 'twitter-now'),
            bookmarked: false,
            castText: realCast.text,
            displayNameOverride: realCast.author.display_name ?? '',
            imageEmbeds: realCast.embeds.filter(isEmbedUrl).map(e=>e.url),
            likeCount: realCast.reactions.likes_count,
            liked: false,
            pfpOverride: realCast.author.pfp_url ?? './dwr.png',
            recasted: false,
            replyCount: realCast.replies.count,
            usernameOverride: realCast.author.username,
            channelName: realCast.channel?.name,
            user: realCast.author as SearchedUser,
        }
    })

    return (
        <>
            <Navbar />
            <CastPreview cast={rootCast} previewMode="timeline-web" />
            {realCastShapes.map((cast,i) => (                
                <CastPreview key={'cast-' + i} cast={cast} previewMode="timeline-web"/>
            ))}
        </>
    );
}

export default PreviewNode;
