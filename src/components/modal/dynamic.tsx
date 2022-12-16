import { memo } from 'react'
import { GetType } from './helpers'
import { dynamicModalHandler } from '@app/data/models/singletons/modalHandler'
import { HeadlessModal } from './headless'
import { useInteractiveContext } from '../providers/interactive'
import { ModalType } from '@app/data/enums'

export function DynamicModalWrapper() {
  const { modelData, setModal } = useInteractiveContext()
  const { open, modalType } = modelData

  const onClose = () => {
    if (typeof dynamicModalHandler?.onClose === 'function') {
      dynamicModalHandler.onClose()
    }
    setModal({ open: false, modalType: ModalType.empty, url: '' })
  }

  return (
    <HeadlessModal open={!!open} onClose={onClose}>
      <div>
        <GetType modalType={modalType} />
      </div>
    </HeadlessModal>
  )
}

export const DynamicModal = memo(DynamicModalWrapper)
