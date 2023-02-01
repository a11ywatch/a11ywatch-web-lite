'use client'

import { ReactElement } from 'react'
import { SectionContainer } from '../containers/section-container'
import { Link } from '../typo/link'
import { Header3, Header4 } from '@app/components/general/header'
import {
  GrCloudComputer,
  GrCloudSoftware,
  GrDesktop,
  GrTestDesktop,
} from 'react-icons/gr'

const infoDetails = [
  {
    title: 'Cloud',
    href: '/cloud',
    subTitle:
      'The most efficient, accurate, and dedicated accessibility engine.',
    Icon: GrCloudSoftware,
  },
  {
    title: 'Web App',
    href: '/why-use',
    subTitle: `Direct access and free to all on the internet. Login now to get started.`,
    Icon: GrCloudComputer,
  },
  {
    title: 'VSCode Extension',
    href: '/vscode-extension',
    subTitle:
      'IDE integration for automation at the watch and reload level made simple.',
    Icon: GrTestDesktop,
  },
  {
    title: 'Native Desktop App',
    href: '/desktop',
    subTitle:
      'The cross-platform native desktop app brings the focus on access.',
    Icon: GrDesktop,
  },
]

export function MarketingProducts(): ReactElement<any, any> | null {
  return (
    <SectionContainer>
      <div className='py-4 px-4'>
        <div className='flex space-x-2 place-items-center'>
          <Header3>Access made for every step</Header3>
        </div>
        <p className='pb-4 leading-10'>
          Pick the tool that works for you. Our core system is actively
          developed as the building blocks for any integration.
        </p>
        <ul className={'text-left gap-x-4 grid grid-cols-2 md:grid-cols-4'}>
          {infoDetails.map(({ title, href, subTitle, Icon }, i: number) => {
            return (
              <li key={i}>
                <Header4 className='font-medium text-left md:text-center'>
                  {title}
                </Header4>
                <div className={'text-base'}>{subTitle}</div>
                <Link href={href}>
                  <span className='flex flex-1 h-20 rounded-sm place-items-center place-content-center px-2 py-2 text-medium text-white dark:text-black bg-black dark:bg-white md:text-xl lg:text-2xl hover:opacity-90'>
                    <span className='sr-only'>{title}</span>
                    <Icon className='grIcon' />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionContainer>
  )
}
