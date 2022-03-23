import React, { FC, useCallback, useState, useEffect, Fragment } from 'react'
import {
  Container,
  Typography,
  Button,
  TextField,
  Fade,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Link, NavBar, PageTitle, ProfileCell } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { AppManager } from '@app/managers'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import { useProfileStyles as useStyles } from '@app/styles/pages/profile'
import type { PageProps } from '@app/types'

const Profile: FC<PageProps> = ({ name }) => {
  const classes = useStyles()
  const { data = {}, loading, updateUser, updateUserData } = userData()
  const [changePassword, setChangePassword] = useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const { user } = data

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

  console.log(user)

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
        <Box className='space-y-2'>
          <PageTitle title={'Your Profile'} />
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
          <Link
            href='/payments'
            className={`text-lg font-bold inline-block rounded bg-black text-white px-10 py-4 hover:bg-white hover:text-black hover:outline`}
          >
            Upgrade
          </Link>
          <div className={classes.row}>
            <Typography
              variant='subtitle1'
              component='p'
              className={classes.passwordTitle}
            >
              Password
            </Typography>
            {changePassword ? (
              <IconButton
                className={classes.defaultButton}
                aria-label='Clear update password form'
                onClick={togglePassword}
                color='inherit'
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            ) : null}
          </div>
          {!user && loading ? (
            <TextSkeleton width='8%' />
          ) : (
            <div className={classes.row}>
              {changePassword ? (
                <Fade in={changePassword}>
                  <form
                    onSubmit={updatePassword}
                    noValidate
                    className={classes.form}
                  >
                    <TextField
                      autoFocus
                      onChange={onChangeCurrent}
                      className={classes.input}
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
                      className={classes.input}
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
                    <Button
                      onClick={updatePassword}
                      className={classes.submit}
                      type='submit'
                      variant='outlined'
                    >
                      Submit
                    </Button>
                  </form>
                </Fade>
              ) : (
                <Typography
                  variant='subtitle2'
                  component='p'
                  gutterBottom
                  className={classes.password}
                >
                  ******
                </Typography>
              )}
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
