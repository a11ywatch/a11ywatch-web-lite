import React from 'react'
import { AuthMenu, Button, FormDialog } from '@app/components/general'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { GrConnect, GrDocumentTest, GrLineChart, GrSort } from 'react-icons/gr'

// right bar
export type RightBarProps = {
  onQueryEvent(x: any): void
  onScanAllEvent?(x: any): void // scan all websites
  onWebsiteSort(x: any): void
  onAnalyticsEvent(): void
  queryModalVisible?: boolean
  sortModalVisible?: boolean
  sortCapable?: boolean
}

const btnStyles = 'gap-x-1.5 flex place-items-center'

export const RightBar = ({
  onWebsiteSort,
  sortCapable,
  onQueryEvent,
  onScanAllEvent,
  queryModalVisible,
  sortModalVisible,
  onAnalyticsEvent,
}: RightBarProps) => {
  return (
    <div className='flex flex-wrap gap-x-2 gap-y-1 text-sm'>
      <Button
        onClick={onQueryEvent}
        className={`${btnStyles}${queryModalVisible ? ' border-blue-800' : ''}`}
      >
        Scan
        <GrDocumentTest className='grIcon' />
      </Button>
      {onScanAllEvent ? (
        <Button onClick={onScanAllEvent} className={btnStyles}>
          Sync <GrConnect className='grIcon' />
        </Button>
      ) : null}
      {sortCapable ? (
        <>
          <Button onClick={onAnalyticsEvent} className={btnStyles}>
            Analytics
            <GrLineChart className='grIcon' />
          </Button>
          <Button
            onClick={onWebsiteSort}
            className={`${btnStyles}${
              sortModalVisible ? ' border-blue-800' : ''
            }`}
          >
            Sort
            <GrSort className='grIcon' />
          </Button>
        </>
      ) : null}
      <FormDialog buttonTitle={`Subscribe`} icon buttonStyles={btnStyles} />
      <AuthMenu authenticated settings />
    </div>
  )
}
