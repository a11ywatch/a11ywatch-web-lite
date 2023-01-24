import React, {
  FC,
  useCallback,
  useState,
  useReducer,
  useEffect,
  Fragment,
} from 'react'
import {
  Button,
  Link,
  NavBar,
  PageTitle,
  ProfileCell,
  Spacer,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { AppManager } from '@app/managers'
import { useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
// import { useBillingDisplay } from '@app/data/formatters'
import { roleMap } from '@app/utils/role-map'
import { CancelSubscriptionModal } from '@app/components/general/cancel-model'
import { usePaymentsHook } from '@app/data/external/payments/use-payments'
import { TextField } from '@app/components/general/text-field'
import { outlineStyles } from '@app/styles/buttons/outline'
import { getUsageLimitsMs } from '@a11ywatch/website-source-builder'

interface PasswordState {
  newPassword?: string
  currentPassword?: string
  changePassword: boolean // display the change password form
}

const initialPasswordState: PasswordState = {
  newPassword: '',
  currentPassword: '',
  changePassword: false,
}

interface PasswordAction {
  payload?: string
  type: 'toggleVisiblility' | 'mutateCurrent' | 'mutateNew' | 'reset'
}

type PasswordReducer = (
  state: PasswordState,
  action: PasswordAction
) => PasswordState

const passwordReducer: PasswordReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'toggleVisiblility': {
      return { ...state, changePassword: !state.changePassword }
    }
    case 'mutateCurrent': {
      return { ...state, currentPassword: payload }
    }
    case 'mutateNew': {
      return { ...state, newPassword: payload }
    }
    case 'reset': {
      return { ...initialPasswordState }
    }
    default: {
      return state
    }
  }
}

// url to manage billing page
const MANAGE_BILLING = process.env.NEXT_PUBLIC_MANAGE_BILLING_URL
const classes = { row: 'flex place-items-center', submit: 'min-w-[175px]' }

