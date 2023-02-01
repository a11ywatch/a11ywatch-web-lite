import React from 'react'
import { strings } from '@app-strings'
import { Link } from '../typo/link'
import { SectionContainer } from '../containers/section-container'

import {
  GrAccessibility,
  GrAggregate,
  GrCloud,
  GrCode,
  GrCompare,
  GrMoney,
  GrNotification,
  GrTime,
  GrTip,
} from 'react-icons/gr'
import { Header2, Header3 } from '@app/components/general/header'

// todo: remove create Element handling
const RenderIcon = ({ index, ...props }: any): any =>
  React.createElement(
    (() => {
      let FeatureIcon

      switch (index) {
        case 0:
          FeatureIcon = GrAccessibility
          break
        case 1:
          FeatureIcon = GrNotification
          break
        case 2:
          FeatureIcon = GrTip
          break
        case 3:
          FeatureIcon = GrCloud
          break
        case 4:
          FeatureIcon = GrCode
          break
        case 5:
          FeatureIcon = GrCompare
          break
        case 6:
          FeatureIcon = GrAggregate
          break
        case 7:
          FeatureIcon = GrMoney
          break
        case 8:
          FeatureIcon = GrTime
          break
        default:
          FeatureIcon = 'div'
          break
      }
      return FeatureIcon
    })(),
    props
  )

function FeatureItem({ item, index }: { item: any; index: number }) {
  return (
    <div
      className={`py-3 flex flex-col flex-1 border-b border-dashed border-gray-400 sm:px-3 sm:border`}
    >
      <div className='flex space-x-2 pb-4 items-center'>
        <div className='flex rounded-3xl border w-10 h-10 justify-center items-center'>
          <RenderIcon index={index} fontSize='16px' className={'grIcon'} />
        </div>
        <div className='text-xl'>{item.title}</div>
      </div>
      <div className={'flex-1'} />
      <p>{item.detail}</p>
    </div>
  )
}

// prep slim features trunc
const slimFeatures = strings.features.filter((_, i) => {
  return i < 6
})

const FeaturesList = ({
  alternative,
  all,
}: {
  alternative?: boolean
  all?: boolean
}) => {
  const featureList = all ? slimFeatures : strings.features

  return (
    <SectionContainer>
      <div className={alternative ? 'pb-2' : undefined}>
        {alternative ? (
          <Header3>Some more of the features.</Header3>
        ) : (
          <Header2>{strings.headers[2][0]}</Header2>
        )}
        {alternative ? null : <p className='pb-2'>{strings.headers[2][1]}</p>}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
        <>
          {featureList.map((item: any, index: number) => (
            <FeatureItem item={item} index={index} key={item.id} />
          ))}
        </>
      </div>
      {all ? null : (
        <div className='flex py-5 place-content-center text-center underline'>
          <Link href={'/features'}>Discover more features</Link>
        </div>
      )}
    </SectionContainer>
  )
}

export { FeaturesList }
