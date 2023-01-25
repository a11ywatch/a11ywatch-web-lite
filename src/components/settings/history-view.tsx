import React from 'react'
import { Header3 } from '@app/components/general/header'
import { useAuthContext } from '@app/components/providers/auth'
import { HistoryList } from '@app/components/paginated/history'
import { settingsHeadingStyle } from '@app/styles/headings'

export const HistoryView = () => {
  const { account } = useAuthContext()
  const { activeSubscription } = account

  return (
    <div className='py-2 gap-y-2 border-t'>
      <div className='py-3'>
        <Header3 className={settingsHeadingStyle}>History</Header3>
        <p className='text-sm'>The last websites added.</p>
      </div>
      <div
        className={`h-60 ${
          activeSubscription
            ? 'overflow-y-auto'
            : ' flex flex-col place-items-center place-content-center block p-3 h-full'
        }`}
      >
        <>
          {activeSubscription ? (
            <HistoryList />
          ) : (
            <div className='font-medium'>
              Your history will show here after upgrading to a paid plan.
            </div>
          )}
        </>
      </div>
    </div>
  )
}
