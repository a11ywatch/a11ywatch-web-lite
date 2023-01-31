import { memo } from 'react'
import { Pages } from '@app/types'
import { ListCellPagesHeader } from './pages-header'

// return issues maped
const PagesWrapper = ({
  handleMainClick,
  domain,
  url,
  pageUrl,
  pageInsights,
  online,
  pageLoadTime,
  totalTTL,
}: Pages & {
  totalTTL: number
  open?: boolean
  small?: boolean
  singleRow?: boolean
  handleMainClick?(ata: any, name: string, _mini: boolean, url: string): void
}) => (
  <ListCellPagesHeader
    url={url || pageUrl}
    domain={domain as string}
    online={online}
    totalTTL={totalTTL}
    pageInsights={pageInsights}
    duration={pageLoadTime?.duration}
    handleMainClick={handleMainClick}
  />
)

// memo expensive issues
export const PagesList = memo(PagesWrapper)
