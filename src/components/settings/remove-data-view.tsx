import React from 'react'
import { settingsHeadingStyle } from '@app/styles/headings'
import { GrFormTrash, GrTrash } from 'react-icons/gr'
import { Button } from '../general'
import { Header3 } from '../general/header'

export const RemoveDataView = ({
  onRemoveAllWebsitePress,
  onDeleteAccountPress,
}: {
  onRemoveAllWebsitePress(): Promise<void>
  onDeleteAccountPress(): Promise<void>
}) => {
  return (
    <>
      <div className='py-2 pb-6 gap-y-2 border-t'>
        <div className='py-3'>
          <Header3 className={settingsHeadingStyle}>Delete Data</Header3>
          <p className=' text-sm'>
            This will remove all websites and associated data except your
            account.
          </p>
        </div>
        <Button
          onClick={onRemoveAllWebsitePress}
          className={'flex gap-x-2 place-items-center'}
        >
          Delete Data
          <GrFormTrash className='grIcon' />
        </Button>
      </div>
      <div className='py-2 pb-6 gap-y-2 border-t'>
        <div className='py-3'>
          <Header3 className={settingsHeadingStyle}>Delete Account</Header3>
          <p className=' text-sm'>
            This will remove all data permanently. Make sure to perform backups.
          </p>
        </div>
        <Button
          onClick={onDeleteAccountPress}
          className={'flex gap-x-2 place-items-center text-red-800'}
        >
          Delete Account
          <GrTrash className='grIcon' />
        </Button>
      </div>
    </>
  )
}
