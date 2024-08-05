import { UrlState } from '@/context'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {

  const navigate = useNavigate()
  const { loading, isAuthenticated } = UrlState()

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate('/auth')
    }
  }, [isAuthenticated, loading])

  if (loading) return <p>Loading...</p>

  if (isAuthenticated) return children
}

export default RequireAuth
