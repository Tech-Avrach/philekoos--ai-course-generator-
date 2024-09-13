"use client"

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlineCreditCard, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";


function Sidebar() {

    const Menue = [
        {
            id: 1,
            name: "Home",
            icon: <HiOutlineHome /> ,
            path: "/dashboard"
        },
        {
            id: 1,
            name: "Explore",
            icon: <HiOutlineSquare3Stack3D /> ,
            path: "/dashboard/explore"
        },
        {
            id: 1,
            name: "Upgrade",
            icon: <HiOutlineCreditCard /> ,
            path: "/dashboard/upgrade"
        },
        {
            id: 1,
            name: "Logout",
            icon: <HiOutlineArrowRightOnRectangle /> ,
            path: "/dashboard/logout"
        },
    ]

    const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-lg">
         <div className="flex gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-2xl text-primary font-bold mt-1">Philekoos</h1>
        </div>
        <hr className="my-5"/>

        <ul>
            {
                Menue.map((item) => (

                    <li key={item.id} className="py-1">
                        <Link href={item.path}>
                        <span className={`flex gap-3 p-2 rounded-md ${path === item.path ? "bg-primary text-white hover:bg-primary hover:text-white" : "hover:bg-gray-100 hover:text-black"}`}>
                            <div className="text-2xl">{item.icon}</div>
                            <span>{item.name}</span>
                        </span>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Sidebar