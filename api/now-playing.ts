import { VercelRequest, VercelResponse } from "@vercel/node";
import render from "preact-render-to-string";

import { getCoverBase64, getNowPlaying } from "../lib/spotify";
import Player from "../components/Player";

export default async function nowPlaying(_: VercelRequest, res: VercelResponse) {
	const nowPlaying = await getNowPlaying();
	const cover = nowPlaying ? await getCoverBase64(nowPlaying.coverUrl) : undefined;
	const props = nowPlaying === null ? {} : { ...nowPlaying, cover };
	const player = render(Player(props));
	res.setHeader("Content-Type", "image/svg+xml");
	res.setHeader("Cache-Control", "s-maxage=1");
	res.status(200).send(player);
}
