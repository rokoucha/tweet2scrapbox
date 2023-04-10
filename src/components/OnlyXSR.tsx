import React, { useEffect, useState } from 'react'
import {
  RenderingContext,
  useRenderingContext,
} from '../hooks/useRenderingContext.js'

export type OnlyXSRProps = Readonly<{
  children: React.ReactNode
  renderingContext: RenderingContext
}>

export const OnlyXSR: React.FC<OnlyXSRProps> = ({
  children,
  renderingContext,
}) => {
  const [currentContext, setCurrentContext] = useState<RenderingContext>()

  const providedContext = useRenderingContext()

  useEffect(() => {
    setCurrentContext(providedContext)
  }, [providedContext])

  return currentContext === renderingContext ? <>{children}</> : <></>
}
