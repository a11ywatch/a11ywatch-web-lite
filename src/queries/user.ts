import gql from 'graphql-tag'

const GET_USER = gql`
  query getUser {
    user {
      id
      email
      loggedIn
      alertEnabled
      role
      activeSubscription
      emailConfirmed
      emailFilteredDates
      passwordRequired
      scanInfo {
        lastScanDate
        totalUptime
      }
    }
  }
`

const GET_USER_SETTINGS = gql`
  query getUserSettings {
    user {
      id
      email
      alertEnabled
      role
      activeSubscription
      passwordRequired
      pageSpeedApiKey
      emailFilteredDates
      emailMorningOnly
      scanInfo {
        lastScanDate
        totalUptime
      }
    }
  }
`

const GET_USER_PROFILE = gql`
  query getUserProfile {
    user {
      id
      email
      loggedIn
      alertEnabled
      role
      activeSubscription
      emailConfirmed
      emailFilteredDates
      emailMorningOnly
      passwordRequired
      scanInfo {
        lastScanDate
        totalUptime
      }
      invoice {
        amount_due
        amount_paid
        amount_remaining
        next_payment_attempt
        period_end
        period_start
        total
        sub_total
        paid
        billing_reason
      }
      paymentSubscription {
        status
      }
    }
  }
`

export const updateUserCache = {
  update(cache: any, { data: { cachedUser } }: any) {
    const variables = {
      alertEnabled: cachedUser.alertEnabled,
    }
    const { user } = cache.readQuery({
      query: GET_USER,
      variables,
    })

    cache.writeQuery({
      query: GET_USER,
      variables,
      data: {
        user: {
          ...user,
        },
      },
    })
  },
}

export { GET_USER, GET_USER_PROFILE, GET_USER_SETTINGS }
