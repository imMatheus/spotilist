import './globals.css'
import { accessUrl } from '@/config'
import Link from 'next/link'

export const metadata = {
    title: 'Spotilist',
    description: 'See your stats for Spotify',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>
                <Link href={accessUrl} className='bg-red-500 p-4'>
                    Login
                </Link>
                {children}
            </body>
        </html>
    )
}
