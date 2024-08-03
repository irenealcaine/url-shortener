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
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const LogIn = () => {

  // const loading = true
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData)

  useEffect(() => {

    console.log(data)
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`)
    }

    return () => {

    }
  }, [data, error])


  const handleLogin = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('required'),
        password: Yup.string().min(6, 'min 6 char').required('required')
      })
      await schema.validate(formData, { abortEarly: false })

      await fnLogin()

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
          <CardTitle>Log In</CardTitle>
          <CardDescription>Log In</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent>
          <Input name='email' type='email' placeholder='email' onChange={handleInputChange} />
          {errors.email && <Error message={errors.email} />}
          <Input name='password' type='password' placeholder='password' onChange={handleInputChange} />
          {errors.password && <Error message={errors.password} />}

        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? 'Loading...' : 'Log In'}

          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LogIn
