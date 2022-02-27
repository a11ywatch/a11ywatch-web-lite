import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_MINI_PLAYER_STATE = gql`
  query getMiniPlayerState {
    miniPlayer @client {
      open
      data
      title
    }
  }
`

const defultPlayer = {
  open: false,
  title: '',
  data: '',
}

export function useMiniPlayer() {
  const miniPlayer =
    useQuery(GET_MINI_PLAYER_STATE).data?.miniPlayer || defultPlayer
  const client = useApolloClient()
  const setMiniPlayerContent = (
    open: boolean = false,
    data: any = '',
    title: string = ''
  ) => () => {
    client.writeData({
      data: {
        miniPlayer: {
          open,
          data,
          title,
          __typename: 'MiniPlayer',
        },
      },
    })
  }

  return {
    miniPlayer,
    setMiniPlayerContent,
  }
}
