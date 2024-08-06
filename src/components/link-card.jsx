import React from 'react'

const LinkCard = ({ url, fetchUrls }) => {



  return (
    <>
      <img src={url?.qr} alt={url?.title} />
    </>
  )
}

export default LinkCard
