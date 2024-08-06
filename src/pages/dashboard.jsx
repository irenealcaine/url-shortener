import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";

import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";
import { Button } from "@/components/ui/button";
import LinkCard from "@/components/link-card";

const Dashboard = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const { user } = UrlState()
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id)
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );


  useEffect(() => {
    fnUrls()
  }, [])

  useEffect(() => {
    if (urls?.length) {
      fnClicks()
    }
  }, [urls?.length])

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <>
      {(loadingClicks || loading) && (
        <p>Loading...</p>
      )}

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div>

        <h1>My links</h1>
        <Button>Create link</Button>
      </div>

      <div>
        <Input type='text' placeholder='filter' value={searchQuery} onChange={e => { setSearchQuery(e.target.value) }} />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      })}
    </>
  )
}

export default Dashboard
