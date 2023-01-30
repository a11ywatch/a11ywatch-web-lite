import { Menu, Transition } from '@headlessui/react'
import { Fragment, PropsWithChildren, FC } from 'react'
import { CgProfile } from 'react-icons/cg'
import { GrMoreVertical, GrSettingsOption } from 'react-icons/gr'

const btnClassName = 'grIcon h-5 w-5'

export const MenuList: FC<
  PropsWithChildren<{ more?: boolean; settings?: boolean }>
> = ({ children, more, settings }) => {
  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button
            className={`justify-center rounded-full px-2 py-2 text-sm font-medium hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            {settings ? (
              <GrSettingsOption title='more options' className={btnClassName} />
            ) : more ? (
              <GrMoreVertical title='more options' className={btnClassName} />
            ) : (
              <CgProfile className={btnClassName} title='profile menu' />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className={`absolute right-0 mt-1 ${
              more ? 'w-60' : 'w-44'
            } origin-top-right divide-y divide-gray-100 rounded-md bg-gray-50 dark:bg-black shadow-lg ring-1 z-10 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className='border rounded-sm'>{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
