import { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { useWebsiteContext } from '@app/components/providers/website'
import { classNames } from '@app/utils/classes'
import { checkBoxStyle } from '@app/styles/checkbox'
import { FormControl } from '../../form-control'

export const SubDomainsBoxWrapper = ({
  subdomains,
  url,
  activeSubscription,
}: {
  subdomains?: boolean
  url?: string
  activeSubscription?: boolean
}) => {
  const { updateWebsite } = useWebsiteContext()
  const [subdomainsEneabled, setTLD] = useState<boolean>(!!subdomains)

  const onChangeEvent = async () => {
    let nextValue = !subdomainsEneabled
    setTLD(nextValue)
    try {
      await updateWebsite({
        variables: { url, subdomains: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-subdomains-form`

  return (
    <InfoBlock>
      <div className='flex space-x-1 place-items-center'>
        <FormControl
          htmlFor={labelId}
          visible
          disabled={!activeSubscription}
          className='text-sm font-medium'
        >
          Subdomains
        </FormControl>

        <input
          checked={subdomainsEneabled}
          type='checkbox'
          id={labelId}
          disabled={!activeSubscription}
          onChange={onChangeEvent}
          name={'subdomains'}
          className={classNames(
            checkBoxStyle,
            activeSubscription ? '' : 'text-gray-200'
          )}
        ></input>
      </div>
      <div>{subdomainsEneabled ? 'Enabled' : 'Disabled'}</div>
    </InfoBlock>
  )
}

export const SubDomainsBox = memo(SubDomainsBoxWrapper)
