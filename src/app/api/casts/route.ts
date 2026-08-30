import { getRecentCasts } from "@/neynar/feed";
import { NextRequest } from "next/server";

// Fetched per-request: prerendering this at build time made a Neynar outage
// fail the whole production build.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const data = await getRecentCasts(25)

    return new Response(JSON.stringify(data), {status: 200, headers:{'content-type':'application/json'}})
}
