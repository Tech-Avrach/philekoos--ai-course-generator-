import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md">
        <div className="flex gap-3">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        {/* <h1 className="text-3xl text-primary font-bold mt-1">Philekoos</h1> */}
        </div>
        <UserButton />
    </div>
  )
}

export default Header