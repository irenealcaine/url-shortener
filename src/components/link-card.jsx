import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrls'

const LinkCard = ({ url, fetchUrls }) => {

  const downloadImage = () => {
    const imageUrl = url?.qr
    const fileName = url?.title
    const anchor = document.createElement('a')
    anchor.href = imageUrl
    anchor.download = fileName
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    console.log('qr')
  }

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id)

  return (
    <>
      <img src={url?.qr} alt={url?.title} />
      <Link to={`/link/${url?.id}`}>
        <span>{url?.title}</span>
        <span>{url?.custom_url ? url?.custom_url : url?.short_url}</span>
        <span>{url?.original_url}</span>
        <span>{new Date(url?.created_at).toLocaleString()}</span>

      </Link>
      <div>
        <Button onClick={() => { navigator.clipboard.writeText(url?.short_url) }}>Copy</Button>
        <Button onClick={() => { downloadImage() }}>Download</Button>
        <Button onClick={() => fnDelete().then(() => fetchUrls())}>{loadingDelete ? 'Loading...' : 'Delete'}</Button>
      </div>
    </>
  )
}

export default LinkCard
