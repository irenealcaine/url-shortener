import React, { useState } from 'react'
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

const LogIn = () => {

  const loading = true
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('required'),
        password: Yup.string().min(6, 'min 6 char').required('required')
      })
      await schema.validate(formData, { abortEarly: false })
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
          <Error message={'some error'} />
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
