import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from 'react-router-dom'
import LogIn from '@/components/login'
import SignUp from '@/components/signup'
import { UrlState } from '@/context'

const Auth = () => {

  const [searchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')
  const navigate = useNavigate()

  const { isAuthenticated, loading } = UrlState()

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`)
    }
  }, [isAuthenticated, loading])


  return (
    <div>
      <h1>
        {longLink ? 'Log in first' : 'Log in / sign Up'}

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
