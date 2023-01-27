import React from 'react'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header2, Header3 } from '@app/components/general/header'
import { companyName } from '@app/configs'
import type { PageProps } from '@app/types'

function Climate({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <div className='py-2 space-y-2'>
          <PageTitle>Our commitment to helping the environment</PageTitle>
          <p className='text-base'>
            The world we all share together has been here before the terms save
            the planet. We can take the wasteful aspects of humanity and bring
            it back to the cycle that nature brings.
          </p>
          <p>
            We need to help save resources so nature can continue without
            long-term damage being part of every step.
          </p>
        </div>

        <div className='py-2'>
          <Header2>We are all in this together</Header2>
          <p className='text-base'>
            The world and humanity is on a downhill slope from the lack of care
            of sharing natural resources back with the eco-system. Nature and
            the natural resources need to be shared across the eco-system
            balance in order to sustain a way of living. When it becomes hard to
            eat or drink clean water the recovering aspect may not arise as
            simple or at all.
          </p>
        </div>

        <div className='py-2'>
          <Header3>We can solve hard problems</Header3>
          <p>
            One of the things that make our species unique is the ability to
            solve challenging problems. We must take our abilities to build
            tools and processes that positively impact all nature. And we can do
            it if we slow down, become wiser with our use of resources and
            choices we make.
          </p>
        </div>

        <div className='py-2'>
          <Header3>We can make an impact</Header3>
          <p>
            Everyone has the power to change things, right now, without
            hesitation, through actions. Our finances and our consumption for
            products and companies who align with making things better. We need
            to optimize for tomorrow instead of {`what’s`} the simplest today.
            We can make a change with our unique skill sets to deliver
            efficiently and effectively.
          </p>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Climate },
  {
    description: `Our commitement to helping the environment - ${companyName}`,
  }
)
