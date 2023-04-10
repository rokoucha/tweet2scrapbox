import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './app.js'
import { LocationProvider } from './hooks/useLocation.js'
import {
  RenderingContext,
  RenderingContextProvider,
} from './hooks/useRenderingContext.js'

const root = document.getElementById('root')
if (!root) throw new Error('Root node was not found')

hydrateRoot(
  root,
  <StrictMode>
    <RenderingContextProvider context={RenderingContext.CSR}>
      <LocationProvider url={window.location.href}>
        <App />
      </LocationProvider>
    </RenderingContextProvider>
  </StrictMode>,
)
