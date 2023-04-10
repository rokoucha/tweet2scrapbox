import React from 'react'
import { useQuery } from 'react-query'
import { useLocation } from '../hooks/useLocation.js'
import { TweetOrTwitterError } from '../twitter.js'

export type TweetProps = Readonly<{ id: string }>

export const Tweet: React.FC<TweetProps> = ({ id }) => {
  const location = useLocation()

  const { data } = useQuery({
    queryKey: ['tweet', id] as const,
    queryFn: async ({ queryKey: [_, id] }) => {
      const res = await fetch(new URL(`/api/tweets/${id}`, location))

      const tweetOrError = TweetOrTwitterError.parse(await res.json())
      if ('errors' in tweetOrError) {
        throw new Error(`Twitter Error: ${JSON.stringify(tweetOrError.errors)}`)
      }

      return tweetOrError
    },
  })

  if (!data) return null

  const text = [
    `>[https://twitter.com/${data.user.screen_name}/status/${data.id_str} @${
      data.user.screen_name
    }]: ${data.text.split('\n').join('\n>')}`,
    ...(data.entities.media?.map((m) => `>[${m.media_url_https}]`) ?? []),
  ].join('\n')

  return (
    <>
      <textarea readOnly value={text} cols={120} rows={4} />
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text)
            window.alert('copied!')
          } catch (error) {
            window.alert('failed to copy')
          }
        }}
      >
        copy
      </button>
    </>
  )
}
