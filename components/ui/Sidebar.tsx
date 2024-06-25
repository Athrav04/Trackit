'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = ({user}:SiderbarProps) => {
  const pathName = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href='/'
            className="mb-12 flex cursor-pointer iterms-center gap-2">
                <Image src={'/icons/logo.svg'} 
                width={34}
                height={34} 
                alt='Trackit Logo' 
                className=' size-[24px] max-xl:size-14 '/>
                <h1 className=' sidebar-logo'>
                  Trackit
                  </h1>
            </Link>
            {sidebarLinks.map((item)=>{
              const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
              return (
              <Link href={item.route} 
              key={item.label}
              className={cn('sidebar-link',{
                'bg-bank-gradient': isActive 
              })}
              >
                <div className='relative size-6'>
                    <Image src={item.imgURL} alt={item.label} fill className={cn({'brightness-[4] invert-0':isActive})}/>
                </div>
                <p className={cn('sidebar-label',{'!text-white':isActive})}>
                  {item.label}
                </p>
              </Link>
            )})}

            USER
        </nav>
              FOOTER
    </section>
  )
}

export default Sidebar ;