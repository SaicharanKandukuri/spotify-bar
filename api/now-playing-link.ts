import { VercelRequest, VercelResponse } from "@vercel/node";
import { getNowPlaying, getProfile } from "../lib/spotify";

export default async function nowPlaying(_: VercelRequest, res: VercelResponse) {
    const nowPlaying = await getNowPlaying();
    const profile = await getProfile();
    
    const externalUrl = nowPlaying.externalUrl;
    const profileUrl = profile.profileUrl;

    // if length of @externalUrl is not null, redirect to @externalUrl
    if (externalUrl === null) {
        // redirect to the external URL
        console.log(`Redirecting to ${externalUrl}`);
        return res.redirect(externalUrl)
    
    } else {
       profileUrl.length === 0 ? res.status(404).send("Not found") : res.redirect(profileUrl);
    }

}
