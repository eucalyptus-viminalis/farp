'use server'

import { neynar_client } from "@/neynar/client"
import { TrendingFeedTimeWindow } from "@neynar/nodejs-sdk/build/neynar-api/common/constants"

const SEARCH_LIMIT = 10

export async function searchChannel(q: string) {
    const res = await neynar_client.searchChannels(
        q
    )
    // res.result.users
    return res.channels
    
}

export async function searchUser(q: string) {
    const res = await neynar_client.searchUser(
        q,
        undefined,
        {
            // cursor,
            limit: SEARCH_LIMIT,
        }
    )
    // res.result.users
    return res.result.users
    
}

export async function getTrendingCasts(limit = SEARCH_LIMIT) {
    const res = await neynar_client.fetchTrendingFeed({
        // channelId,
        // cursor,
        limit,
        timeWindow: TrendingFeedTimeWindow.TWENTY_FOUR_HOUR,
        // viewerFid,
    })
    return res.casts
}

// Function to get the content type of a URL
export async function getContentType(url: string) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.headers.get("content-type");
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

