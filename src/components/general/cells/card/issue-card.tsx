import { memo } from 'react'
import { LazyMount } from '@app/components/lazy/lazymount'
import { RenderInnerAnalyticsPaging } from '../../lists/render/issues/analytics-paging'
import { Analytic } from '@app/types'

const PageBar = () => {
  return (
    <div className='flex px-4 py-2 flex-1 w-full place-items-center text-xs md:text-sm'>
      <div className='text-left'>Pages</div>
      <div className='flex flex-1 w-full place-content-end text-right'>
        <div className='grid grid grid-cols-2 gap-5 md:gap-[1rem]'>
          <div>Warnings</div>
          <div>Errors</div>
        </div>
      </div>
    </div>
  )
}

// issue card paging
const IssueCardCommponent = ({
  pageUrl,
  liveData,
}: {
  pageUrl: string
  liveData?: Analytic[]
}) => {
  return (
    <div>
      <PageBar />
      <div className='border-t'>
        <LazyMount className={'h-[450px]'}>
          <RenderInnerAnalyticsPaging pageUrl={pageUrl} liveData={liveData} />
        </LazyMount>
      </div>
    </div>
  )
}

export const IssueCard = memo(IssueCardCommponent)
