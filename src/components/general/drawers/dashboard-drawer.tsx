import { FC, memo, PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { useUserData } from '@app/data'
import { ConfirmEmail } from '../../alerts'
import { DrawerHead } from './drawer-head'
import { IssueFeed } from '@app/components/feed'
import { SnackBar } from '../snack-bar'

const DynamicModal = dynamic(
  () => import('../../modal/dynamic').then((mod) => mod.DynamicModal),
  { ssr: false }
)

const MiniPlayer = dynamic(
  () => import('../mini-player').then((mod) => mod.MiniPlayer),
  {
    ssr: false,
  }
)

export const DrawerW: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { data: dataSourceMap, sendConfirmEmail } = useUserData()
  const user = dataSourceMap?.user
  const emailConfirmationVisible =
    user && !!user.loggedIn && !user.emailConfirmed

  return (
    <>
      <DrawerHead />
      <main id='main-content'>
        <div className='flex overflow-x-inherit md:overflow-x-hidden'>
          <div className={'flex-1 overflow-auto'}>
            <div
              className={
                'px-3 md:px-4 pb-28 md:pb-16 overflow-auto max-h-screen'
              }
            >
              {children}
            </div>
            <ConfirmEmail
              sendEmail={sendConfirmEmail}
              visible={emailConfirmationVisible}
            />
          </div>
          <IssueFeed />
        </div>
      </main>
      <DynamicModal />
      <MiniPlayer />
      <SnackBar topLevel adjustPlacement={emailConfirmationVisible} />
    </>
  )
}

export const DashboardDrawer = memo(DrawerW)
