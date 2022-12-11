import fetch from "isomorphic-unfetch";

import {
	TOKEN_ENDPOINT,
	NOW_PLAYING_ENDPOINT,
	REFRESH_TOKEN,
	CLIENT_ID,
	CLIENT_SECRET,
	PROFILE_ENDPOINT,
} from "../consts/spotify";

type userInfo = {
	profileUrl: string;
	profileName: string;
}

type TrackInfo = {
	progress: number | null;
	duration: number;
	track: string;
	artist: string;
	isPlaying: boolean;
	coverUrl: string;
	externalUrl: string;
};

export const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

async function getAccessToken() {
	const payload = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: REFRESH_TOKEN,
	});
	const res = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: payload.toString(),
	});

	const { access_token } = await res.json();

	return access_token;
}

function formatTrackInfo(trackInfo: SpotifyApi.CurrentlyPlayingResponse): TrackInfo | null {
	const { progress_ms: progress, item, is_playing: isPlaying = false } = trackInfo;

	if (item === null) {
		return null;
	}

	const { duration_ms: duration, name: track, artists = [], album } = item;
	const artist = artists.map(({ name }) => name).join(", ");
	const coverUrl = album.images[album.images.length - 1]?.url;
	const externalUrl = item.external_urls.spotify;

	return { progress, duration, track, artist, isPlaying, coverUrl,  externalUrl};
}

function formatProfileInfo(profileInfo: SpotifyApi.CurrentUsersProfileResponse): userInfo {
	const { external_urls, display_name } = profileInfo;
	const profileUrl = external_urls.spotify;
	const profileName = display_name;

	return { profileUrl, profileName };
}

export async function getProfile(): Promise<null | userInfo> {
	const token = await getAccessToken();
	const res = await fetch(PROFILE_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	if (res.status !== 200) {
		return null;
	}
	
	const data: SpotifyApi.CurrentUsersProfileResponse = await res.json();

	return formatProfileInfo(data);		
}

export async function getNowPlaying(): Promise<null | TrackInfo> {
	const token = await getAccessToken();
	const res = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	if (res.status !== 200) {
		return null;
	}

	const data: SpotifyApi.CurrentlyPlayingResponse = await res.json();

	return formatTrackInfo(data);
}

export async function getCoverBase64(url: string) {
	const res = await fetch(url);
	const buff = await res.arrayBuffer();

	return Buffer.from(buff).toString("base64");
}
