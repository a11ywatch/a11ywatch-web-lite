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
      apiUsage {
        usage
        lastScanDate
        usageLimit
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
      passwordRequired
      apiUsage {
        usage
        lastScanDate
        usageLimit
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

export { GET_USER, GET_USER_PROFILE }
