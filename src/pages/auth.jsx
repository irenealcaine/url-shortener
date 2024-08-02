import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from 'react-router-dom'
import LogIn from '@/components/login'
import SignUp from '@/components/signup'

const Auth = () => {

  const [searchParams] = useSearchParams()

  return (
    <div>
      <h1>
        {searchParams.get('createNew') ? 'Log in first' : 'Log in / sign Up'}

      </h1>
      <Tabs defaultValue="Log in" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Log in">Log in</TabsTrigger>
          <TabsTrigger value="Sign up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="Log in">
          <LogIn />
        </TabsContent>
        <TabsContent value="Sign up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth
