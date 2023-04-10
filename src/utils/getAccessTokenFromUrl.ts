export function getAccessTokenFromUrl(): string | null {
    console.log('yy')

    if (typeof window === 'undefined') {
        return null
    }
    console.log('ppp')

    const params = new URLSearchParams(window.location.hash.replace('#', '?'))
    const accessToken = params.get('access_token')

    return accessToken
}
