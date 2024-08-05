import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import Error from './error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'

const SignUp = () => {

  // const loading = true
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    profile_pic: null
  })

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }))
  }

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData)
  const { fetchUser } = UrlState()

  useEffect(() => {

    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`)
      fetchUser()
    }

    return () => {

    }
  }, [error, loading])


  const handleSignup = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('required'),
        name: Yup.string().required('required'),
        password: Yup.string().min(6, 'min 6 char').required('required'),
        profile_pic: Yup.mixed().required('required')
      })
      await schema.validate(formData, { abortEarly: false })

      await fnSignup()

    } catch (e) {
      const newErrors = {}
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message
      })
      setErrors(newErrors)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent>
          <Input name='email' type='email' placeholder='email' onChange={handleInputChange} />
          {errors.email && <Error message={errors.email} />}
          <Input name='name' type='text' placeholder='name' onChange={handleInputChange} />
          {errors.name && <Error message={errors.name} />}
          <Input name='password' type='password' placeholder='password' onChange={handleInputChange} />
          {errors.password && <Error message={errors.password} />}
          <Input name='profile_pic' type='file' accept='image/*' onChange={handleInputChange} />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? 'Loading...' : 'sign up'}

          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
