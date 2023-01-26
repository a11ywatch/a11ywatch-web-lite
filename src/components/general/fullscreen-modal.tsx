import { memo } from 'react'
import { NavBarTitle } from './navigation'
import { useInputHeader } from './hooks'

import { Link } from './link'
import { Button } from './buttons/button'

import { InputHeaders } from './forms/input-headers'
import { useWebsiteData } from '@app/data'
import { GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { FeedIssue } from './feed/issue'
import { Header3 } from './header'
import { HeadlessFullScreenModal } from '../modal/headless-full'
import { fetcher } from '@app/utils/fetcher'
import { LineChart } from './charts/line-chart'
import { Lighthouse } from './lighthouse'

export const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

function UpperInput({ data, url }: any) {
  const { customFields, removeFormField, addFormField, updateFormField } =
    useInputHeader(data)

  const customHeaders = customFields?.map((item: any) => {
    return {
      key: item?.key,
      value: item?.value,
    }
  })

  const { updateWebsite } = useWebsiteData('', url, customHeaders, true)

  const inputProps = {
    customHeader: true,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  }

  const onUpdateWebsite = async () => {
    try {
      await updateWebsite({
        variables: { url, customHeaders, filter: '' },
      })
      AppManager.toggleSnack(
        true,
        'Headers updated successfully.',
        'message',
        true
      )
      // todo find website and apply headers
    } catch (e) {
      AppManager.toggleSnack(true, e, 'error')
    }
  }

  return (
    <div className='p-4 space-y-6 container mx-auto'>
      <InputHeaders {...inputProps} />
      <Button onClick={onUpdateWebsite}>Update</Button>
    </div>
  )
}

interface FullScreenModalProps {
  open: boolean
  role?: number
  handleClose(x?: any): any
  handleClickOpen?(data: any, title: any, url: any, error: any): any
  handleClickOpenPlayer?(x?: any): any
  refetch(x?: any): any
  error?: string
  title?: string
  url: string
  data?: any
}

// handle the type of modal that should be displayed. Todo: use enum
const handleModelType = (title: string) => {
  const issuesModal = title === 'Issues'
  const headerModal = title === 'Custom Headers'
  const verifyModal = title === 'Verify DNS'
  const analyticsModal = title === 'Website Analytics'

  return {
    issuesModal,
    headerModal,
    verifyModal,
    analyticsModal,
  }
}

// todo: split props into component
const Body = ({
  data,
  title = 'Issues',
  // onPress,
  refetch,
  url,
  onDnsStatusEvent,
  error,
}: Partial<FullScreenModalProps & { onDnsStatusEvent?(): any }>) => {
  const { issuesModal, headerModal, verifyModal, analyticsModal } =
    handleModelType(title)

  if (title === 'Lighthouse') {
    return (
      <div className='py-6 container mx-auto max-h-[80vh] overflow-visible h-full w-full'>
        <Lighthouse
          insight={data}
          id='fullscreen-lighthouse-report'
          lighthouseVisible
        />
      </div>
    )
  }

  if (analyticsModal) {
    const analytics = data?.data

    return (
      <div className='py-6 container mx-auto max-h-[80vh] overflow-visible'>
        <LineChart title={`Report: ${url}`} data={analytics} />
      </div>
    )
  }

  if (verifyModal) {
    const textRecord = data?.data?.txtRecord

    return (
      <div className='p-4 space-y-6 container mx-auto'>
        <Header3>Verify DNS</Header3>
        <div className='py-2 space-y-2'>
          <p className=' text-lg'>
            Enter the following .txt record to confirm your domain. You can
            remove the record after confirmation.
          </p>
          <p className=''>
            By verifying your domain, you can enable the CDN to store content.
            If you need help please, contact support for alternative validation
            steps.
          </p>
        </div>
        <div className='border border-gray-700 text-gray-600 rounded'>
          {textRecord ? (
            <>
              <div className='flex flex-1 space-x-3'>
                <div className='border-r px-4 bg-black'>
                  <div className='py-2 text-gray-100 font-medium'>.TXT</div>
                </div>
                <div className='py-2'>{textRecord}</div>
              </div>
            </>
          ) : (
            <div className='py-4 px-4'>{data?.message}</div>
          )}
        </div>
        <div>
          <Button onClick={onDnsStatusEvent}>Check Status</Button>
        </div>
      </div>
    )
  }

  if (headerModal) {
    return <UpperInput data={data} url={url} />
  }
  // TODO: remove for different way of determine issues content.
  const isFlatIssues =
    data && Array.isArray(data) && data?.some((o) => 'domain' in o == false)

  if (issuesModal && isFlatIssues) {
    return (
      <ul className='list-none py-2'>
        {data?.map((item: any, listIndex: number) => {
          return (
            <FeedIssue
              key={`${listIndex} ${item?.selector} ${item?.code}`}
              error={error}
              {...item}
            />
          )
        })}
      </ul>
    )
  }

  return (
    <div className='container mx-auto'>
      <p>No data found yet, please try again later or reload the page.</p>
      {refetch ? (
        <Button
          aria-label='refetch data'
          aria-haspopup='true'
          onClick={() => refetch()}
        >
          Reload Data
        </Button>
      ) : null}
    </div>
  )
}

export function FullScreenModalWrapper(props: FullScreenModalProps) {
  const {
    handleClose,
    open,
    data,
    title = 'Issues',
    // onPress,
    refetch,
    url,
    error,
  } = props

  const issuesModal = title === 'Issues'
  const issueCount = data?.length

  // check to see if the dns was confirmed
  const onDnsStatusEvent = async () => {
    const domain = new URL(url).hostname
    const source = await fetcher('/website/dns', { domain }, 'POST')

    AppManager.toggleSnack(
      open,
      `${domain} is ${!source?.data?.verified ? 'not ' : ''}verified`,
      !source?.data?.verified ? 'error' : 'message'
    )

    if (source?.data?.verified && refetch && handleClose) {
      refetch()
      handleClose()
    }
  }

  return (
    <HeadlessFullScreenModal open={open} onClose={handleClose}>
      <div className='flex w-full py-1.5 px-3 place-items-center place-content-between border-b'>
        <div className={'flex gap-x-2 place-items-center'}>
          <Button onClick={handleClose} aria-label='close' iconButton>
            <GrClose className='grIcon inline-block text-black text-sm md:text-base dark:text-white' />
          </Button>
          <NavBarTitle title={title} />
        </div>
        <div className={'flex gap-x-1 place-items-center'}>
          {url ? (
            <div className={'text-right text-black'}>
              <Link href={`/website-details?url=${encodeURIComponent(url)}`}>
                {url}
              </Link>
              {issueCount && issuesModal ? (
                <p className='truncate max-w-[50vw]'>
                  {issueCount} {issuesModal && error ? 'issue' : 'page'}
                  {issueCount === 1 ? '' : 's'}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <Body {...props} onDnsStatusEvent={onDnsStatusEvent} />
    </HeadlessFullScreenModal>
  )
}

export const FullScreenModal = memo(FullScreenModalWrapper)
