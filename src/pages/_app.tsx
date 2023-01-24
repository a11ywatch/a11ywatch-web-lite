import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'

import Layout from '@app/components/layout'
import { ErrorBoundary } from '@app/components/general'
import type { InnerApp } from '@app/types/page'
import { AnalyticsHoc } from '@app/components/adhoc/analytics'

const App = ({ Component, pageProps }: InnerApp) => {
  return (
    <ErrorBoundary>
      <Layout Component={Component} pageProps={pageProps} />
      {process.env.NEXT_PUBLIC_FATHOM_CODE ? <AnalyticsHoc /> : null}
    </ErrorBoundary>
  )
}

export default App
