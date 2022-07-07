import React, { memo, useState, FC, useMemo } from 'react'
import { IssueFeedCell } from '../general/cells'
import { issueExtractor } from '@app/utils'
import { FeedHeading } from './heading'
import type { FeedComponentProps } from './interface'
import { FixedSizeList as List } from 'react-window'

// List of issues rendered.
const FeedListComponent: FC<FeedComponentProps> = ({
  onScanEvent,
  issue,
  isHidden,
  fullScreen,
}) => {
  const [sectionHidden, onToggleSection] = useState<boolean>(!!isHidden)
  const pageIssues = issueExtractor(issue) // array of issues extract duplex types

  const Row = ({
    index,
    style,
  }: {
    index: number
    style?: React.CSSProperties
  }) => <IssueFeedCell item={pageIssues[index]} style={style} />

  // full height of screen for window
  const listHeight = typeof window !== 'undefined' ? window.innerHeight : 500

  const itemSize = Math.max(listHeight / 6, 200) // try to fit 6 items per screen viewport
  const issueCount = pageIssues?.length

  const listMainHeight = useMemo(() => {
    if (fullScreen) {
      return listHeight
    }
    if (issueCount <= 6) {
      return itemSize * issueCount
    }
    return listHeight
  }, [fullScreen, itemSize, issueCount, listHeight])

  if (fullScreen) {
    return (
      <ul
        className={`overflow-hidden bg-[rgba(172,182,192,0.06)] w-full h-full`}
      >
        <List
          height={listMainHeight}
          itemCount={issueCount}
          itemSize={itemSize}
          width={'100%'}
        >
          {Row}
        </List>
      </ul>
    )
  }

  return (
    <li>
      <FeedHeading
        onScanEvent={onScanEvent}
        onToggleSection={onToggleSection}
        sectionHidden={sectionHidden}
        issue={issue}
      />

      <ul
        aria-hidden={sectionHidden}
        className={`overflow-x-hidden${
          sectionHidden
            ? ' hidden'
            : ' visible border border-t-0 border-l-0 border-r-0 bg-[rgba(172,182,192,0.06)]'
        }`}
      >
        <List
          height={listMainHeight}
          itemCount={issueCount}
          itemSize={itemSize}
          width={'100%'}
        >
          {Row}
        </List>
      </ul>
    </li>
  )
}

export const FeedList = memo(FeedListComponent)
