import { Fragment } from 'react'
import { metaSetter } from '@app/utils'
import { strings } from '@app-strings'

import { MarketingIntro } from '@app/components/stateless/marketing/intro-rest'
import { FeaturesList } from '@app/components/stateless/marketing/features'
import { MarketingTrustBy } from '@app/components/stateless/marketing/trusted'
import { CtaInputRest } from '@app/components/cta/searchbar/cta-input-rest'

import { MarketingDrawer } from '@app/components/general'
import { MarketingDashboard } from '@app/components/stateless/marketing/dashboard'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { companyName } from '@app/configs'
import { MarketingBenefits } from '@app/components/stateless/marketing/benefits'
import { MarketingCli } from '@app/components/stateless/marketing/cli-usage'
import { MarketingIntroCoverage } from '@app/components/stateless/marketing/intro-coverage'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} index>
        <MarketingIntro>
          <CtaInputRest />
        </MarketingIntro>
        <FeaturesList />
        <MarketingDashboard />
        <MarketingCli />
        <MarketingTrustBy />
        <MarketingIntroCoverage />
        <MarketingBenefits />
      </MarketingDrawer>
      <MarketingBottomTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { Index },
  {
    rest: true,
    title: `${companyName}: the web accessibility tool.`,
    description: `Build inclusive websites with tools that monitor, fix, and guide web accessibility delivery with ${strings.appName}`,
  }
)
