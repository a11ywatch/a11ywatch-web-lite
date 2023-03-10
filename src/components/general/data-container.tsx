import { FC, PropsWithChildren } from 'react'
import { ListSkeleton } from '@app/components/placeholders'
import { EmptyWebsiteForm } from '@app/components/general/website/empty-form'
import { CardHeader } from '@app/components/stateless/card/header'
import { DashboardCellLoader } from '../placeholders/dashboard-cell-loader'
import { Button } from './buttons'
import { UserManager } from '@app/managers'

type DataContainerProps = PropsWithChildren<{
  data?: any
  error?: boolean
  loading?: boolean
  emptyHeaderTitle?: string
  emptyHeaderSubTitle?: string
  avatar?: boolean
  dashboard?: boolean
}>

const onLogout = () => {
  UserManager.clearUser()
  window.location.href = '/'
}

// data container to handle loading main application pages
export const DataContainer: FC<DataContainerProps> = ({
  data,
  error,
  loading,
  emptyHeaderTitle,
  emptyHeaderSubTitle,
  children,
  avatar = true,
  dashboard,
}) => {
  if (!data?.length) {
    if (loading) {
      return dashboard ? (
        <DashboardCellLoader />
      ) : (
        <ListSkeleton avatar={avatar} />
      )
    }
    if (!loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occurred. Please try again. If issue persist please contact support.'
          className='min-h-[88px]'
        >
          <Button onClick={onLogout}>Logout</Button>
        </CardHeader>
      )
    }
    return (
      <EmptyWebsiteForm
        emptyHeaderTitle={emptyHeaderTitle}
        emptyHeaderSubTitle={emptyHeaderSubTitle}
      />
    )
  }

  return <>{children || null}</>
}
