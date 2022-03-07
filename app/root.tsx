import type { ReactElement } from 'react'
import type { LinksFunction, MetaFunction } from 'remix'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'

import appStyles from '~/styles/app.css'

export const meta: MetaFunction = () => {
  return { title: 'Pokemon Search' }
}

// Include a default CSS reset for the app
export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css',
    },
    {
      rel: 'stylesheet',
      href: appStyles,
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
    },
  ]
}

export default function App(): ReactElement<any, any> {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
