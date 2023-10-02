# Echo

Echo is a web application that allows users to explore tracks, artists, playlists, albums, and more from the Spotify music catalog. It utilizes the Spotify Web API for developers to provide a seamless music exploration experience. Users can search for their favorite songs, discover new artists, playlists, and albums.

## Technologies

Echo App is built with the following technologies:

- [ReactJS](https://reactjs.org/)
- [VITE](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://react-query.tanstack.com/)
- [React Router](https://reactrouter.com/)

For detailed information on these technologies, please refer to their respective documentation.

## Spotify Web API

The music data is sourced from the [Spotify Web API](https://developer.spotify.com/documentation/web-api). Please refer to their documentation for more information on how to use the API and obtain necessary credentials.

## Track Lyrics API
The Track Lyrics API is provided by [Akash R Chandran](https://github.com/akashrchandran/spotify-lyrics-api). For detailed information on how to use this API, please refer to their documentation.

## Features

- Users can explore tracks, artists, playlists, and albums from the Spotify catalog.
- Search for songs, artists, and albums by keywords.
- View detailed information about tracks, artists, and albums.

>**Please note:** While you can interact with the player's controls, it won't play actual songs due to technical constraints. For an immersive music streaming experience, it is recommended to use official Spotify music streaming platforms for full song playback and audio streaming.

## Installation

To use this application, you will need [Node.js](https://nodejs.org/) installed on your computer.

1. Clone the repository:
```bash
git clone https://github.com/pusakamanggala/echo-music-app.git
cd echo-music-app
```

2. Install the dependencies:
```bash
npm install
```

3. Configure Spotify API credentials: Obtain your Spotify API credentials by registering your application on the Spotify Developer Dashboard. Once you have the credentials (Client ID and Client Secret), create a .env file in the project root directory and add the following:
 ```bash  
VITE_API_URL = spotify_api_url
VITE_CLIENT_ID = client_id
VITE_CLIENT_SECRET = client_secret
```
>Make sure to replace your-client-id and your-client-secret with your actual Spotify API credentials.

4. Start the development server:
```bash
npm run dev
```
>This will start the development server and open the application in your default browser.

