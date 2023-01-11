import { FC, memo, PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { useUserData } from '@app/data'
import { ConfirmEmail } from '../../alerts'
import { RefBanner } from '../ref-banner'
import { DrawerHead } from './drawer-head'

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

  return (
    <>
      <DrawerHead />
      <div className={'flex overflow-x-inherit md:overflow-x-hidden'}>
        <main className={'flex-1 overflow-auto'} id='main-content'>
          <div
            className={'px-3 md:px-4 pb-28 md:pb-16 overflow-auto max-h-screen'}
          >
            <RefBanner />
            {children}
          </div>
          <ConfirmEmail
            sendEmail={sendConfirmEmail}
            visible={!!user?.loggedIn && !user?.emailConfirmed}
          />
        </main>
      </div>
      <DynamicModal />
      <MiniPlayer />
    </>
  )
}

export const DashboardDrawer = memo(DrawerW)
