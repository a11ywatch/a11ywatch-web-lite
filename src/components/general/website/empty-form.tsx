import { memo, FC } from 'react'
import Image from 'next/image'
import { CardHeader } from '@app/components/stateless/card/header'
import { Link } from '../link'
import dynamic from 'next/dynamic'
import { EmptyDialogButton } from '../empty-dialog'

const FormDialog = dynamic(
  () => import('../form-dialog').then((mod) => mod.FormDialog),
  {
    ssr: false,
    loading: () => (
      <EmptyDialogButton buttonStyles={'min-w-[13rem] border-2'} />
    ),
  }
)

const infoDetails = [
  {
    title: 'Detailed Fixes',
    subTitle:
      'Get spot on details on how to improve your website in various areas. Stay up to date on the latest guidelines and more as they come out.',
  },
  {
    title: 'Safe Guard',
    subTitle: `Include your custom CDN at no cost and make sure issues are fixed upfront. Sometimes accidents happens thats why we got your back.`,
  },
  {
    title: 'Alerts',
    subTitle:
      'Get alerted when your page encounters new issues at any frequency.',
  },
]

interface EmptyWebsiteProps {
  emptyHeaderTitle?: string
  emptyHeaderSubTitle?: string
  hasWebsite?: boolean
  goToPayments?: boolean
}

const EmptyWebsiteFormComponent: FC<EmptyWebsiteProps> = ({
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  hasWebsite = false,
  goToPayments = false,
}) => {
  const goToHref = goToPayments ? '/payments' : '/'

  return (
    <div
      className={
        'flex flex-col w-full place-items-center py-10 my-2 text-center'
      }
    >
      <CardHeader title={emptyHeaderTitle} subheader={emptyHeaderSubTitle} lg />
      {hasWebsite ? (
        <Link
          href={goToHref}
          className={'border-2 rounded hover:no-underline px-3 py-2'}
        >
          Go to {goToPayments ? 'Payments' : 'Dashboard'}
        </Link>
      ) : (
        <FormDialog
          buttonStyles={
            'min-w-[13rem] border-2 text-center md:text-center md:place-items-center'
          }
        />
      )}
      <div className={'flex space-items-center space-x-10 py-12 px-4'}>
        <ul
          className={'w-full text-left space-y-2 md:w-full lg:w-1/2 xl:pr-12'}
        >
          {infoDetails.map(
            (detail: { title: string; subTitle: string }, i: number) => {
              return (
                <li key={i}>
                  <div className={'text-2xl font-medium'}>{detail.title}</div>
                  <div className={'text-base'}>{detail.subTitle}</div>
                </li>
              )
            }
          )}
        </ul>
        <div className={'hidden md:block'}>
          <Image
            src={'/img/website_builder.svg'}
            height={440}
            width={560}
            alt='Website accessibility builder'
          />
        </div>
      </div>
    </div>
  )
}

export const EmptyWebsiteForm = memo(EmptyWebsiteFormComponent)
