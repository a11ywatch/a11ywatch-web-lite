import React, { memo } from 'react'
import { printElement } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import type { Website } from '@app/types'
import { FilterDropdown } from '../feed/filters'
import { Link } from '@app/components/stateless/typo/link'

interface InfoBarComponent {
  printable?: boolean
  website: Website
  download?: boolean // display the download button
  onToggleViewModeEvent?: (a?: any) => void
}

const btnStyles =
  'border px-3 py-1.5 place-items-center flex text-sm rounded no-underline hover:border-blue-700 hover:opacity-90'

const apiRoute = getAPIRoute()

export function InfoBarComponent({
  printable,
  website,
  download = false,
  onToggleViewModeEvent,
}: InfoBarComponent) {
  if (!printable) {
    return null
  }

  if (!website?.domain) {
    return <div className='flex py-2 space-x-2'></div>
  }

  const onPrint = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    printElement('', website)
  }

  return (
    <div className='flex py-2 space-x-2 border border-l-0 border-r-0 px-2'>
      <button className={btnStyles} onClick={onPrint}>
        Print
      </button>
      {download ? (
        <Link
          className={btnStyles}
          href={`${apiRoute}/report?q=${website?.url}&download=true`}
        >
          Download
        </Link>
      ) : null}
      {onToggleViewModeEvent ? (
        <button className={btnStyles} onClick={onToggleViewModeEvent}>
          Swap Views
        </button>
      ) : null}
      <FilterDropdown open right />
    </div>
  )
}

export const InfoBar = memo(InfoBarComponent)
