import { Fragment } from 'react'
import { MarketingDrawer, Price } from '@app/components/general'
import {
  CtaFeatures,
  CtaIntroRest,
  CtaCustomers,
  CtaSignonForm,
} from '@app/components/cta'
import {
  MarketingTestimonial,
  MarketingTrustBy,
  MarketingCli,
  MarketingProductIntro,
} from '@app/components/marketing'
import { metaSetter } from '@app/utils'
import { strings } from '@app-strings'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} maxWidth={'xl'} index>
        <CtaIntroRest />
        <MarketingProductIntro />
        <CtaFeatures />
        <CtaCustomers />
        <MarketingCli />
        <MarketingTestimonial />
        <MarketingTrustBy />
        <Price blockFree navigate />
        <CtaSignonForm />
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
    title: `${strings.appName}: the all around web accessibility tool.`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${strings.appName}`,
  }
)
