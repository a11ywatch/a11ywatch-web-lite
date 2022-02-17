/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import fetcher from 'isomorphic-unfetch'
import { split, ApolloLink } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { UserManager, AppManager } from '@app/managers'
import { AppConfig } from '@app/configs/app-config'
import { resolvers } from './resolvers'

const createLink = (): ApolloLink => {
  const httpLink = createHttpLink({
    uri:
      AppConfig.dev && typeof window === 'undefined'
        ? AppConfig.graphQLUrlDocker
        : AppConfig.graphQLUrl,
    fetch: fetcher,
    credentials: 'include',
  })

  const authLink = setContext((_: any, { headers }: any) => {
    return {
      headers: Object.assign({}, headers, {
        authorization: UserManager?.token ? `Bearer ${UserManager?.token}` : '',
      }),
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }: any) => {
    if (typeof window !== 'undefined') {
      let graphErrors = ''
      graphQLErrors?.map(({ message }: { message?: string }) => {
        if (message) {
          const invalidSignature = message.includes(
            'Context creation failed: invalid signature'
          )

          // todo fire mutation with client for logout
          if (message.includes('JWT:') || invalidSignature) {
            UserManager.clearUser()
          }

          const errorMessage = invalidSignature ? 'Please re-login' : message

          graphErrors += `${errorMessage} \n`
        }
      })
      graphErrors && AppManager.toggleSnack(true, graphErrors, 'error')

      if (networkError) {
        console.error(`[Network error]:`, networkError)
      }
    }
  })

  let httpSplit = httpLink

  if (typeof window !== 'undefined') {
    const wsLink = new SubscriptionClient(AppConfig.webSocketUrl + '', {
      reconnect: true,
      timeout: 10000,
      inactivityTimeout: 30000,
      lazy: true,
      connectionParams: {
        credentials: 'include',
      },
    })

    httpSplit = split(
      ({ query }: any) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      // @ts-ignore
      wsLink,
      httpLink
    )
  }

  return ApolloLink.from([errorLink, authLink, httpSplit])
}

function createApolloClient(initialState: any = {}) {
  const link = createLink()
  return new ApolloClient({
    ssrMode: false,
    link,
    cache: new InMemoryCache({
      dataIdFromObject: (object: any) => object.id || null,
    }).restore(initialState),
    resolvers,
  })
}

export function withApollo(
  PageComponent: any,
  defaultProps: { ssr: boolean } = { ssr: false }
) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: any) => {
    const client = apolloClient || createApolloClient(apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  WithApollo.displayName = PageComponent.name || PageComponent.displayName

  if (PageComponent.meta) {
    WithApollo.meta = PageComponent.meta
  }

  if (defaultProps.ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree } = ctx

      if (!ctx.apolloClient) {
        ctx.apolloClient = createApolloClient()
      }

      const apolloClient = ctx?.apolloClient

      let pageProps = {}
      if (PageComponent.getInitialProps) {
        try {
          pageProps = await PageComponent.getInitialProps(ctx)
        } catch (e) {
          console.error(e)
        }
      }

      if (typeof window === 'undefined') {
        if (ctx?.res?.finished) {
          return pageProps
        }

        if (defaultProps.ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            console.error('Error while running `getDataFromTree`', error)
          }
        }
      }

      return Object.freeze(
        Object.assign({}, pageProps, {
          apolloState: apolloClient.cache.extract(),
        })
      )
    }
  }

  return WithApollo
}
