"use client"

import { UserTokenContext } from '@/app/_context/UserTokenContext';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import { AiOutlineHome } from "react-icons/ai";

function Header({ showLogo = false }) {

  const [login, setLogin] = useState(false)

  const { userToken, getUserTokens } = useContext(UserTokenContext);

  const { user } = useUser();

  useEffect(() => {


    if (!user) {
      setLogin(false)
    } else {
      setLogin(true)

      let email = user?.primaryEmailAddress?.emailAddress;
      let fullName = user?.fullName;

      getUserTokens(email, fullName)

    }

  }, [user])


  return (
    <div className="flex justify-between p-5 shadow-md">
      <div className="flex gap-3">
        {
          showLogo ? (
            <>
            <Link href={'/dashboard'}>
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="text-3xl text-primary font-bold mt-1">Philekoos</h1>
            </Link>
            </>
          ) : null
        }
      </div>

      {
        login ? (
          <div className="flex gap-4">
            <Link href="/dashboard/purchase">
              <div className="flex gap-2 items-center justify-center px-2 py-1 h-10 w-content border border-primary rounded-md">
                <Image src="/token.webp" alt="token" width={25} height={25} />
                <h1 className="text-primary font-bold">{userToken}</h1>
              </div>
            </Link>

            <div>
              <Link href="/dashboard">
                <Button className="h-10"><AiOutlineHome className="text-2xl " /></Button>
              </Link>
            </div>
            <div style={{ transform: 'scale(1.4)', transformOrigin: 'center' }} className="mt-2">
              <UserButton />
            </div>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button>Get Started</Button>
          </Link>
        )
      }


    </div>
  )
}

export default Header