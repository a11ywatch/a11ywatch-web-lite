import { FC, memo, PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { useUserData } from '@app/data'
import { NavBar } from '../navigation/navbar'
import { ConfirmEmail } from '../../alerts'
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

export function NavigationBar({ title = '', authenticated }: any) {
  return (
    <NavBar authenticated={authenticated} title={title}>
      <span className={'flex flex-1 place-content-end'}>
        <SearchBar />
      </span>
    </NavBar>
  )
}

export const DrawerW: FC<PropsWithChildren> = ({ children }) => {
  const { data: dataSourceMap, sendConfirmEmail } = useUserData()
  const user = dataSourceMap?.user

  return (
    <>
      <DrawerHead />
      <div className={'flex overflow-x-inherit md:overflow-x-hidden'}>
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
      </div>
      <DynamicModal />
      <MiniPlayer />
    </>
  )
}

export const Drawer = memo(DrawerW)
