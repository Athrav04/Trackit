'use client'

import React from 'react'
import Image from 'next/image'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
  

const MobileNav = ({user}:MobileNavProps) => {
    const pathName = usePathname();

  return (
   <section>
    <Sheet>
  <SheetTrigger>
    <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu icon"
    className='cursor-pointer'/>
  </SheetTrigger>
  <SheetContent side='left' className='border-none bg-white '>
  <nav className='flex flex-col gap-4'>
            <Link href='/'
            className="flex cursor-pointer iterms-center gap-1 px-4">
                <Image src={'/icons/logo.svg'} 
                width={34}
                height={34} 
                alt='Trackit Logo' />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                  Trackit
                  </h1>
            </Link>
            
            <div className='mobilenav-sheet'>
                <SheetClose asChild >
                    <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                    {sidebarLinks.map((item)=>{
              const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
              return (
                <SheetClose asChild key={item.label}>
                     <Link href={item.route} 
                            key={item.label}
                            className={cn('mobilenav-sheet_close w-full',{
                                'bg-bank-gradient': isActive 
                            })}
                            >
                                <Image src={item.imgURL} 
                                alt={item.label} 
                                width={20}
                                height={20}
                                className={cn({'brightness-[4] invert-0':isActive})}/>
                                <p className={cn('text-16 font0semibold text-black-2',{'!text-white':isActive})}>
                                {item.label}
                                </p>
                            </Link>
                                </SheetClose>
                            
                            )})}
                    </nav>
                </SheetClose>
            </div>


            
            </nav>
  </SheetContent>
</Sheet>

   </section>
  )
}

export default MobileNav