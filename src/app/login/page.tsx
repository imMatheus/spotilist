'use client'

import { getAccessTokenFromUrl } from '@/utils/getAccessTokenFromUrl'
import { cookies, headers } from 'next/headers'
import { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Login() {
    console.log('hej hej hej')
    const token = getAccessTokenFromUrl()

    useEffect(() => {
        console.log('effect')

        async function setToken() {
            console.log('token')
            if (!token) return
            console.log('setting token')

            // const res = await axios.post(
            //     '/api/auth',
            //     { token },
            //     { withCredentials: true }
            // )
            const res = await fetch('/api/auth', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })
            console.log(res)
        }

        setToken()
    }, [token])

    return (
        <div>
            hej - {token}
            <Link href='/' className='block bg-green-500'>
                go to main
            </Link>
        </div>
    )
}
