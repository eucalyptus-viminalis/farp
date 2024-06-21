import { neynar_client } from "@/neynar/client";
import { TrendingFeedTimeWindow } from "@neynar/nodejs-sdk/build/neynar-api/common/constants";
import { NextRequest } from "next/server";

async function getData() {
    const res = await neynar_client.fetchTrendingFeed({
        // channelId,
        // cursor,
        // limit,
        timeWindow: TrendingFeedTimeWindow.TWENTY_FOUR_HOUR,
        // viewerFid,
    })
    return res.casts
}

export async function GET(req:NextRequest) {
    const data = await getData()

    return new Response(JSON.stringify(data), {status: 200, headers:{'content-type':'application/json'}})
}