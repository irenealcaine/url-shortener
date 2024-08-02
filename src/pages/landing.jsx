import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const [longUrl, setLongUrl] = useState('')
  const navigate = useNavigate()

  const handleShorten = (e) => {
    e.preventDefault()
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`)
    }
  }

  return (
    <div>
      <h1>URL shortener</h1>
      <form onSubmit={handleShorten}>

        <Input
          type='url'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button type='submit'>Short</Button>
      </form>
    </div>
  )
}

export default LandingPage
