import { memo } from 'react'
import dynamic from 'next/dynamic'
import { useUserData } from '@app/data'
import { UpgradeBanner } from '@app/components/general/upgrade-banner'
import { AuthedMenu } from '../navigation'
import { NavBar } from '../navigation/navbar'
import { FixedCopyRight } from '../fixed-copy-right'
import { ConfirmEmail } from '../../alerts'
import { IssueFeed } from '../../feed'
import { SearchBar } from '../searchbar'
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

export type DrawerWrapperProps = {
  route?: string
  title?: string
  loading?: boolean
}

function MainDrawerContainerComponent({ route, loading }: DrawerWrapperProps) {
  return (
    <div
      className={`flex flex-col overflow-x-hidden w-[55px] sm:w-[15vw] md:w-[18vw] lg:w-[250px] max-w-[250px] relative print:hidden overflow-hidden`}
    >
      <div className='fixed flex flex-col w-[inherit] overflow-hidden h-full bg-lightgray dark:bg-inherit z-10 space-y-3 place-content-between'>
        <AuthedMenu route={route} loading={loading} />
        <div>
          <UpgradeBanner />
          <div className='invisible md:visible w-full flex place-content-center py-2 truncate'>
            <FixedCopyRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export const MainDrawerContainer = memo(MainDrawerContainerComponent)

export function DrawerWrapperComponent({
  route: routePath,
  title = '',
  loading,
}: DrawerWrapperProps) {
  return <MainDrawerContainer route={routePath ?? title} loading={loading} />
}

export const DrawerWrapper = memo(DrawerWrapperComponent)

export function NavigationBar({ title = '', authenticated }: any) {
  return (
    <NavBar authenticated={authenticated} title={title}>
      <span className={'flex flex-1 place-content-end'}>
        <SearchBar />
      </span>
    </NavBar>
  )
}

export function DrawerW({ children, route, title }: any) {
  const { data: dataSourceMap, sendConfirmEmail, loading } = useUserData()
  const user = dataSourceMap?.user

  return (
    <>
      <DrawerHead />
      <div className={'flex overflow-x-inherit md:overflow-x-hidden'}>
        {user?.role ? (
          <DrawerWrapper route={route} title={title} loading={loading} />
        ) : null}
        <main className={'flex-1 overflow-auto'} id='main-content'>
          <div
            className={
              'px-3 pt-4 pb-20 scrollbar overflow-auto max-h-screen md:px-4 md:pb-0'
            }
          >
            {children}
          </div>
          <ConfirmEmail
            sendEmail={sendConfirmEmail}
            visible={!!user?.loggedIn && !user?.emailConfirmed}
          />
        </main>
        <IssueFeed />
      </div>
      <DynamicModal />
      <MiniPlayer />
    </>
  )
}

export const Drawer = memo(DrawerW)
