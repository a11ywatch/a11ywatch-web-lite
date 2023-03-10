import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'

import {
  UPDATE_USER,
  SET_PAGESPEED_KEY,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  CONFIRM_EMAIL,
  FILTER_EMAIL_DATES,
} from '@app/mutations'
import { GET_USER, updateCache } from '@app/queries'
import { AppManager } from '@app/managers'
import { EMAIL_VERIFIED_SUBSCRIPTION } from '@app/subscriptions'
import { GET_USER_PROFILE, GET_USER_SETTINGS } from '@app/queries/user'
import { User } from '@app/types'

export const useUserData = (skip?: boolean, query?: 'profile' | 'settings') => {
  const profileQuery = query === 'profile'
  const settingsQuery = query === 'settings'

  const { data, loading } = useQuery(GET_USER, {
    skip: skip || profileQuery || settingsQuery,
    ssr: false,
  })

  const { data: profile, loading: profileLoading } = useQuery(
    GET_USER_PROFILE,
    {
      skip: !profileQuery,
      ssr: false,
    }
  )

  const { data: settings, loading: settingsLoading } = useQuery(
    GET_USER_SETTINGS,
    {
      skip: !settingsQuery,
      ssr: false,
    }
  )

  const [updateUser, { data: updateUserData, loading: updateUserLoading }] =
    useMutation(UPDATE_USER, updateCache as any)

  const [
    forgotPassword,
    { data: forgotPasswordData, loading: forgotPasswordLoading },
  ] = useMutation(FORGOT_PASSWORD)

  const [
    resetPassword,
    { data: resetPasswordData, loading: resetPasswordLoading },
  ] = useMutation(RESET_PASSWORD)

  const [confirmEmail] = useMutation(CONFIRM_EMAIL)
  const [confirmPageSpeed] = useMutation(SET_PAGESPEED_KEY)

  const [
    filterEmailDates,
    { data: filterEmailDatesData, loading: filterEmailDatesLoading },
  ] = useMutation(FILTER_EMAIL_DATES)

  const { data: emailVerified } = useSubscription(EMAIL_VERIFIED_SUBSCRIPTION, {
    skip,
  })

  const sendConfirmEmail = async () => {
    try {
      await confirmEmail()
      AppManager.toggleSnack(
        true,
        'Please check your email for confirmation link',
        'success'
      )
    } catch (e) {
      console.error(e)
    }
  }

  // perform action silent
  const onFilterEmailDates = async (
    dates: number[],
    morning: boolean = false
  ) => {
    await filterEmailDates({
      variables: {
        emailFilteredDates: dates,
        morning,
      },
    }).catch((e: any) => {
      AppManager.toggleSnack(
        true,
        e?.message ?? 'An error occured with filtering dates.',
        'error'
      )
      console.error(e)
    })
  }

  const onConfirmLighthouse = async (pageSpeedApiKey: string) => {
    // TODO: use api to validate
    if (!pageSpeedApiKey || (pageSpeedApiKey && pageSpeedApiKey.length <= 25)) {
      // invalid key
      AppManager.toggleSnack(true, 'Invalid Page Speed key.', 'error')
      return
    }
    const res = await confirmPageSpeed({
      variables: {
        pageSpeedApiKey,
      },
    }).catch((e: any) => {
      console.error(e)
      AppManager.toggleSnack(true, 'Request failed: Invalid key.', 'error')
    })
    if (res) {
      AppManager.toggleSnack(true, 'PageSpeed API key set.', 'success')
    }
  }

  const u = data || profile

  const dataSet = u
    ? {
        ...u,
        user: {
          ...u?.user,
          emailConfirmed: u?.user?.emailConfirmed || emailVerified,
        },
      }
    : {}

  return Object.freeze({
    data: dataSet as { user: User }, // allow data or profile as main source
    forgotPasswordData,
    loading:
      loading ||
      updateUserLoading ||
      forgotPasswordLoading ||
      profileLoading ||
      settingsLoading ||
      resetPasswordLoading,
    updateUser,
    updateUserData,
    forgotPassword,
    resetPassword,
    resetPasswordData,
    sendConfirmEmail,
    onFilterEmailDates,
    filterEmailDatesData:
      filterEmailDatesData?.filterEmailDates?.emailFilteredDates,
    filterEmailDatesLoading,
    onConfirmLighthouse,
    settings,
  })
}
