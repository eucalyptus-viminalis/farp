import { neynar_client } from "@/neynar/client";

const SEARCH_LIMIT = 10

export default async function getData(q: string) {
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