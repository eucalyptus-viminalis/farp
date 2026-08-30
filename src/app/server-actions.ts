'use server'

import { neynar_client } from "@/neynar/client"
import { getRecentCasts } from "@/neynar/feed"

const SEARCH_LIMIT = 10

export async function searchChannel(q: string) {
    try {
        const res = await neynar_client.searchChannels(q)
        return res.channels ?? []
    } catch (error) {
        // Callers render .map() over this, so a throw/undefined here takes the
        // page down rather than degrading to an empty result list.
        console.error("Channel search failed:", error)
        return []
    }
}

export async function searchUser(q: string) {
    try {
        const res = await neynar_client.searchUser(q, undefined, {
            limit: SEARCH_LIMIT,
        })
        return res.result?.users ?? []
    } catch (error) {
        console.error("User search failed:", error)
        return []
    }
}

export async function getTrendingCasts(limit = SEARCH_LIMIT) {
    return getRecentCasts(limit)
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

