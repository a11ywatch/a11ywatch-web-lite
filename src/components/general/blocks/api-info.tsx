import React from 'react'
import { Box } from '@a11ywatch/ui'
import type { User } from '@app/types'
import { TextSkeleton } from '@app/components/placeholders'
import { Link } from '@app/components/stateless/typo/link'
import { getUsageLimitsMs } from '@a11ywatch/website-source-builder'

export const APIInfoBlock = ({
  user,
  loading,
  hideHeader,
}: {
  user: User
  loading?: boolean
  hideHeader?: boolean
}) => {
  // todo: custom limits check from property
  const availableUsage = getUsageLimitsMs(user?.role ?? 0)

  return (
    <Box className={'border border-dotted rounded px-4 py-2'}>
      {hideHeader ? null : (
        <p className={'text-lg font-medium'}>API Reference</p>
      )}
      {!user && loading ? (
        <TextSkeleton className={'p-2'} />
      ) : !user ? (
        <p className={'pb-2 text-lg'}>
          <Link href={'/login'} className={'underline'}>
            Login
          </Link>{' '}
          to see your API limits and test requests using your account.
        </p>
      ) : (
        <>
          <p className='text-base '>
            Allowed usage{' '}
            {`${(availableUsage ? Number(availableUsage) / 1000 : 0).toFixed(
              0
            )}s`}
          </p>
          <p className='text-sm '>
            Usage used{' '}
            {`${(user?.scanInfo?.totalUptime
              ? Number(user.scanInfo.totalUptime) / 1000
              : 0
            ).toFixed(0)}s`}
          </p>
          <p className={'text-xs '}>Your limit resets monthly.</p>
        </>
      )}
    </Box>
  )
}
