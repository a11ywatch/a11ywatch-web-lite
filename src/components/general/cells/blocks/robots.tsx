import { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { useWebsiteContext } from '@app/components/providers/website'
import { checkBoxStyle } from '@app/styles/checkbox'

export const RobotsBoxWrapper = ({
  robots,
  url,
}: {
  robots?: boolean
  url?: string
}) => {
  const [robotsEnabled, setTLD] = useState<boolean>(!!robots)
  const { updateWebsite } = useWebsiteContext()

  const onChangeEvent = async () => {
    let nextValue = !robotsEnabled
    setTLD(nextValue)
    try {
      await updateWebsite({
        variables: { url, robots: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-robots-form`

  return (
    <InfoBlock>
      <div className='flex space-x-1 place-items-center'>
        <label className='text-sm font-medium' htmlFor={labelId}>
          Robots
        </label>
        <input
          checked={robotsEnabled}
          type='checkbox'
          id={labelId}
          onChange={onChangeEvent}
          name={'tlds'}
          className={checkBoxStyle}
        ></input>
      </div>
      <div>{robotsEnabled ? 'Enabled' : 'Disabled'}</div>
    </InfoBlock>
  )
}

export const RobotsBox = memo(RobotsBoxWrapper)
