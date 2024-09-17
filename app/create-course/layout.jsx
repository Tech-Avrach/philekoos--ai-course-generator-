import React from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputProvider } from '../_context/UserInputContext'
import { Toaster } from 'react-hot-toast';



function CreateCourseLayout({children}) {
  return (
    <div>
      <UserInputProvider>
        <Header />

        {children}

        <Toaster 
          position="bottom-right"
        />
      </UserInputProvider>
    </div>
  )
}

export default CreateCourseLayout