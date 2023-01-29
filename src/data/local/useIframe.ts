import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { frameDom } from '@app/managers'

const GET_FIXFRAME_STATE = gql`
  query getIframeState {
    displayHighlight @client {
      visible
      display
    }
  }
`

export function useIframe() {
  const { data, client } = useQuery(GET_FIXFRAME_STATE, { ssr: false })

  const highLight = data?.displayHighlight || null

  const setFrameContent = (callBack: any) => {
    if (frameDom?.dom?.querySelectorAll) {
      const A11YDATA_ELEMENTS = frameDom?.dom?.querySelectorAll('[data-a11y]')

      if (A11YDATA_ELEMENTS?.length) {
        // for sequence mounting fabs
        if (typeof callBack === 'function') {
          callBack(A11YDATA_ELEMENTS)
        }
        client.writeData({
          data: {
            displayHighlight: {
              display: true,
              visible: false,
              __typename: 'FixFrame',
            },
          },
        })
      }
    }
  }

  return {
    highLight,
    setFrameContent,
  }
}
