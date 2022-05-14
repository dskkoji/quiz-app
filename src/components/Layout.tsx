import Head from 'next/head'

import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>MyTemplate</title>
      </Head>
      <div className="content">
        {children}
      </div>
      <footer className=""></footer>
    </div>
  )
}

export default Layout
 