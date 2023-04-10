import { z } from 'zod'

export const Tweet = z.object({
  id_str: z.string(),
  text: z.string(),
  entities: z.object({
    media: z.optional(
      z.array(
        z.object({
          media_url_https: z.string(),
        }),
      ),
    ),
  }),
  user: z.object({
    screen_name: z.string(),
  }),
})
export type Tweet = z.infer<typeof Tweet>

export const TwitterError = z.object({
  errors: z.array(
    z.strictObject({
      code: z.number(),
      message: z.string(),
    }),
  ),
})
export type TwitterError = z.infer<typeof TwitterError>

export const TweetOrTwitterError = z.union([Tweet, TwitterError])
export type TweetOrTwitterError = z.infer<typeof TweetOrTwitterError>
