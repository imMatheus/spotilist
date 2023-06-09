import { Inter } from 'next/font/google'

import { Showcase } from './Showcase'
import { cookies } from 'next/headers'
import SpotifyWebApi from 'spotify-web-api-node'
import { SlideSelector } from './SlideSelector'
import Image from 'next/image'
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

    const validTimeRanges = z.enum(['short_term', 'medium_term', 'long_term'])

    console.log(searchParams)

    const timeRange = validTimeRanges.safeParse(searchParams?.time_range)
        .success
        ? (searchParams?.time_range as
              | 'short_term'
              | 'medium_term'
              | 'long_term')
        : 'long_term'
    const artists = (
        await spotifyWebApi.getMyTopArtists({
            limit: 52,
            time_range: timeRange,
            offset: 0,
        })
    ).body.items

    return (
        <>
            {artists.map((artist, index) => (
                <div key={artist.id}>
                    <div className='relative aspect-square w-full'>
                        <Image
                            src={artist.images[0].url}
                            alt={artist.name + ' image'}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <p className='mt-3'>
                        {index + 1} - {artist.name}
                    </p>
                </div>
            ))}
        </>
    )
}
