import { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { CtaIntroRest, CtaJavascript } from '@app/components/cta'
import { MarketingTrustBy, MarketingCli } from '@app/components/marketing'
import { metaSetter } from '@app/utils'
import { strings } from '@app-strings'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { Features } from '@app/app/marketing/features'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} maxWidth={'xl'} index>
        <CtaIntroRest />
        <Features />
        <CtaJavascript />
        <MarketingCli />
        <MarketingTrustBy />
      </MarketingDrawer>
      <MarketingBottomTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { Index },
  {
    rest: true,
    intercom: true,
    title: `The all around web accessibility tool.`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${strings.appName}`,
  }
)
