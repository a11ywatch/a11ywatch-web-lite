import { FC, Fragment, PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export const HeadlessFullScreenModal: FC<
  PropsWithChildren<{
    size?: 'medium' | 'full'
    open: boolean
    onClose(x?: any): any
  }>
> = ({ children, open, onClose, size = 'full' }) => {
  const modalSize = size === 'medium' ? 'max-w-md' : ''

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 dark:bg-gray-700 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-y-full'
                enterTo='translate-y-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-y-0'
                leaveTo='translate-y-full'
              >
                <Dialog.Panel
                  className={`pointer-events-auto relative w-screen ${modalSize}`}
                >
                  <div className='flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl'>
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
