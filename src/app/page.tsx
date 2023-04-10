import { Inter } from 'next/font/google'

import { Showcase } from './Showcase'
import { cookies } from 'next/headers'
import SpotifyWebApi from 'spotify-web-api-node'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
    const cookiesStore = cookies()
    const token = cookiesStore.get('spotify_token')?.value

    const spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
        accessToken: token || '',
    })

    const f = await spotifyWebApi.getMyTopArtists({
        limit: 100,
        time_range: 'long_term',
    })
    console.log(f)
    return (
        <main className={inter.className}>
            <h1>
                ghgh - {f.body.items.length} - {f.body.limit}
            </h1>

            {f.body.items.map((artist) => (
                <div key={artist.id}>
                    <p>{artist.name}</p>
                </div>
            ))}

            <pre className='bg-gray-800 p-5'>{JSON.stringify(f, null, 2)}</pre>

            {/* {true ? <Showcase /> : <p>please login...</p>} */}
        </main>
    )
}
