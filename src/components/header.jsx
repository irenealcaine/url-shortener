import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UrlState } from '@/context'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import useFetch from '@/hooks/use-fetch'
import { logout } from '@/db/apiAuth'

const Header = () => {

  const navigate = useNavigate()

  const { user, fetchUser } = UrlState()

  const { loading, fn: fnLogout } = useFetch(logout)

  return (
    <>
      <nav className='flex justify-between align-center'>
        <Link to='/'>Home</Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage className='w-10 rounded-full object-contain' src={user?.user_metadata?.profile_pic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to='/dashboard'>
                <DropdownMenuItem>Links</DropdownMenuItem>
              </Link>
              <DropdownMenuItem><span
                onClick={() => {
                  fnLogout().then(() => {
                    fetchUser()
                    navigate('/')
                  })
                }}>
                Log out</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate('/auth')}>Log in</Button>
        )}

      </nav>
      {loading && <p>Loading...</p>}
    </>
  )
}

export default Header
