export const authEndpoint = 'https://accounts.spotify.com/authorize'
export const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const redirectURL = process.env.NEXT_PUBLIC_REDIRECT_URL as string
export const scopes = [
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'app-remote-control',
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'ugc-image-upload',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-follow-modify',
    'user-follow-read',
    'user-read-recently-played',
]

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join(
    '%20'
)}&response_type=token`
