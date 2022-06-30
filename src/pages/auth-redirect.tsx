import React, { useEffect, useCallback } from 'react'
import { metaSetter } from '@app/utils'
import { useRouter } from 'next/router'
import { MarketingShortTitle } from '@app/components/marketing'
import Head from 'next/head'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'

function AuthRedirect() {
  const router = useRouter()
  const [signOnMutation] = useMutation(REGISTER)
  const access_token = router.query?.access_token

  const onGithubAuth = useCallback(
    async ({ email, id }) => {
      try {
        if (email && id) {
          const data = await signOnMutation({
            variables: {
              email: email,
              githubId: id,
              password: '',
            },
          })

          console.log(data)
          const authValue = data?.data?.register ?? data?.data?.login

          if (authValue) {
            UserManager.setUser(authValue)
            await router.push('/')
          }
        } else {
          AppManager.toggleSnack(true, 'Issue with redirect', 'error')
        }
      } catch (e) {
        console.error(e)
      }
    },
    [router, signOnMutation]
  )

  useEffect(() => {
    if (access_token) {
      fetch('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token ' + access_token,
        },
      })
        .then((res) => res.json())
        .then(async (res) => {
          try {
            await onGithubAuth({ email: res.email, id: res.id })
          } catch (e) {
            console.error(e)
          }
        })
    }
  }, [access_token, onGithubAuth])

  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <MarketingShortTitle />
      <div className='p-4'>Redirecting to dashboard...</div>
    </>
  )
}

export default metaSetter({ AuthRedirect }, { gql: true })