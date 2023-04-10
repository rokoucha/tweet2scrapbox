import React, { Suspense, useDeferredValue, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Tweet } from './components/tweet.js'
import { useLocation } from './hooks/useLocation.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

export const App: React.FC = () => {
  const location = useLocation()

  const [tweetUrl, setTweetUrl] = useState(
    location.searchParams.get('tweetUrl') ?? '',
  )

  const deferredTweetUrl = useDeferredValue(tweetUrl)

  useEffect(() => {
    if (!history || deferredTweetUrl === '') return

    location.searchParams.set('tweetUrl', deferredTweetUrl)
    history.pushState({}, '', location)
  }, [deferredTweetUrl])

  const matchTweetUrl = deferredTweetUrl.match(
    /https?:\/\/twitter.com\/[^/]+\/status\/(\d+)/,
  )

  const id = matchTweetUrl?.at(1)

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <p>Get tweet</p>
        <label htmlFor="tweet_id_input">Tweet URL</label>
        <input
          id="tweet_id_input"
          value={tweetUrl}
          onChange={(e) => setTweetUrl(e.target.value)}
          pattern="https?:\/\/twitter.com\/[^/]+\/status\/(\d+)"
          size={60}
        />
      </div>
      <div>
        <p>Tweet</p>
        {tweetUrl === '' ? (
          <></>
        ) : id !== undefined ? (
          <Suspense fallback={<p>Loading...</p>}>
            <Tweet id={id} />
          </Suspense>
        ) : (
          <p>Invalid Tweet URL</p>
        )}
      </div>
    </QueryClientProvider>
  )
}
