import { FC, memo, useMemo, useRef, useState } from 'react'
import { useAnalyticsData } from '@app/data/external/analytics/analytics'
import { InnerWrapper } from '../../list-wrapper'
import { Button } from '../../../buttons'
import { AnalyticsList } from './analytics-list'
import type { Analytic } from '@app/types'
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'

type AnalyticsPagingProps = {
  pageUrl?: string
  liveData?: Analytic[]
  open?: boolean
}

// paging issues for website dashboard cell
const RenderInnerAnalyticsWrapper: FC<AnalyticsPagingProps> = ({
  liveData,
  pageUrl,
  open: defaultOpen,
}) => {
  const [issueIndex, setIndex] = useState<number>(0)
  const { data, loading, onLoadMore } = useAnalyticsData(pageUrl, false) // todo: use onComplete callback for next page
  const offsetTracking = useRef<{ last: number; next: number }>({
    last: 0,
    next: 0,
  })

  const { issueSource, liveDataExist } = useMemo(() => {
    const liveDataExist = liveData?.length
    return {
      issueSource: (liveDataExist ? liveData : (data as Analytic[])) || [],
      liveDataExist,
    }
  }, [liveData, data])

  const [issueList, stats] = useMemo(() => {
    let base = (issueIndex + 1) * 10

    if (liveDataExist && issueIndex) {
      // set the last offset value
      offsetTracking.current.last = offsetTracking.current.next
      base += offsetTracking.current.next
    }

    const items: Analytic[] = new Array(Math.max(issueSource.length, 10))

    let errorCount = 0
    let warningCount = 0
    // iterator
    let j = 0
    let i = base - 10
    // offset position
    let offsetTracker = 0

    // loop until ten items filled
    for (; j < 10; i++) {
      const item = issueSource[i]

      if (!item || j === 10) {
        break
      }

      if (item.errorCount || item.warningCount) {
        items[j] = item
        errorCount += item.errorCount
        warningCount += item.warningCount
        j++
      } else {
        offsetTracker += 1
      }
    }

    offsetTracking.current.next = offsetTracker
    items.length = j

    return [items, { errorCount, warningCount }]
  }, [issueIndex, issueSource, liveDataExist, offsetTracking])

  const onPrevSelect = () => {
    if (issueIndex) {
      if (liveDataExist) {
        offsetTracking.current.next = offsetTracking.current.last
      }
      setIndex((x: number) => x - 1)
    }
  }

  const idx = (issueIndex + 1) * 10

  const onLoadEvent = async () => {
    // get the next set of data
    if (idx === issueSource.length) {
      onLoadMore && (await onLoadMore())
    }
    setIndex((x: number) => x + 1)
  }

  return (
    <>
      <div className='flex flex-col place-content-around'>
        <div className='h-[450px]'>
          <InnerWrapper data={issueSource.length} loading={loading}>
            <ul className='list-none space-y-0.5 py-0.5'>
              {issueList.map((page) => (
                <AnalyticsList
                  key={page?._id || page.pageUrl}
                  open={defaultOpen}
                  totalErrors={stats.errorCount}
                  {...page}
                />
              ))}
            </ul>
          </InnerWrapper>
        </div>
        <div
          className={`${
            issueSource.length > 1 ? '' : 'hidden'
          } text-right flex place-items-center place-content-end p-2 gap-x-2`}
        >
          <Button
            iconButton
            onClick={onPrevSelect}
            className={issueIndex ? 'visible' : 'hidden'}
          >
            <GrFormPreviousLink className='grIcon' />
          </Button>
          <Button
            iconButton
            disabled={loading}
            onClick={onLoadEvent}
            className={
              issueSource.length < idx || issueList.length < 10
                ? 'hidden'
                : 'visible'
            }
          >
            <GrFormNextLink className='grIcon' />
          </Button>
        </div>
      </div>
    </>
  )
}

export const RenderInnerAnalyticsPaging = memo(RenderInnerAnalyticsWrapper)
