import { NowRequest, NowResponse } from "@vercel/node";
import { getNowPlaying } from "../lib/spotify";

export default async function nowPlaying(_: NowRequest, res: NowResponse) {
    const nowPlaying = await getNowPlaying();
    const externalUrl = nowPlaying.externalUrl;

    // redirect to the external URL
    console.log(`Redirecting to ${externalUrl}`);
    return res.redirect(externalUrl)
}
