import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import React, { StrictMode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { api } from './api/index.js'
import { App } from './app.js'
import { LocationProvider } from './hooks/useLocation.js'
import {
  RenderingContext,
  RenderingContextProvider,
} from './hooks/useRenderingContext.js'
import { Html } from './html.js'

const app = new Hono()

app.get('/', async (c) => {
  const stream = await renderToReadableStream(
    <StrictMode>
      <RenderingContextProvider context={RenderingContext.SSR}>
        <LocationProvider url={c.req.url}>
          <Html>
            <App />
          </Html>
        </LocationProvider>
      </RenderingContextProvider>
    </StrictMode>,
    {
      bootstrapModules: ['./bundle.js'],
    },
  )

  return new Response(stream, {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type': 'text/html',
    },
  })
})

app.route('/api', api)

export const onRequest = handle(app)
