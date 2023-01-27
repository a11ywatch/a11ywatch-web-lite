import { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { useWebsiteContext } from '@app/components/providers/website'
import { classNames } from '@app/utils/classes'
import { checkBoxStyle } from '@app/styles/checkbox'
import { FormControl } from '../../form-control'

export const TLDBoxWrapper = ({
  tld,
  url,
  activeSubscription,
}: {
  tld?: boolean
  url?: string
  activeSubscription?: boolean
}) => {
  const [tldEnabled, setTLD] = useState<boolean>(!!tld)
  const { updateWebsite } = useWebsiteContext()

  const onChangeEvent = async () => {
    let nextValue = !tldEnabled
    setTLD(nextValue)
    try {
      await updateWebsite({
        variables: { url, tld: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-tld-form`

  return (
    <InfoBlock>
      <div className='flex space-x-1 place-items-center'>
        <FormControl
          htmlFor={labelId}
          visible
          disabled={!activeSubscription}
          className='text-sm font-medium'
        >
          TLDs
        </FormControl>
        <input
          checked={tldEnabled}
          type='checkbox'
          id={labelId}
          onChange={onChangeEvent}
          name={'tlds'}
          disabled={!activeSubscription}
          className={classNames(
            checkBoxStyle,
            activeSubscription ? '' : 'text-gray-400'
          )}
        ></input>
      </div>
      <div>{tldEnabled ? 'Enabled' : 'Disabled'}</div>
    </InfoBlock>
  )
}

export const TLDBox = memo(TLDBoxWrapper)
