import { FC, PropsWithChildren } from 'react'
import { MarketingDrawer, Section } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Image from 'next/image'
import { FeaturesList } from '@app/components/stateless/marketing/features'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { companyName } from '@app/configs'

const FeatureHeading: FC<PropsWithChildren> = ({ children }) => {
  return <p className='text-base font-medium leading-7'>{children}</p>
}

const { paper, row } = {
  paper:
    'w-full p-3 border flex flex-grow md:flex-row md:w-1/2 place-items-between',
  row: 'flex flex-wrap md:flex-nowrap',
}

const paperStyle = 'flex place-content-center py-2 rounded'

function Features({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth='xl' footerSpacing>
      <SectionContainer container block>
        <div className='pb-2'>
          <Header>{companyName} Platform Features</Header>
          <p>
            Learn about features that make {companyName} stand out between the
            rest.
          </p>
        </div>
        <Header2 className='sr-only'>Tools built for the job</Header2>
        <div className={row}>
          <div className={paper}>
            <Section>
              <div>
                <Header3>Accurate and Fast Web Accessibility Audits</Header3>
                <FeatureHeading>
                  Our web accessibility insight reporter and monitor scans for
                  problems with recommended solutions that are tuned for any
                  website using WCAG, Section508, and beyond. Get notified when
                  new issues occur with detailed information on what happened on
                  all pages. Control how often you need the reporter to run on
                  based on your schedule. Include critical{' '}
                  <a
                    href={'https://web.dev/vitals/'}
                    target={'_blank'}
                    rel={'noreferrer'}
                    className={'text-blue-600 underline'}
                  >
                    Web Vitals
                  </a>{' '}
                  across all urls at once. Our service is capable of handling
                  large websites with thousands - millions of pages, view the
                  <a
                    href='https://github.com/a11ywatch/github-actions/pull/34'
                    target={'_blank'}
                    rel={'noreferrer'}
                    className={'text-blue-600 underline'}
                  >
                    benchmarks
                  </a>
                  .
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/news.svg'}
                  height={175}
                  width={175}
                  alt={'Issue reporter like news'}
                />
              </div>
            </Section>
          </div>
        </div>
        <div className={row}>
          <div className={paper}>
            <Section>
              <div>
                <Header3>Website Visual Playground</Header3>
                <FeatureHeading>
                  View your website with elegant annotations of the issues on
                  your page. Experiment with recommended fixes to validate
                  changes before release in real-time. Verify how your website
                  would respond to visual updates with tools that help validate
                  contrast, alts, spacing, and more.
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/park.svg'}
                  height={175}
                  width={175}
                  alt={'Amusement park for website creation'}
                />
              </div>
            </Section>
          </div>
          <div className={paper}>
            <Section>
              <div>
                <Header3>API Integrations</Header3>
                <FeatureHeading>
                  Get web accessibility results any-where at any time. We built
                  many tools that can fit within your pipeline to help fine
                  accessibility and web vitals. With uptime set to fit your flow
                  take ideas to the next level. The most affordable price for
                  accessibility auditing with portablity and efficiency.
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/heal.svg'}
                  height={175}
                  width={175}
                  alt={'Fix issues with custom remedies'}
                />
              </div>
            </Section>
          </div>
        </div>
        <Section>
          <FeaturesList alternative all />
        </Section>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Features },
  {
    description: `Main features that are on the platform and how it works using ${companyName}.`,
  }
)
