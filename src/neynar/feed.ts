import { neynar_client } from "@/neynar/client";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";

// Neynar removed /v2/farcaster/feed/trending, which the SDK's fetchTrendingFeed
// still points at (it 404s). Pull from a spread of busy channels instead — same
// cast shape, and it only needs the free-tier feed/channels route.
const FEED_CHANNELS = ["farcaster", "base", "memes", "founders", "art"];

export async function getRecentCasts(limit: number): Promise<CastWithInteractions[]> {
    try {
        const res = await neynar_client.fetchFeedByChannelIds(FEED_CHANNELS, {
            withRecasts: false,
            withReplies: false,
            limit,
        });
        return res.casts ?? [];
    } catch (error) {
        // Never let a third-party outage throw: callers .map() over this, and a
        // rejected server action surfaces in the browser as an undefined result.
        console.error("Failed to fetch casts from Neynar:", error);
        return [];
    }
}
