import { ReactElement } from 'react'
import { SectionContainer } from '../containers/section-container'
import { Header3 } from '@app/components/general/header'
import { ThemedImage } from '@app/components/general/theme-image'
import { LazyMount } from '@app/components/lazy/lazymount'

export function MarketingDashboard(): ReactElement<any, any> | null {
  return (
    <SectionContainer>
      <div className='place-content-center place-items-center flex flex-col'>
        <Header3>All the details you need in one location</Header3>
        <p>
          Get inclusive reports across all your websites with real time updates.
        </p>
        <div className='py-4'>
          <LazyMount>
            <ThemedImage
              width={2164}
              className={'shadow border rounded'}
              height={1121}
              quality={100}
              src={'/img/dashboard-example.png'}
              srcDark={'/img/dark_dashboard-example.png'}
              alt={
                'A11yWatch dashboard example for monitoring, remediating, and learning web accessibility'
              }
            />
          </LazyMount>
        </div>
      </div>
    </SectionContainer>
  )
}
