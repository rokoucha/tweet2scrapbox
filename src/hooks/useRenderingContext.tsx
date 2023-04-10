import React, { createContext, useContext } from 'react'

export const RenderingContext = {
  CSR: 'CSR',
  SSR: 'SSR',
} as const
export type RenderingContext = keyof typeof RenderingContext

const renderingContext = createContext<RenderingContext>('SSR')

export function useRenderingContext(): RenderingContext {
  const context = useContext(renderingContext)

  return context
}

export type RenderingContextProviderProps = Readonly<{
  children: React.ReactNode
  context: RenderingContext
}>

export const RenderingContextProvider: React.FC<
  RenderingContextProviderProps
> = ({ children, context }) => {
  return (
    <renderingContext.Provider value={context}>
      {children}
    </renderingContext.Provider>
  )
}
