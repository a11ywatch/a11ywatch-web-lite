'use client'

import { ReactElement } from 'react'
import { SectionContainer } from '../containers/section-container'
import { Header3 } from '@app/components/general/header'

export function MarketingIntroCoverage(): ReactElement<any, any> | null {
  return (
    <SectionContainer>
      <div className='py-1'>
        <div className='border-double border-4 shadow-xl py-4 px-4 rounded'>
          <div>
            <Header3>63% Automated Web Accessibility Testing Coverage</Header3>
            <div>
              Our tool is 23% and counting more accurate than the best
              alternative. Get the best coverage across issues and domain
              resolution at once with almost no downtime. The time it takes
              another server to load SSR or the content scripts SSG is about the
              time it takes to load the page. Our state of the art concurrency
              architecture is the most resource efficient and performant along
              thousands to millions of scans within seconds or minutes.
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
