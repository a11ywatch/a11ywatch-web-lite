import { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrCluster } from 'react-icons/gr'
import { useWebsiteContext } from '@app/components/providers/website'
import { classNames } from '@app/utils/classes'
import { checkBoxStyle } from '@app/styles/checkbox'
import { FormControl } from '../../form-control'

export const SitemapBoxWrapper = ({
  sitemap,
  url,
  activeSubscription,
}: {
  sitemap?: boolean
  url?: string
  activeSubscription?: boolean
}) => {
  const [sitemapEnabled, setTLD] = useState<boolean>(!!sitemap)
  const { updateWebsite } = useWebsiteContext()

  const onChangeEvent = async () => {
    let nextValue = !sitemapEnabled
    setTLD(nextValue)
    try {
      await updateWebsite({
        variables: { url, sitemap: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-sitemap-form`

  return (
    <InfoBlock title={'Sitemap'} icon={<GrCluster className='grIcon' />}>
      <div className='flex space-x-1 place-items-center'>
        <FormControl
          htmlFor={labelId}
          visible
          disabled={!activeSubscription}
          className='text-sm font-medium'
        >
          Sitemap
        </FormControl>

        <input
          checked={sitemapEnabled}
          type='checkbox'
          id={labelId}
          disabled={!activeSubscription}
          onChange={onChangeEvent}
          name={'sitemap'}
          className={classNames(
            checkBoxStyle,
            activeSubscription ? '' : 'text-gray-200'
          )}
        ></input>
      </div>
      <div>{sitemapEnabled ? 'Enabled' : 'Disabled'}</div>
    </InfoBlock>
  )
}

export const SitemapBox = memo(SitemapBoxWrapper)
