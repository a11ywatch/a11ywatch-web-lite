import React from 'react'
import { companyName } from '@app/configs'
import { SectionContainer } from '../containers/section-container'

const sections: { id: string; text: string }[] = [
  {
    id: 'intro',
    text: `We created ${companyName} from beginning to be fast, flexible, and simple. Our business model is transparent and different compared to normal services. Pricing is fair across the board since we only charge for the time it takes to perform audits on the page.`,
  },
  {
    id: 'clause',
    text: `${companyName} began as an idea that web accessibility auditing can be done without compromising time and quality. ${companyName} started as a web accessibility monitor or safeguard that could be user focused and simple without overlays.`,
  },
  {
    id: 'growth',
    text: `Expansion comes reasonably when our customers tell their friends about ${companyName}, services start using us for all their client websites, or when others try several web accessibility products and end up choosing us. We want this to be organic.`,
  },
  {
    id: 'ending',
    text: 'Our accessibility engine is set to handle multiple edge cases that we take for granted. This includes randomizing agents, and viewports for every page on your web application while delivering real-time detailed reports for auditing.',
  },
  {
    id: 'customers',
    text: 'Customers come first on our end because they’re our only investors. We don’t have VC funding, loans, or any shareholders. This allows us to ship meaningful features and continue updates that make sense to improve our platform.',
  },
  {
    id: 'support',
    text: 'By supporting a company like ours, you are taking a step towards a unified vision of the internet that aligns with ours: split from large companies, accuracy, and all without compromising reliability, speed or quality of support.',
  },
]

// benefits of the system
export const MarketingBenefits = () => {
  return (
    <SectionContainer className='py-6 px-0'>
      <article className='grid md:grid-cols-3 gap-x-8 gap-y-4 rounded p-6'>
        {sections.map((section) => (
          <p key={section.id} className={'text-sm font-mono leading-7'}>
            {section.text}
          </p>
        ))}
      </article>
    </SectionContainer>
  )
}
