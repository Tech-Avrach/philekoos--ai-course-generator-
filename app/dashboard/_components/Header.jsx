"use client"

import { UserTokenContext } from '@/app/_context/UserTokenContext';
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function Header() {

  const { userToken } = useContext(UserTokenContext);

  return (
    <div className="flex justify-between p-5 shadow-md">
      <div className="flex gap-3">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        {/* <h1 className="text-3xl text-primary font-bold mt-1">Philekoos</h1> */}
      </div>

      <div className="flex gap-3">
        <Link href="/dashboard/purchase">
          <div className="flex gap-2 items-center justify-center px-2 py-1 h-10 w-content border border-primary rounded-md">
            <Image src="/token.webp" alt="token" width={25} height={25} />
            <h1 className="text-primary font-bold">{userToken}</h1>
          </div>
        </Link>
        <UserButton />
      </div>
    </div>
  )
}

export default Header