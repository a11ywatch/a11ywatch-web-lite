'use client'

import { useEffect, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'

import { Menu } from '@headlessui/react'
import { Link } from './link'
import { UserManager } from '@app/managers'
import { LOGGIN_ROUTES } from '@app/configs'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '@app/mutations'
import { NavItem } from './navigation/nav-item'
import { useWasmContext } from '../providers'
import { FilterManager } from '@app/managers/filters'
import { MenuList } from './menu'

type AuthMenuComponentProps = {
  authenticated?: boolean // user logged in
  settings?: boolean // display settings icon
}

const menuItemCss =
  'w-full px-4 py-2 md:px-4 h-10 flex text-sm place-items-center place-content-start hover:no-underline hover:opacity-70 dark:bg-black'

// auth menu on the right of the ui
export function AuthMenu({ authenticated, settings }: AuthMenuComponentProps) {
  const router = useRouter()
  const [logoutMutation, { data, client }] = useMutation(LOGOUT)
  const { feed } = useWasmContext()

  useEffect(() => {
    if (data) {
      ;async () => {
        try {
          await client?.clearStore()
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [data, client])

  // simple logout
  const logout = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()

    try {
      feed?.clear_data()
      await logoutMutation()
      UserManager.clearUser()
      FilterManager.clearFilters()
    } catch (e) {
      console.error(e)
    }

    await router.push('/')
  }

  if (
    (!authenticated && LOGGIN_ROUTES.includes(router?.pathname)) ||
    authenticated
  ) {
    return (
      <div>
        <MenuList settings={settings}>
          {router?.pathname !== '/profile' ? (
            <Menu.Item>
              {() => (
                <Link href={'/profile'} className={menuItemCss}>
                  Profile
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {router?.pathname !== '/dashboard' ? (
            <Menu.Item>
              {() => (
                <Link href={'/dashboard'} className={menuItemCss}>
                  Dashboard
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {router?.pathname !== '/payments' ? (
            <Menu.Item>
              {() => (
                <Link href={'/payments'} className={menuItemCss}>
                  Payments
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {router?.pathname !== '/settings' ? (
            <Menu.Item>
              {() => (
                <Link href={'/settings'} className={menuItemCss}>
                  Settings
                </Link>
              )}
            </Menu.Item>
          ) : null}
          <div className='border-t'>
            <Menu.Item>
              {() => (
                <button onClick={logout} className={menuItemCss}>
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </MenuList>
      </div>
    )
  }

  // when not authed return login or register
  return (
    <>
      <NavItem route={router?.pathname} href={'/login'} name={'Login'} />
      <NavItem route={router?.pathname} href={'/register'} name={'Register'} />
    </>
  )
}
