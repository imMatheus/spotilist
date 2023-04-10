import { cookies } from 'next/headers'

export async function GET(request: Request) {
    console.log('========')
    console.log(request)
    console.log('========')

    // const params = new URLSearchParams(window.location.hash.replace('#', '?'))
    // const accessToken = params.get('access_token')

    return new Response('hej')
}

export async function POST(request: Request) {
    console.log('========')
    const res = await request.json()
    console.log(res)

    if ('token' in res) {
        return new Response('hej då', {
            headers: {
                'Set-Cookie': `spotify_token=${res.token};Secure; HttpOnly; SameSite=None; Path=/; Max-Age=3600;`,
                // 'Set-Cookie': `spotify_token=${res.token};Max-Age=36000`,
            },
        })
    }

    console.log('========')

    return new Response('Please provide a token', { status: 400 })
}
