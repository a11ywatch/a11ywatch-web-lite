'use client'

import { SyntheticEvent } from 'react'
import { observer } from 'mobx-react-lite'

import { AppManager } from '@app/managers'
import { Link } from './link'
import { GrClose } from 'react-icons/gr'
import { Button } from './buttons'

interface SnackProps {
  topLevel?: boolean
  snackID?: string
}

// close the snackbar
const handleClose = (
  event: SyntheticEvent<any, Event>,
  reason: string
): any => {
  event?.preventDefault()
  event?.stopPropagation()
  if (reason === 'clickaway') {
    return
  }
  AppManager.closeSnack()
}

const SnackBarComponent = ({ topLevel, snackID }: SnackProps) => {
  const snackStyle =
    !!AppManager.snackbar.open && !(topLevel && AppManager.modalActive)
      ? 'transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5 scale-100 translate-y-0 ease-out duration-500 z-30'
      : 'hidden'
  const id = snackID ?? 'message-id'

  return (
    <div
      aria-describedby={id}
      className={snackStyle}
      aria-hidden={!AppManager.snackbar.open}
    >
      <div
        className={`min-w-[50vw] max-w-screen-xl mx-auto px-2 sm:px-4 overflow-hidden truncate ${
          AppManager.snackbar.type === 'error' ? 'border border-red-500' : ''
        } overflow-hidden truncate flex bg-white dark:bg-black rounded space-x-4 p-4 place-items-center place-content-between border shadow`}
      >
        <div className='flex flex-1 gap-x-1.5 place-items-center place-content-between'>
          <p
            id={id}
            className={`text-base line-clamp-1 ${
              AppManager.snackbar.type === 'error' ? 'text-red-600' : ''
            }`}
          >
            {AppManager.snackbar.title}
          </p>
          {AppManager.snackbar.showBtn ? (
            <Link className={'font-medium text-[#3b82f6]'} href='/payments'>
              UPGRADE ACCOUNT
            </Link>
          ) : null}
        </div>
        <Button
          aria-label='close'
          onClick={handleClose}
          className={'border-0 md:py-2'}
          iconButton
        >
          <GrClose className='grIcon text-sm' title='Close bar' />
        </Button>
      </div>
    </div>
  )
}

export const SnackBar = observer(SnackBarComponent)
