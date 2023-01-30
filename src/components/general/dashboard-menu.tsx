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
        buttonTitle={`Subscribe`}
        icon
        buttonStyles={btnStyles}
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
    <div className='flex flex-wrap gap-x-1 gap-y-1.5 text-sm'>
      <Button
        onClick={onQueryEvent}
        className={`${btnStyles}${
          queryModalVisible ? ' border-blue-800 text-blue-800' : ''
        }`}
      >
        Scan
        <GrDocumentTest className='grIcon text-xs' />
      </Button>
      {onScanAllEvent ? (
        <Button onClick={onScanAllEvent} className={btnStyles}>
          Sync <GrConnect className='grIcon text-xs' />
        </Button>
      ) : null}
      {premiumEnabled ? (
        <>
          <Button
            onClick={onAnalyticsEvent}
            className={btnStyles}
            disabled={!premiumEnabled}
          >
            Analytics
            <GrLineChart className='grIcon' />
          </Button>
          <Button
            disabled={!premiumEnabled}
            onClick={onWebsiteSort}
            className={`${btnStyles}${
              sortModalVisible ? ' border-blue-800' : ''
            }`}
          >
            Sort
            <GrSort className='grIcon text-xs' />
          </Button>
        </>
      ) : null}
      <FormDialog
        buttonTitle={`Subscribe`}
        icon
        buttonStyles={`flex place-items-center ${btnStyles}`}
      />
      <AuthMenu authenticated settings />
    </div>
  )
}
