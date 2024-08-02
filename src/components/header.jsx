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

const Header = () => {

  const user = false
  const navigate = useNavigate()

  return (
    <nav className='flex justify-between align-center'>
      <Link to='/'>Home</Link>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>Avatar</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Links</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate('/auth')}>Log in</Button>
      )}
    </nav>
  )
}

export default Header
