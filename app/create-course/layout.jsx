import React from 'react'
import { UserInputProvider } from '../_context/UserInputContext'
import Header from '../_components/Header'



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