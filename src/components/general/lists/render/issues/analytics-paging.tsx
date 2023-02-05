import { FC, memo, useMemo, useState } from 'react'
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

  const { issueSource, liveDataExist } = useMemo(() => {
    const liveDataExist = liveData?.length
    return {
      issueSource: (liveDataExist ? liveData : (data as Analytic[])) || [],
      liveDataExist,
    }
  }, [liveData, data])

  const [issueList, stats] = useMemo(() => {
    const base = (issueIndex + 1) * 10
    const sourceSet = liveDataExist
      ? issueSource.filter((item) => item.warningCount || item.errorCount)
      : issueSource
    const items: Analytic[] = new Array(Math.max(sourceSet.length, 10))

    let errorCount = 0
    let warningCount = 0
    // iterator
    let j = 0

    // loop until ten items filled
    for (let i = base - 10; i < base; i++) {
      const item = sourceSet[i]

      if (!item) {
        break
      }

      if (item.errorCount || item.warningCount) {
        errorCount += item.errorCount
        warningCount += item.warningCount
        items[j] = item
        j++
      }
    }

    items.length = j

    return [items, { errorCount, warningCount }]
  }, [issueIndex, issueSource, liveDataExist])

  const onPrevSelect = () => {
    if (issueIndex) {
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
