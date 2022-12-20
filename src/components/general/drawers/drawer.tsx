import { memo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useUserData } from '@app/data'
import { UpgradeBanner } from '@app/components/general/upgrade-banner'
import { AuthedMenu } from '../navigation'
import { NavBar } from '../navigation/navbar'
import { FixedCopyRight } from '../fixed-copy-right'
import { ConfirmEmail } from '../../alerts'
import { IssueFeed } from '../../feed'
import { SearchBar } from '../searchbar'
import { RefBanner } from '../ref-banner'

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
      <div className='fixed flex flex-col w-[inherit] overflow-hidden h-full bg-lightgray z-10 space-y-3 place-content-between'>
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
      <Head>
        <style>
          {`html { overflow: hidden; }
.scrollbar::-webkit-scrollbar { width: 12px; }
.scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #f2f4f7;
}
.scrollbar::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    border: 2px solid #ebedf2;
}
@media (any-pointer: coarse) {
  ul a {
    padding:inherit;
  }
}`}
        </style>
      </Head>
      <>
        <div className={'flex overflow-x-inherit md:overflow-x-hidden'}>
          <DrawerWrapper route={route} title={title} loading={loading} />
          <main className={'flex-1 overflow-auto'} id='main-content'>
            <div
              className={'px-3 md:px-4 scrollbar overflow-auto max-h-screen'}
            >
              <RefBanner />
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
    </>
  )
}

export const Drawer = memo(DrawerW)
