import React, { useCallback, useState } from 'react'
import { useData } from '../hooks/useData.js'

export type HogeProps = Readonly<{ defaultId: number }>
export const Hoge: React.FC<HogeProps> = ({ defaultId }) => {
  const [id, setId] = useState(defaultId)

  const random = useData(
    String(id),
    () =>
      new Promise<number>((resolve) =>
        setTimeout(() => {
          resolve((id + 1) ** 2)
        }, 2000),
      ),
  )

  const onRoll = useCallback(() => {
    setId(Math.random())
  }, [])

  return (
    <div>
      <p>Hello world</p>
      <p>id: {id}</p>
      <p>rand: {random}</p>
      <button onClick={onRoll}>roll</button>
    </div>
  )
}
