import React from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputProvider } from '../_context/UserInputContext'



function CreateCourseLayout({children}) {
  return (
    <div>
      <UserInputProvider>
        <Header />

        {children}

      </UserInputProvider>
    </div>
  )
}

export default CreateCourseLayout