import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Addressable, Supervisor, Viewport } from '../client'

export type HomeProps = Record<string, unknown>

export const Home: NextPage<HomeProps> = (_) => {
  // used to reset our app by updating the key of the component
  const [instanceKey, setInstanceKey] = useState(0)

  return (
    <>
      <Head>
        <title>addressable</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* a few tools to control things */}
      <Supervisor
        reset={() => {
          localStorage.clear()
          setInstanceKey((v) => v + 1)
        }}
      />

      {/* the root layout */}
      <Viewport py="3.5rem">
        {/* the star of the show */}
        <Addressable key={instanceKey}></Addressable>
      </Viewport>
    </>
  )
}

export default Home
