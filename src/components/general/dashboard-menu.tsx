import React from 'react'
import { AuthMenu, Button, EmptyDialogButton } from '@app/components/general'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { GrConnect, GrDocumentTest, GrLineChart, GrSort } from 'react-icons/gr'
import dynamic from 'next/dynamic'

const FormDialog = dynamic(
  () => import('../general/form-dialog').then((mod) => mod.FormDialog),
  {
    ssr: false,
    loading: () => (
      <EmptyDialogButton
        buttonStyles={btnStyles}
        icon
        buttonTitle={<span className='sr-only'>Subscribe</span>}
        iconButton
      />
    ),
  }
)

// right bar
export type RightBarProps = {
  onQueryEvent(x: any): void
  onScanAllEvent?(x: any): void // scan all websites
  onWebsiteSort(x: any): void
  onAnalyticsEvent(): void
  queryModalVisible?: boolean
  sortModalVisible?: boolean
  premiumEnabled?: boolean // used to detect prem atm
}

const btnStyles =
  'gap-x-1.5 flex place-items-center hover:border-blue-800 hover:text-blue-800'

export const RightBar = ({
  onWebsiteSort,
  premiumEnabled,
  onQueryEvent,
  onScanAllEvent,
  queryModalVisible,
  sortModalVisible,
  onAnalyticsEvent,
}: RightBarProps) => {
  return (
    <div className='flex flex-1 flex-wrap gap-x-2 gap-y-1.5 text-sm place-content-end'>
      <Button
        onClick={onQueryEvent}
        className={`${btnStyles}${
          queryModalVisible ? ' border-blue-800 text-blue-800' : ''
        }`}
        iconButton
        title='Perform direct scans against urls'
        border
      >
        <span className='sr-only'>Scan</span>
        <GrDocumentTest className='grIcon text-xs' />
      </Button>
      {onScanAllEvent ? (
        <Button
          onClick={onScanAllEvent}
          className={btnStyles}
          iconButton
          title='Sync all websites'
          border
        >
          <span className='sr-only'>Sync</span>
          <GrConnect className='grIcon text-xs' />
        </Button>
      ) : null}
      {premiumEnabled ? (
        <>
          <Button
            onClick={onAnalyticsEvent}
            className={btnStyles}
            iconButton
            disabled={!premiumEnabled}
            border
            title={'View all website analytics'}
          >
            <span className='sr-only'>Analytics</span>
            <GrLineChart className='grIcon text-xs' />
          </Button>
          <Button
            disabled={!premiumEnabled}
            onClick={onWebsiteSort}
            iconButton
            title={'Sort websites'}
            border
            className={`${btnStyles}${
              sortModalVisible ? ' border-blue-800' : ''
            }`}
          >
            <span className='sr-only'>Sort</span>
            <GrSort className='grIcon text-xs' />
          </Button>
        </>
      ) : null}
      <FormDialog
        buttonTitle={<span className='sr-only'>Subscribe</span>}
        buttonStyles={`flex place-items-center ${btnStyles}`}
        iconButton
        icon
      />
      <AuthMenu authenticated settings />
    </div>
  )
}