const Profile: FC<PageProps> = ({ name }) => {
  const { data, loading, updateUser, updateUserData } = useUserData(
    true,
    'profile'
  )
  const { onCancelConfirm } = usePaymentsHook(true)

  const [{ changePassword, currentPassword, newPassword }, dispatch] =
    useReducer(passwordReducer, Object.assign({}, initialPasswordState))

  // todo: reducer
  const [changeEmail, setChangeEmail] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')
  const [cancelModalOpen, setOpen] = useState<boolean>(false)

  const { user } = data ?? { user: { invoice: null } }
  // const { invoice } = user ?? { invoice: null }

  // const { billingtitle, billingHeadDisplay } = useBillingDisplay(invoice)

  const onChangeCurrent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'mutateCurrent', payload: e.target.value })
    },
    [dispatch]
  )

  const onChangeNew = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'mutateNew', payload: e.target.value })
    },
    [dispatch]
  )

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewEmail(e.target.value)
    },
    [setNewEmail]
  )

  const updatePassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      await updateUser({
        variables: {
          password: currentPassword,
          newPassword,
        },
      }).catch((e) => {
        console.error(e)
      })
    },
    [updateUser, currentPassword, newPassword]
  )

  const updateEmail = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      await updateUser({
        variables: {
          email: newEmail,
        },
      }).catch((e) => {
        console.error(e)
      })
    },
    [updateUser, newEmail]
  )

  const togglePassword = useCallback(() => {
    dispatch({ type: 'toggleVisiblility' })
  }, [dispatch])

  const toggleEmail = useCallback(() => {
    setChangeEmail((p) => !p)
  }, [setChangeEmail])

  useEffect(() => {
    if (updateUserData?.updateUser?.success) {
      AppManager.toggleSnack(
        true,
        updateUserData?.updateUser?.message,
        'success'
      )

      dispatch({ type: 'reset' })

      setNewEmail('')
      setChangeEmail(false)
    }
  }, [updateUserData, dispatch, setNewEmail, setChangeEmail])

  const email = updateUserData?.updateUser?.user?.email ?? user?.email

  // todo: add invoices in panel

  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }
  // cancel the payment subscription
  const onCancelEvent = async () => {
    onClose()
    await onCancelConfirm()
  }

  const maxUsage = getUsageLimitsMs(user?.role || 0)
  const baseUsage = user?.scanInfo?.totalUptime
    ? (Number(user.scanInfo.totalUptime) / maxUsage) * 100
    : 0

  return (
    <Fragment>
      {user?.passwordRequired ? (
        <div className='text-center py-2'>
          <p className='text-base'>
            Password reset required. Please change your password now
          </p>
        </div>
      ) : null}
      <NavBar backButton title={name} notitle authenticated={!!user} />
      <div className='container mx-auto px-8'>
        <PageTitle title={'Your Profile'} />
        <Box className='space-y-3 py-4'>
          <div className='border-b pb-4'>
            <ProfileCell
              title={'Email'}
              skeletonLoad={!user && loading}
              subTitle={email}
            />
            <ProfileCell
              title={'Account Type'}
              skeletonLoad={!user && loading}
              subTitle={roleMap(user?.role)}
            />
            {user && user.role ? (
              <ProfileCell
                title={'Active Subscription'}
                skeletonLoad={!user && loading}
                subTitle={user?.activeSubscription ? 'Yes' : 'No'}
              />
            ) : null}
            <ProfileCell
              title={'Alerts Enabled'}
              skeletonLoad={!user && loading}
              subTitle={user?.alertEnabled ? 'Yes' : 'No'}
            />
            <ProfileCell
              title={'Uptime Used'}
              skeletonLoad={!user && loading}
              subTitle={`${Math.min(baseUsage, 100).toFixed(0)}%`}
            />
            {user?.activeSubscription ? (
              <ProfileCell
                title={'Account Status'}
                skeletonLoad={!user && loading}
                subTitle={user?.paymentSubscription?.status?.toUpperCase()}
              />
            ) : null}
            <div className='space-y-2 py-4'>
              {!user && loading ? (
                <TextSkeleton width='8%' />
              ) : (
                <>
                  {changePassword ? (
                    <div className={classes.row}>
                      <form
                        onSubmit={updatePassword}
                        noValidate
                        className={`flex flex-col p-2 space-y-1 bg-gray-100 border rounded`}
                      >
                        <TextField
                          autoFocus
                          onChange={onChangeCurrent}
                          minLength={6}
                          pattern={'password'}
                          autoComplete='current-password'
                          value={currentPassword}
                          id='current_password'
                          placeholder='Current Password'
                          type='password'
                          required
                        />
                        <TextField
                          onChange={onChangeNew}
                          minLength={6}
                          pattern={'password'}
                          autoComplete='new-password'
                          value={newPassword}
                          id='new_password'
                          placeholder='New Password'
                          type='password'
                          required
                        />
                        <Spacer />
                        <div className='flex space-x-2'>
                          <Button
                            onClick={togglePassword}
                            className={classes.submit}
                            type='button'
                          >
                            Cancel
                          </Button>

                          <Button
                            onClick={updatePassword}
                            className={classes.submit}
                            type='submit'
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  ) : null}
                  {changeEmail ? (
                    <div className={classes.row}>
                      <form
                        onSubmit={updateEmail}
                        noValidate
                        className={`flex flex-col p-2 bg-gray-100 border rounded`}
                      >
                        <TextField
                          autoFocus
                          onChange={onChangeEmail}
                          minLength={6}
                          pattern={'email'}
                          autoComplete='current-email'
                          value={newEmail}
                          id='email'
                          placeholder='New Email'
                          type='email'
                          required
                        />
                        <Spacer />
                        <div className='flex space-x-2'>
                          <Button
                            onClick={toggleEmail}
                            className={'border-none'}
                            type='button'
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={updateEmail}
                            className={classes.submit}
                            type='submit'
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  ) : null}
                </>
              )}
              <div className='flex space-x-2'>
                {!changePassword ? (
                  <Button
                    onClick={togglePassword}
                    type='button'
                    className={'border-2 md:rounded md:min-w-[180px]'}
                  >
                    Change Password
                  </Button>
                ) : null}
                {!changeEmail ? (
                  <Button
                    onClick={toggleEmail}
                    className={'border-2 md:rounded md:min-w-[180px]'}
                    type='button'
                  >
                    Change Email
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
          <div className='py-5 space-y-10'>
            {user?.activeSubscription && MANAGE_BILLING ? (
              <div>
                <Link
                  href={`${MANAGE_BILLING}?prefilled_email=${encodeURIComponent(
                    email
                  )}`}
                  rel='noreferrer'
                  target='_blank'
                  className={outlineStyles}
                >
                  Manage Billing
                </Link>
              </div>
            ) : null}
            <div>
              <Link href='/payments' className={outlineStyles}>
                {user?.activeSubscription ? 'Upgrade / Downgrade' : 'Upgrade'}
              </Link>
            </div>
            {user?.activeSubscription ? (
              <div className={`py-40`}>
                <Button onClick={onOpen} className={'border-none text-red-800'}>
                  Cancel Subscription
                </Button>
              </div>
            ) : null}
          </div>
        </Box>
      </div>
      <CancelSubscriptionModal
        onClose={onClose}
        open={cancelModalOpen}
        onCancelEvent={onCancelEvent}
        role={user?.role}
      />
    </Fragment>
  )
}

export default metaSetter(
  { Profile },
  {
    gql: true,
  }
)
