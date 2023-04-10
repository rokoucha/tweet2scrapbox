import { Hono } from 'hono'
import { Env } from '../env.js'

export const api = new Hono<{ Bindings: Env }>()

api.get('/tweets/:id', async (c) => {
  const id = c.req.param('id')

  const res = await fetch(
    `https://api.twitter.com/1.1/statuses/show.json?id=${id}`,
    {
      headers: { Authorization: `Bearer ${c.env.TWITTER_BEARER_TOKEN}` },
    },
  )

  c.status(res.status as any)

  return c.json(await res.json())
})
