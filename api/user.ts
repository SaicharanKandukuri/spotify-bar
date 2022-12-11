import { VercelRequest, VercelResponse } from "@vercel/node";
import { getProfile } from "../lib/spotify";

export default async function nowPlaying(_: VercelRequest, res: VercelResponse) {
    const profile = await getProfile();
    
    const profileUrl = profile.profileUrl;

    // redirect to the external URL
    console.log(`Redirecting to ${profileUrl}`);
    return res.redirect(profileUrl)
}
