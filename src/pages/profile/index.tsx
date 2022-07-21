import React, { FC, useCallback, useState, useEffect, Fragment } from 'react'
import {
  Container,
  Typography,
  Button,
  TextField,
  Fade,
} from '@material-ui/core'
import {
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
import { useProfileStyles as useStyles } from '@app/styles/pages/profile'
import type { PageProps } from '@app/types'
import { useBillingDisplay } from '@app/data/formatters'

const Profile: FC<PageProps> = ({ name }) => {
  const classes = useStyles()
  const { data = {}, loading, updateUser, updateUserData } = useUserData(
    true,
    'profile'
  )
  const [changePassword, setChangePassword] = useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const { user } = data
  const { invoice } = user ?? {}

  const { billingtitle, billingHeadDisplay } = useBillingDisplay(invoice)

  const onChangeCurrent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPassword(e.target.value)
    },
    [setCurrentPassword]
  )

  const onChangeNew = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value)
    },
    [setNewPassword]
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

  const togglePassword = useCallback(() => {
    setChangePassword((p) => !p)
  }, [setChangePassword])

  useEffect(() => {
    if (updateUserData?.updateUser?.success) {
      AppManager.toggleSnack(
        true,
        updateUserData?.updateUser?.message,
        'success'
      )
      setCurrentPassword('')
      setNewPassword('')
    }
  }, [updateUserData, setCurrentPassword, setNewPassword])

  return (
    <Fragment>
      {user?.passwordRequired ? (
        <Container
          style={{ paddingTop: 12, paddingBottom: 12, textAlign: 'center' }}
        >
          <Typography>
            Password reset required. Please change your password now
          </Typography>
        </Container>
      ) : null}
      <NavBar backButton title={name} notitle />
      <Container maxWidth='xl'>
        <PageTitle title={'Your Profile'} />
        <Box className='space-y-3'>
          <div className='border-b pb-4'>
            <ProfileCell
              title={'Email'}
              skeletonLoad={!user && loading}
              subTitle={user?.email}
              className={classes.email}
            />
            <ProfileCell
              title={'Account Type'}
              skeletonLoad={!user && loading}
              subTitle={
                !user?.role ? 'Free' : user?.role === 1 ? 'Basic' : 'Premium'
              }
              className={classes.email}
            />
            <ProfileCell
              title={'Active Subscription'}
              skeletonLoad={!user && loading}
              subTitle={user?.activeSubscription ? 'Yes' : 'No'}
              className={classes.email}
            />
            <ProfileCell
              title={'Alerts Enabled'}
              skeletonLoad={!user && loading}
              subTitle={user?.alertEnabled ? 'Yes' : 'No'}
              className={classes.email}
            />
            <ProfileCell
              title={'Uptime Used'}
              skeletonLoad={!user && loading}
              subTitle={`${(user?.scanInfo?.totalUptime
                ? Number(user.scanInfo.totalUptime) / 1000
                : 0
              ).toFixed(0)}s`}
              className={classes.email}
            />
            {user?.activeSubscription ? (
              <ProfileCell
                title={billingHeadDisplay}
                skeletonLoad={!user && loading}
                subTitle={billingtitle}
                className={classes.email}
              />
            ) : null}

            <div className='space-y-2 w-[250px] py-4'>
              {!user && loading ? (
                <TextSkeleton width='8%' />
              ) : (
                <div className={classes.row}>
                  {changePassword ? (
                    <Fade in={changePassword}>
                      <form
                        onSubmit={updatePassword}
                        noValidate
                        className={`flex flex-col p-2 bg-gray-100 border rounded`}
                      >
                        <TextField
                          autoFocus
                          onChange={onChangeCurrent}
                          color='secondary'
                          inputProps={{
                            minLength: 6,
                            pattern: 'password',
                          }}
                          autoComplete='current-password'
                          value={currentPassword}
                          id='current_password'
                          placeholder='Current Password'
                          type='password'
                          required
                        />
                        <TextField
                          onChange={onChangeNew}
                          color='secondary'
                          inputProps={{
                            minLength: 6,
                            pattern: 'password',
                          }}
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
                            variant='outlined'
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </Fade>
                  ) : null}
                </div>
              )}
              {!changePassword ? (
                <Button
                  onClick={togglePassword}
                  className={classes.submit}
                  type='button'
                  variant='outlined'
                >
                  Change Password
                </Button>
              ) : null}
            </div>
          </div>

          <Link
            href='/payments'
            className={`text-lg font-bold inline-block rounded bg-[#0E1116] text-white px-10 py-4 hover:bg-white hover:text-black hover:outline`}
          >
            Upgrade
          </Link>
        </Box>
      </Container>
    </Fragment>
  )
}

export default metaSetter(
  { Profile },
  {
    gql: true,
  }
)