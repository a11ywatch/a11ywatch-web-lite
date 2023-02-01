'use client'

import { SyntheticEvent } from 'react'
import { observer } from 'mobx-react-lite'

import { AppManager } from '@app/managers'
import { Link } from './link'
import { Button } from './buttons'

interface SnackProps {
  topLevel?: boolean
  snackID?: string
  adjustPlacement?: boolean // adjust the position to avoid overlaps
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

const SnackBarComponent = ({
  topLevel,
  snackID,
  adjustPlacement,
}: SnackProps) => {
  const snackStyle =
    !!AppManager.snackbar.open && !(topLevel && AppManager.modalActive)
      ? `transition transform fixed z-100 ${
          adjustPlacement ? 'bottom-52' : 'bottom-0'
        } inset-x-0 pb-2 sm:pb-5 scale-100 translate-y-0 ease-out duration-500 z-30`
      : 'hidden'
  const id = snackID ?? 'message-id'

  return (
    <div
      aria-describedby={id}
      className={snackStyle}
      aria-hidden={!AppManager.snackbar.open}
    >
      <div
        className={`min-w-[50vw] max-w-screen-xl mx-auto px-2 sm:px-4 overflow-hidden ${
          AppManager.snackbar.type === 'error' ? 'border-red-500' : ''
        } flex bg-white dark:bg-black rounded space-x-4 p-4 place-items-center place-content-between border shadow`}
      >
        <div className='flex gap-x-1.5 place-items-center place-content-between'>
          <div
            id={id}
            className={`text-base line-clamp-2 ${
              AppManager.snackbar.type === 'error' ? 'text-red-600' : ''
            }`}
          >
            {AppManager.snackbar.title}
          </div>
          {AppManager.snackbar.showBtn ? (
            <Link className={'font-medium text-[#3b82f6]'} href='/payments'>
              UPGRADE ACCOUNT
            </Link>
          ) : null}
        </div>
        {!AppManager.snackbar.autoClose ? (
          <Button onClick={handleClose} className={'border-0 md:py-2'}>
            Dismiss
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export const SnackBar = observer(SnackBarComponent)
