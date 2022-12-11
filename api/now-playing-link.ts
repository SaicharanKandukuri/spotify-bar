import { VercelRequest, VercelResponse } from "@vercel/node";
import { getNowPlaying, getProfile } from "../lib/spotify";

export default async function nowPlaying(_: VercelRequest, res: VercelResponse) {
    const nowPlaying = await getNowPlaying();
    const profile = await getProfile();

    // check if the user is playing music
    if (nowPlaying === null) {
        // redirect to the external URL
        console.log(`Redirecting to ${profile.profileUrl}`);
        return res.redirect(profile.profileUrl)
    }
    else {
        // redirect to the external URL
        console.log(`Redirecting to ${nowPlaying.externalUrl}`);
        return res.redirect(nowPlaying.externalUrl)
    }
}
