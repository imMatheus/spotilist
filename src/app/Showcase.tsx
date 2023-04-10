import { getAccessTokenFromUrl } from '@/utils/getAccessTokenFromUrl'
import { cookies } from 'next/headers'
import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

export const Showcase = ({}) => {
    const cookiesStore = cookies()

    // const token = getAccessTokenFromUrl()

    // if (token) {
    //     spotifyWebApi.setAccessToken(token)
    // }

    // useEffect(() => {
    //     console.log('hej då')

    //     const x = spotifyWebApi.getAccessToken()
    //     console.log(x)

    //     async function test() {
    // const f = await spotifyWebApi.getUserPlaylists()
    // console.log(f)
    //     }

    //     test()
    // }, [spotifyWebApi])

    return (
        <div>
            <pre className='bg-gray-800 p-5'>
                {JSON.stringify(cookiesStore.getAll(), null, 2)}
            </pre>
        </div>
    )
}
