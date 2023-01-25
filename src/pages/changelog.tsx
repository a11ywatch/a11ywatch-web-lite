import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Fragment, Key } from 'react'

interface ListLog {
  date: string
  updates: string[]
}

const list: ListLog[] = [
  {
    date: 'January 2023',
    updates: [
      'Performance improvements reaching 400k+ audits per minute!',
      'Selecting multiple runners supported.',
      'Proxy connect support.',
      'Sitmap extended crawling!',
      'Performance improvements reaching 200k audits per minute!',
    ],
  },
  {
    date: 'December 2022',
    updates: ['Analytics across all pages and domains.', 'Dark mode support!'],
  },
  {
    date: 'November 2022',
    updates: [
      'Scaled pricing plans are now live with all features 🥳!',
      'Remove middleware authentication dashboard url rewrite.',
    ],
  },
  {
    date: 'October 2022',
    updates: ['Security improvements and rate limiting updates.'],
  },
  {
    date: 'September 2022',
    updates: ['Improve application concurrency limits.'],
  },
  {
    date: 'August 2022',
    updates: ['Add public gRPC entry for website report gathering.'],
  },
  {
    date: 'July 2022',
    updates: [
      'Fix email password reset handling.',
      'Add paginated API endpoints for base models.',
    ],
  },
  {
    date: 'June 2022',
    updates: [
      'TLD and subdomain crawl bug fixes.',
      'API bug fixes across some endpoints.',
    ],
  },
  {
    date: 'May 2022',
    updates: [
      'OpenAPI crawl expose and crawl fixes across multi domains.',
      'Add mobile viewport scan option toggle.',
    ],
  },
  {
    date: 'April 2022',
    updates: ['Iframe render security improvements.'],
  },
  {
    date: 'March 2022',
    updates: ['Improve portability across systems and reduce memory usage.'],
  },
  {
    date: 'February 2022',
    updates: ['Add Pagespeed reports.'],
  },
  {
    date: 'January 2022',
    updates: ['Fix first party auth handling.'],
  },
  {
    date: 'December 2021',
    updates: ['Remove universal analytics tracking.'],
  },
  {
    date: 'July 2021',
    updates: ['Add yearly plans.'],
  },
]

function ChangeLog({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`Changelog`}</Header>
        <p className='text-lg'>
          Get the insight on current progress and new updates to come.
        </p>

        <Header2>Current status</Header2>
        <p className='text-lg'>
          We are currently working on improvements to our dashboard and
          improving the process across our platform.
        </p>

        <>
          {list.map((item) => {
            return (
              <Fragment key={item.date as Key}>
                <Header3>{item.date}</Header3>
                <ul className='list-disc py-2 px-6'>
                  {item.updates.map((li, i) => {
                    return (
                      <li key={`changeloglist-${i}`} className={'text-lg '}>
                        {li}
                      </li>
                    )
                  })}
                </ul>
              </Fragment>
            )
          })}
        </>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { ChangeLog },
  {
    description: `See recent and planned updates across ${companyName}, web accessibility software.`,
  }
)
