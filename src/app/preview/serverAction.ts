'use server'

import { neynar_client } from "@/neynar/client"
import { TrendingFeedTimeWindow } from "@neynar/nodejs-sdk/build/neynar-api/common/constants"

const SEARCH_LIMIT = 10

export async function getData(limit = SEARCH_LIMIT) {
    const res = await neynar_client.fetchTrendingFeed({
        // channelId,
        // cursor,
        limit,
        timeWindow: TrendingFeedTimeWindow.TWENTY_FOUR_HOUR,
        // viewerFid,
    })
    return res.casts
}