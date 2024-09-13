import React from 'react'
import Sidebar from './_components/Sidebar'

function DashboardLayout({children}) {
  return (
    <div>
        <div className="md:w-64 hidden md:block">
        <Sidebar />
        </div>
        <div className="md:ml-64">
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout