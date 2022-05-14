import React, { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrShield } from 'react-icons/gr'
import { prismStyles } from '@app/styles'
import { copyClipboard } from '@app/lib'
import { PrismLight } from 'react-syntax-highlighter'
import { Link } from '@app/components/general'

export const StatusBadgeBoxWrapper = ({
  statusBadgeUrl,
  reportsLink,
  domain,
  reportsPageLink,
}: {
  statusBadgeUrl?: string
  reportsLink?: string
  domain?: string
  reportsPageLink?: string // path to reports page for website locally
}) => {
  const [isMarkdown, setMarkdown] = useState<boolean>(true)

  const statusBadgeLanguage = isMarkdown ? 'markdown' : 'html'

  return (
    <InfoBlock title={'Badge'} icon={<GrShield />}>
      <div className='flex pb-2 space-x-1'>
        <span className='text-sm font-medium'>MARKDOWN</span>
        <input
          checked={isMarkdown}
          type='checkbox'
          onChange={() => setMarkdown((minified: boolean) => !minified)}
          className={
            'outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
        ></input>
      </div>
      <PrismLight
        language={statusBadgeLanguage}
        style={prismStyles}
        onClick={copyClipboard}
        className={'hover:bg-blue-500 hover:text-white cursor-pointer'}
      >
        {statusBadgeLanguage === 'markdown'
          ? `[![A11yWatch](${statusBadgeUrl})](${reportsLink})`
          : `<a href="${reportsLink}"><img src="${statusBadgeUrl}" /></a>`}
      </PrismLight>
      {statusBadgeUrl && reportsPageLink ? (
        <div className={`py-3`}>
          <Link href={reportsPageLink}>
            <img
              src={statusBadgeUrl}
              alt={`Status badge for ${domain}`}
              width={112}
              height={20}
            />
          </Link>
        </div>
      ) : null}
    </InfoBlock>
  )
}

export const StatusBadgeBox = memo(StatusBadgeBoxWrapper)
