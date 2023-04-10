import React, { createContext, useContext } from 'react'

const locationContext = createContext<URL>(new URL('https://example.com'))

export function useLocation(): URL {
  const location = useContext(locationContext)

  return location
}

export type LocationProviderProps = Readonly<{
  children: React.ReactNode
  url: string
}>

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
  url,
}) => {
  const location = new URL(url)

  return (
    <locationContext.Provider value={location}>
      {children}
    </locationContext.Provider>
  )
}
