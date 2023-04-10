import React, { ReactNode } from 'react'

export type HtmlProps = Readonly<{
  children?: ReactNode | undefined
}>

export const Html: React.FC<HtmlProps> = ({ children }) => (
  <html lang="ja">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>tweet2scrapbox</title>
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
)
