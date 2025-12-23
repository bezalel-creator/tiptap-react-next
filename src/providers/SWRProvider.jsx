'use client'

import { SWRConfig } from 'swr'

export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false,
        onError: (err) => {
          console.error('SWR error:', err)
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
