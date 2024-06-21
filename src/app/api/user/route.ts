import { NextRequest, NextResponse } from "next/server";
import getData from "./data";

export async function GET(req: NextRequest, res: NextResponse) {
    const q = req.nextUrl.searchParams.get('q')
    if (!q) return new Response('missing params: q', {status:400})
    const data = await getData(q)
    return new Response(JSON.stringify(data), {
        headers: {'content-type':'application/json'},
        status: 200
    })
}