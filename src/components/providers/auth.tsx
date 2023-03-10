'use client'

import {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  PropsWithChildren,
  Fragment,
} from 'react'
import { UserManager } from '@app/managers'
import { ping } from '@app/utils'

const defaultAccount = {
  activeSubscription: false,
  authed: false,
  alertEnabled: false,
  inited: false,
}

const AppContext = createContext({
  account: defaultAccount,
  setAccountType: (_x: typeof defaultAccount) => {},
})

export const AuthProviderBase = AppContext.Provider

// Determine the initial account type via load client-side
export const AuthProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccountType] = useState<{
    activeSubscription: boolean
    authed: boolean
    alertEnabled: boolean
    inited: boolean
  }>({
    activeSubscription: false,
    authed: false,
    alertEnabled: false,
    inited: false,
  })

  useEffect(() => {
    const authenticated = !!UserManager.token

    setAccountType({
      activeSubscription: !UserManager.freeAccount,
      authed: authenticated,
      alertEnabled: !!UserManager?.user?.alertsEnabled,
      inited: true,
    })

    authenticated && queueMicrotask(ping)
  }, [])

  return (
    <AuthProviderBase value={{ account, setAccountType }}>
      {children}
    </AuthProviderBase>
  )
}

export const AuthProvider: FC<PropsWithChildren<{ load?: boolean }>> = ({
  children,
  load,
}) => {
  if (!load) {
    return <Fragment>{children}</Fragment>
  }
  return <AuthProviderWrapper>{children}</AuthProviderWrapper>
}

export function useAuthContext() {
  return useContext(AppContext)
}
