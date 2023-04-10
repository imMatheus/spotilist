'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export const SlideSelector: React.FC = ({}) => {
    const pathname = usePathname()
    const data = [
        {
            text: 'Artists',
            href: '/',
        },
        {
            text: 'Songs',
            href: '/songs',
        },
    ]

    return (
        <div className='flex items-center justify-center p-4'>
            <div className='flex rounded-full bg-black font-semibold'>
                <LayoutGroup>
                    {data.map((point) => (
                        <Link
                            key={point.text}
                            href={point.href}
                            className={classNames(
                                'relative cursor-pointer px-4 py-1.5 transition-all',
                                pathname === point.href
                                    ? 'text-black'
                                    : 'hover:opacity-90'
                            )}
                        >
                            <p className='relative z-10'>{point.text}</p>
                            {pathname === point.href && (
                                <motion.div
                                    layoutId='slide-selection'
                                    transition={{
                                        type: 'spring',
                                        stiffness: 350,
                                        damping: 30,
                                    }}
                                    className='absolute inset-0 rounded-full bg-primary'
                                ></motion.div>
                            )}
                        </Link>
                    ))}
                </LayoutGroup>
            </div>
        </div>
    )
}
