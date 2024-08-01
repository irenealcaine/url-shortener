
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import Link from './pages/link'
import RedirectLink from './pages/redirect-link'


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/auth',
          element: <Auth />
        },
        {
          path: '/link/:id',
          element: <Link />
        },
        {
          path: '/:id',
          element: <RedirectLink />
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider
        router={router}
      />
    </>
  )
}

export default App
