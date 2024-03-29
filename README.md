# Spotify bar in GitHub ReadMe

![image](https://user-images.githubusercontent.com/68287637/140735238-99fda2b8-b24d-4a79-80ea-9c3c2deee311.png)

> Imported from <https://github.com/akellbl4/spotify-badge>

If you want to share your love to music with the world you are in right place. You can share cunrrently playing track from you Spotify just with an image.

<a href="https://spotify-playing-now-readme-eight.vercel.app/api/now-playing-link" target="_blank">
  <img src="https://spotify-playing-now-readme-eight.vercel.app/api/now-playing" >
</a>

> 👆 press on the image to go to the track on Spotify music link
>
> check [bottom](#snippet)

## Features

🎸 **playing now** - current state of track with real-time progress bar  
🎬 **ended state** – when track is ended badge transitions to this state  
⏸ **paused state** - when current track is paused in player  
📭 **idle state** – not playing  
🔗 **link to track** – you can click on the badge and go to the track on Spotify (requires additional configuration)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FSaicharanKandukuri%2Fspotify-bar&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,VERCEL_URL&envDescription=Spotify%20credentials%20should%20be%20provided.&envLink=https%3A%2F%2Fgithub.com%2Fakellbl4%2Fspotify-playing-now-readme%2Fblob%2Fmain%2FREADME.md&project-name=spotify-playing-now-readme-badge)

### How to use

#### Create an Spotify application for authentication

- Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify account
- Click **Create An App**
- Fill the name and description of new app and click **Create**.
- Click **Show Client Secret**.
- Copy **Client ID** and **Client Secret** we will need it a bit later.

#### Deploy an application to Vercel

- Open [this link](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2SaicharanKandukuri%2Fspotify-bar&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,VERCEL_URL&envDescription=Spotify%20credentials%20should%20be%20provided.&envLink=https%3A%2F%2Fgithub.com%2SaicharanKandukuri%2Fspotify-bar%2Fblob%2Fmain%2FREADME.md&project-name=spotify-playing-now-readme) for deploy app to Vercel
- Click **Continue** on **Clone Git Repository** screen
- Choose where you want to save code on **Create Git Repository** and Vercel will fork this repo automatically
- Click **Continue** on **Import Project** screen
- Put **Client ID** to `SPOTIFY_CLIENT_ID` and **Client Secret** to `SPOTIFY_CLIENT_SECRET` and put just `-` to `SPOTIFY_REFRESH_TOKEN`.
- Click **Deploy**

#### Get Refresh Token

- When application is deployed go to **Dashboard**
- Copy your domain with `prod` label of your application
- Go back to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- Open application
- Click to **Edit Settings**
- Add path to auth page `/api/auth`. It should looks like this `https://spotify-playing-now-readme-eight.vercel.app/api/now-playing-link/api/auth`
- Put the url **Redirect URI** and click **Add**
- Save changes with click to **Save** in end of the form
- Open new tab on the browser and go to url which you put in **Redirect URI**. The url should looks like this `https://spotify-playing-now-readme-eight.vercel.app/api/now-playing-link/api/auth`
- Copy **Refresh token** and put to the application settings on Vercel
- Go to **Deployments** page and redeploy the last deployment of your application on Vercel
- Everything is done!

> check out to get refresh tocken with cli: <https://benwiz.com/blog/create-spotify-refresh-token/>

### snippet

You can copy this snippet and change domain in the url to domain of your application and post it wherever you would like

```html
<a href="https://spotify-playing-now-readme-eight.vercel.app/api/now-playing-link" target="_blank">
  <img src="https://spotify-playing-now-readme-eight.vercel.app/api/now-playing" >
</a>
```
