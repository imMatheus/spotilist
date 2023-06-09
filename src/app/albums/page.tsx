import { Inter } from 'next/font/google'

import { cookies } from 'next/headers'
import SpotifyWebApi from 'spotify-web-api-node'
import { SlideSelector } from '../SlideSelector'
import Image from 'next/image'

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

    const a = await spotifyWebApi.getMyTopArtists({
        limit: 50,
        time_range: 'long_term',
        offset: 0,
    })

    const f = [...a.body.items]
    console.log(f)
    return (
        <main className={inter.className}>
            <h1>ghgh - {f.length}</h1>

            <SlideSelector />

            <div className='mx-auto grid max-w-7xl grid-cols-6 gap-3 bg-orange-900'>
                {f.map((artist, index) => (
                    <div key={artist.id} className='bg-orange-800'>
                        <div className='relative aspect-square w-full'>
                            <Image
                                src={artist.images[0].url}
                                alt={artist.name + ' image'}
                                fill={true}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p>
                            {index + 1} - {artist.name}
                        </p>
                        {/* <p>{artist.popularity}</p> */}
                    </div>
                ))}
            </div>

            {/* <pre className='bg-gray-800 p-5'>{JSON.stringify(f, null, 2)}</pre> */}

            {/* {true ? <Showcase /> : <p>please login...</p>} */}
        </main>
    )
}
