"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import React from 'react'

function AddCourse() {

    const { user } = useUser();

  return (
    <div className="flex justify-between">
        <div>
            <h2 className="text-3xl mb-1">Hello, 
                <span className="text-primary font-bold">{user?.fullName}
                </span>
            </h2>
            <p className="text-sm text-gray-500">Create new course with AI, Share with friends and Earn from it.</p>
        </div>
        <Button>+ Create AI Course</Button>
    </div>
  )
}

export default AddCourse