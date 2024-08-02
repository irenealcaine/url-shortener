import React from 'react'
import { Link } from 'react-router-dom'
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

  const user = true

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
        <Button>Log in</Button>
      )}
    </nav>
  )
}

export default Header
