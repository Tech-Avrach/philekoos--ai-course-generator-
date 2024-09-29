"use client"

import { UserTokenContext } from '@/app/_context/UserTokenContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'

function AddCourse() {

    const { user } = useUser();

    const { getUserTokens, userToken } = useContext(UserTokenContext)

  return (
    <div className="flex justify-between">
        <div>
            <h2 className="text-3xl mb-1">Hello, 
            <span className="">{" "}
            </span>
                <span className="text-primary font-bold">{user?.fullName}
                </span>
            </h2>
            <p className="text-sm text-gray-500">Create new course with AI, Share with friends and Earn from it.</p>
        </div>

        {
            userToken  && userToken > 0 ? 
            <Link href={'/create-course'}>
              <Button>+ Create AI Course</Button>
            </Link> 
              : 
            <Link href={'/dashboard/purchase'}>
              <Button>+ Create AI Course</Button>
            </Link>
        }
        
    </div>
  )
}

export default AddCourse