import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen container'>
        {/* header  */}
        {/* body  */}
        <Outlet />
      </main>
      <footer className='p-10 text-center bg-gray-800 mt-10'>
        Footer
      </footer>
    </div>
  )
}

export default AppLayout
