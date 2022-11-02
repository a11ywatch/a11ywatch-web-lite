import { useRef, useEffect, SyntheticEvent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, FormControl, LinearProgress } from '@material-ui/core'
import { AppManager, UserManager } from '@app/managers'
import { useUserData } from '@app/data'
import { MarketingDrawer } from '@app/components/general'
import { useRouter } from 'next/router'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { MarketingShortTitle } from '@app/components/marketing'
import { Header } from '@app/components/general/header'

const useStyles = makeStyles(() => ({
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

function ResetPassword({ name }: PageProps) {
  const router = useRouter()
  const classes = useStyles()
  const {
    loading,
    forgotPassword,
    forgotPasswordData,
    resetPassword,
    resetPasswordData,
  } = useUserData(true)

  const emailRef = useRef<{ value: string }>(null)
  const resetRef = useRef<{ value: string }>(null)

  const [emailState, setEmailState] = useState<string>('')
  const [resetState, setResetState] = useState<string>('')

  const resetSent = forgotPasswordData?.forgotPassword?.email == 'true'
  const title = resetSent ? 'Enter Reset Code' : 'Reset Password'

  useEffect(() => {
    if (resetPasswordData?.resetPassword?.jwt) {
      UserManager.setUser(resetPasswordData.resetPassword)
      ;(async () => {
        await router.push('/dashboard')
      })()
    }
  }, [router, resetPasswordData])

  useEffect(() => {
    if (resetSent) {
      AppManager.toggleSnack(
        true,
        'Please check your email and enter the reset code.',
        'message'
      )
    }
  }, [resetSent])

  const onEmailChange = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e?.preventDefault()
    setEmailState(e?.currentTarget?.value)
  }

  const onResetEvent = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e?.preventDefault()
    setResetState(e?.currentTarget?.value)
  }

  const submit = async (e: SyntheticEvent) => {
    e?.preventDefault()
    try {
      if (resetSent && resetRef?.current?.value) {
        await resetPassword({
          variables: {
            email: emailState,
            resetCode: resetState,
          },
        })
      } else if (emailRef?.current?.value) {
        await forgotPassword({
          variables: {
            email: emailState,
          },
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const FormInputRender = () => {
    if (resetSent) {
      return (
        <FormControl>
          <TextField
            id='resetCode'
            aria-describedby='my-reset-text'
            label='Reset Code'
            type='text'
            autoFocus
            margin='normal'
            variant='outlined'
            value={resetState}
            required
            inputRef={resetRef}
            onChange={onResetEvent}
          />
        </FormControl>
      )
    }

    return (
      <FormControl>
        <TextField
          id='email'
          aria-describedby='my-email-text'
          label='Email'
          type='email'
          autoFocus
          onChange={onEmailChange}
          autoComplete='email'
          margin='normal'
          variant='outlined'
          required
          value={emailState}
          inputRef={emailRef}
        />
      </FormControl>
    )
  }
  const FormRender = () => {
    return (
      <form autoComplete={resetSent ? 'on' : 'off'} onSubmit={submit}>
        <div className='space-y-6'>
          <FormInputRender />
        </div>
        <button className={'border rounded py-3 px-6 text-xl'} type='submit'>
          {resetSent ? 'Submit' : 'Send Email'}
        </button>
      </form>
    )
  }

  return (
    <MarketingDrawer title={name} footerSpacing>
      <MarketingShortTitle />
      <div className='container mx-auto text-center'>
        <Header>{title}</Header>
        <FormRender />
      </div>
      {loading ? (
        <LinearProgress className={classes.absolute} color='secondary' />
      ) : null}
    </MarketingDrawer>
  )
}

export default metaSetter(
  { ResetPassword },
  {
    description:
      'Reset your password to get back in action with your accessibility toolkit.',
    gql: true,
  }
)
