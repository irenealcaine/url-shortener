import { storeClicks } from '@/db/apiClicks'
import { getLongUrl } from '@/db/apiUrls'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const RedirectLink = () => {

  const { id } = useParams()

  const { loading, data, fn } = useFetch(getLongUrl, id)

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url
  })

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        Loading...
        <br />
        Redirecting...
      </>
    );
  }

  return null;
}

export default RedirectLink
