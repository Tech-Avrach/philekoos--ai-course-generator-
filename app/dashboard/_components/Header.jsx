"use client"

import { UserTokenContext } from '@/app/_context/UserTokenContext';
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

function Header() {

  const { userToken, getUserTokens } = useContext(UserTokenContext);

  const { user } = useUser();

  useEffect(() => {

    let email = user?.primaryEmailAddress?.emailAddress;
    let fullName = user?.fullName;

    console.log("email", email, "fullName", fullName)
    getUserTokens(email, fullName)
  }, [user])

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

// export default Header