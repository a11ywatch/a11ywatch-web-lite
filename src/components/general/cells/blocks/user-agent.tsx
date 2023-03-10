import React, { memo, useEffect, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrUser } from 'react-icons/gr'
import { useWebsiteContext } from '@app/components/providers/website'

export const UserAgentBoxWrapper = ({
  ua: agent,
  url,
}: {
  url: string
  ua?: string
}) => {
  const [ua, setUa] = useState<string>(agent || '')
  const { updateWebsite } = useWebsiteContext()

  const onChangeUA = (e: React.ChangeEvent<any>) => setUa(e?.target?.value)

  useEffect(() => {
    if (ua === agent) {
      return
    }
    const debounce = setTimeout(async () => {
      if (agent !== ua) {
        try {
          await updateWebsite({
            variables: { url, ua },
          })
        } catch (e) {
          console.error(e)
        }
      }
    }, 2300)

    return () => clearTimeout(debounce)
  }, [ua, agent, url, updateWebsite])

  const uaLabel = `${url}-ua-id`

  return (
    <InfoBlock title={'User-Agent'} icon={<GrUser className='grIcon' />}>
      <label htmlFor={uaLabel} className={'sr-only'}>
        User-Agent
      </label>
      <input
        className=' py-1 bg-transparent focus:outline-none focus:border-r-2 focus:border-blue-300 hover:border-r-2'
        onChange={onChangeUA}
        value={ua}
        id={uaLabel}
        placeholder='User-Agent'
        type='text'
        name={'user_agent'}
      />
    </InfoBlock>
  )
}

export const UserAgentBox = memo(UserAgentBoxWrapper)
