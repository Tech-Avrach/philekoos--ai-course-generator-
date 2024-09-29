// import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'
import TokenGiftPopUp from './_components/TokenGiftPopUp'

function Dashboard() {
  return (
    <div>

        <TokenGiftPopUp />

        <AddCourse />

        {/* Display List Of Course  */}

        <UserCourseList />
    </div>
  )
}

export default Dashboard