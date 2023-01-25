import React from 'react'
import { settingsHeadingStyle } from '@app/styles/headings'
import { Header3 } from '../general/header'
import { Link } from '../stateless/typo/link'
import type { User } from '@app/types'

export const ActionsViewView = ({ user }: { user?: User }) => {
  return user?.activeSubscription ? (
    <div className='py-2 pb-6 gap-y-2 border-t'>
      <div className='py-3'>
        <Header3 className={settingsHeadingStyle}>Page Actions</Header3>
        <p className=' text-sm'>Run actions on pages before audits.</p>
      </div>
      <Link href={'/web-actions'} className={'flex gap-x-2 place-items-center'}>
        View Actions
      </Link>
    </div>
  ) : null
}
