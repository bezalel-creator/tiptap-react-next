'use client'

import { SWRConfig } from 'swr'

export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  )
}
