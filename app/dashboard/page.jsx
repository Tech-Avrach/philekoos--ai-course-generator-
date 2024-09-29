"use client"

// import { UserButton } from '@clerk/nextjs'
import React, { useEffect, useContext, useState } from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'
import TokenGiftPopUp from './_components/TokenGiftPopUp'
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { UserTokenContext } from '../_context/UserTokenContext'


function Dashboard() {

  const { user } = useUser();

  const { getUserTokens, userToken } = useContext(UserTokenContext)

  const [newUser, setNewUser] = useState(false)

  useEffect(() => {

    // if (!user) {
    //   window.location.href = "/signin"
    // }

    console.log("user", user)

    console.log("email", user?.primaryEmailAddress?.emailAddress)
    console.log("fullname", user?.fullName)

    if(user) {
      checkNewUser()
    }

  },[user])

  const checkNewUser = async () => {

    const result = await db
    .select()
    .from(Users)
    .where((eq(Users.email, user?.primaryEmailAddress?.emailAddress)), (eq(Users.fullName, user?.fullName)))

    if(result.length === 0) {

      setNewUser(true)

      console.log("new user")
      await db.insert(Users).values({
        email: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        token: 2
      })
    }

    getUserTokens(user?.primaryEmailAddress?.emailAddress, user?.fullName)


  }




  return (
    <div>

        <TokenGiftPopUp newUser={newUser} setNewUser={setNewUser}/>

        <AddCourse />

        {/* Display List Of Course  */}

        <UserCourseList />
    </div>
  )
}

export default Dashboard