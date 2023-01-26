import React, { memo } from 'react'
import { Box } from '@a11ywatch/ui'
import type { User } from '@app/types'
import { TextSkeleton } from '@app/components/placeholders'
import { Link } from '@app/components/stateless/typo/link'
import { getUsageLimitsMs } from '@a11ywatch/website-source-builder'

const APIInfoBlockComponent = ({
  user,
  loading,
  hideHeader,
}: {
  user: User
  loading?: boolean
  hideHeader?: boolean
}) => {
  const maxUsage = getUsageLimitsMs(user?.role ?? 0)
  const baseUsage = user?.scanInfo?.totalUptime
    ? (Number(user.scanInfo.totalUptime) / maxUsage) * 100
    : 0
  const usageAnchorDate = user?.usageAnchorDate

  const anchorDate = usageAnchorDate
    ? new Date(Number(usageAnchorDate))
    : new Date()
  const nextMonth = anchorDate.getMonth() + 1

  anchorDate.setMonth(nextMonth > 12 ? 0 : nextMonth)

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
        <div className='space-y-1'>
          {/* <p className='text-base'>
            Plan allows up to {}
          </p> */}
          <p className='text-sm'>
            Usage used {`${Math.min(baseUsage, 100).toFixed(0)}%`}
          </p>
          {usageAnchorDate ? (
            <p className={'text-xs'}>
              Your limit resets {anchorDate.toDateString()}.
            </p>
          ) : null}
        </div>
      )}
    </Box>
  )
}

export const APIInfoBlock = memo(APIInfoBlockComponent)
