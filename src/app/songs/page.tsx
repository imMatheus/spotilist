import { Inter } from 'next/font/google'

import { cookies } from 'next/headers'
import Image from 'next/image'
import SpotifyWebApi from 'spotify-web-api-node'
import { z } from 'zod'

const inter = Inter({ subsets: ['latin'] })

export default async function Home({
    searchParams,
}: {
    searchParams?: { time_range?: string }
}) {
    const cookiesStore = cookies()
    const token = cookiesStore.get('spotify_token')?.value

    const spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
        accessToken: token || '',
    })

    console.log(spotifyWebApi.getMyTopTracks)

    const validTimeRanges = z.enum(['short_term', 'medium_term', 'long_term'])

    console.log(searchParams)

    const timeRange = validTimeRanges.safeParse(searchParams?.time_range)
        .success
        ? (searchParams?.time_range as
              | 'short_term'
              | 'medium_term'
              | 'long_term')
        : 'long_term'

    const songs = (
        await spotifyWebApi.getMyTopTracks({
            limit: 100,
            time_range: timeRange,
        })
    ).body.items

    return (
        <>
            {' '}
            {songs.map((song, index) => (
                <div key={song.id} className=''>
                    <div className='relative aspect-square w-full'>
                        <Image
                            src={song.album.images[0]?.url}
                            alt={song.name + ' image'}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <p className='mt-3 text-sm'>{song.name}</p>
                    <p className='mt-1 text-sm text-gray-200'>
                        {song.artists.map((artist) => artist.name).join(', ')}
                    </p>
                </div>
            ))}
        </>
    )
}
