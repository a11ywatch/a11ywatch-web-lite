import { memo } from 'react'
import { GrFlag, GrCompliance, GrDown, GrSync, GrUp } from 'react-icons/gr'
import { IssueTitle } from './title'
import type { FeedComponentProps } from './interface'

const thumbSize = { width: 12, height: 12 }

// heading block for feed entry displaying website title that can toggle parent list.
export const FeedHeadingComponent = ({
  onToggleSection,
  onScanEvent,
  pageUrl,
  sectionHidden,
  totalIssues,
  highLight,
}: Partial<FeedComponentProps> & {
  onToggleSection(x: (x: boolean) => boolean): void
  sectionHidden?: boolean
  pageUrl: string
  totalIssues: number
  highLight?: boolean
}) => {
  const onScan = async () => {
    if (typeof onScanEvent === 'function') {
      try {
        await onScanEvent(pageUrl)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const onToggle = () => onToggleSection((v: boolean) => !v)

  const hlight = highLight || totalIssues === 0

  return (
    <div className={'flex space-x-1 h-15'}>
      <div className='flex-1 px-4 py-2 truncate space-y-1'>
        <IssueTitle pageUrl={pageUrl} />
        <div className='flex space-x-1 place-items-center text-sm'>
          <div
            className={
              hlight
                ? "after:content-['_*_'] after:relative after:top-0.5"
                : undefined
            }
          >
            {totalIssues} issue{totalIssues === 1 ? '' : 's'}
          </div>
          {hlight ? (
            highLight ? (
              <GrFlag
                style={thumbSize}
                className={'grIcon'}
                title={'Page contains errors'}
              />
            ) : (
              <GrCompliance
                style={thumbSize}
                className={'grIcon'}
                title={'Page passes all tests'}
              />
            )
          ) : null}
        </div>
      </div>
      <div className='flex'>
        {onScanEvent ? (
          <button
            onClick={onScan}
            title={`Scan ${pageUrl} and sync`}
            className='px-5 py-1 hover:opacity-70'
          >
            <GrSync className={'text-base grIcon'} />
          </button>
        ) : null}
        {totalIssues ? (
          <button
            onClick={onToggle}
            className='px-5 py-1 hover:opacity-70'
            title={`Toggle issues ${
              sectionHidden ? 'visible' : 'hidden'
            } for ${pageUrl}`}
          >
            {sectionHidden ? (
              <GrDown className={'text-base grIcon'} />
            ) : (
              <GrUp className={'text-base grIcon'} />
            )}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export const FeedHeading = memo(FeedHeadingComponent)
