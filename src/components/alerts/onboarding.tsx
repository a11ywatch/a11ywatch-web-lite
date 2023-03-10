import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { strings } from '@app-strings'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { GrNotification } from 'react-icons/gr'
import { Button } from '../general'
import { Header3 } from '../general/header'
import { useInteractiveContext } from '../providers/interactive'
import { ModalType } from '@app/data/enums'

export function Onboarding() {
  const router = useRouter()
  const { setModal } = useInteractiveContext()

  const onTakePress = useCallback(async () => {
    setModal({ open: false, modalType: ModalType.empty, url: '' })
    await router.push('/settings#notification-selector')
  }, [setModal, router])

  const onClose = () => {
    setModal({ open: false, modalType: ModalType.empty, url: '' })
  }

  return (
    <div className={'px-4 py-4 space-y-4'}>
      <div className='gap-y-3'>
        <GrNotification fontSize='large' className='grIcon' />
        <Header3>{strings.onboarding.limitEmailsTitle}</Header3>
        <p className='text-sm'>{strings.onboarding.limitEmailsDetail}</p>
      </div>
      <div className='space-x-3'>
        <Button
          onClick={onTakePress}
          className={`border-blue-700 text-blue-700`}
        >
          Take me there
        </Button>
        <Button className={'bg-transparent border-0'} onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
