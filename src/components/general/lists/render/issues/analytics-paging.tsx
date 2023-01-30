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
  const issueSource = useMemo(
    () => (liveData?.length ? liveData : data) || [],
    [liveData, data]
  )
  const [issueList, stats] = useMemo(() => {
    const items: Analytic[] = []
    let errorCount = 0

    if (issueSource) {
      const base = (issueIndex + 1) * 10

      for (let i = base - 10; i < base; i++) {
        const item = issueSource[i]
        if (!item) {
          break
        }
        if (typeof item.errorCount === 'number') {
          errorCount += item.errorCount
        }
        items.push(item)
      }
    }

    return [items, { errorCount: errorCount }]
  }, [issueIndex, issueSource])

  const onPrevSelect = () => {
    if (issueIndex) {
      setIndex((x: number) => x - 1)
    }
  }

  const idx = (issueIndex + 1) * 10
  const blocked = issueSource.length < idx

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
            <ul className='list-none space-y-0.5'>
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
            className={` ${issueIndex ? 'visible' : 'hidden'}`}
          >
            <GrFormPreviousLink className='grIcon' />
          </Button>
          <Button
            iconButton
            disabled={loading}
            onClick={onLoadEvent}
            className={` ${!blocked ? 'visible' : 'hidden'}`}
          >
            <GrFormNextLink className='grIcon' />
          </Button>
        </div>
      </div>
    </>
  )
}

export const RenderInnerAnalyticsPaging = memo(RenderInnerAnalyticsWrapper)
