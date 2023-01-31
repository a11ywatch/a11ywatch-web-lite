import { FC, memo, useMemo, useState } from 'react'
import { InnerWrapper } from '../../list-wrapper'
import { Button } from '../../../buttons'
import { PagesList } from './pages-list'
import type { Analytic, Pages } from '@app/types'
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'
import { usePagesData } from '@app/data/external/pages/pages'

type PagesPagingProps = {
  pageUrl?: string
  liveData?: Analytic[]
  open?: boolean
  handleMainClick?(): any // modal
}

// paging issues for website dashboard cell
const RenderInnerPagesWrapper: FC<PagesPagingProps> = ({
  liveData,
  pageUrl,
  open: defaultOpen,
  handleMainClick,
}) => {
  const [issueIndex, setIndex] = useState<number>(0)
  const {
    data,
    loading,
    onLoadMorePages: onLoadMore,
  } = usePagesData(pageUrl, false)
  const issueSource = useMemo(
    () => (liveData?.length ? (liveData as Pages[]) : data) || [],
    [liveData, data]
  )
  const [issueList, stats] = useMemo(() => {
    const items: Pages[] = []
    let totalTTL = 0

    if (issueSource) {
      const base = (issueIndex + 1) * 10

      for (let i = base - 10; i < base; i++) {
        const item = issueSource[i]
        if (!item) {
          break
        }
        if (
          item.pageLoadTime &&
          typeof item.pageLoadTime.duration === 'number'
        ) {
          totalTTL += item.pageLoadTime.duration
        }
        items.push(item)
      }
    }

    return [items, { totalTTL }]
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
            <ul className='list-none pr-4 space-y-0.5 py-0.5'>
              {issueList.map((page) => (
                <PagesList
                  key={page?._id ?? page.url ?? page.pageUrl}
                  open={defaultOpen}
                  handleMainClick={handleMainClick}
                  pageInsights={page.pageInsights}
                  pageLoadTime={page.pageLoadTime}
                  online={page.online}
                  domain={page.domain}
                  url={page.url ?? page.pageUrl}
                  totalTTL={stats.totalTTL}
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
            className={`${issueIndex ? 'visible' : 'hidden'}`}
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

export const RenderInnerPagesPaging = memo(RenderInnerPagesWrapper)
