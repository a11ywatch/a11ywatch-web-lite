'use client'

import { useState } from 'react'
import { AppManager, UserManager } from '@app/managers'
import { searchQuery } from '@app/utils'
import type { Website } from '@app/types'
import { ModalParams } from '@app/components/providers/defaults/rest-website'
import { scanWebsite } from './website-scan'

interface Scan {
  data?: { data?: Website } // TODO: reduce dup data
  loading: boolean
}

// TODO: USE OpenAPI CALL
export function useSearchRest() {
  const [search, setQuery] = useState<string>('')
  const [html, setHtml] = useState<string>('')

  const [state, setScan] = useState<Scan>({
    loading: false,
    data: undefined,
  })

  const { data: scanState, loading } = state ?? {}

  const setSearch = (event: any) => setQuery(event?.target?.value)

  // todo: refactor method for split state and query handling
  const scanPage = async (options: ModalParams, markup?: boolean) => {
    const { html, query, standard } = options ?? {}
    const q = query || search

    setScan({ loading: true })

    const [querySearch, autoTPT] = markup ? ['', false] : searchQuery(q, q && q.startsWith("https") === false)

    let snackOpen = false

    if (!markup) {
      if (autoTPT) {
        AppManager.toggleSnack(true, 'https:// automatically added to query.')
        snackOpen = true
      }
    }

    // todo: opt in authed scan besides url target
    const authed =
      window.location.pathname === '/dashboard' && !!UserManager.token

    // if html bool found run body
    let response = await scanWebsite(
      querySearch,
      authed,
      markup ? html : undefined, // direct markup
      standard
    )

    if (response && [300, 400].includes(response?.code)) {
      AppManager.toggleSnack(true, response.message)
    }

    // Retry query as http if https autofilled [TODO: move autoquery detection to SS ]
    if (!response?.data && !markup && autoTPT && response?.code !== 300) {
      AppManager.toggleSnack(true, 'https:// failed retrying with http:// ...')
      const [target] = searchQuery(q, true)
      response = await scanWebsite(target, authed, undefined, standard)
      snackOpen = true
    }

    setScan({
      loading: false,
      data: response,
    })

    if (snackOpen) {
      setTimeout(() => {
        AppManager.closeSnack()
      }, 6000)
    }
  }

  const closeModal = () => {
    setScan({ loading: false, data: undefined })
  }

  // move validation
  const toggleModal = async ({ html, standard, query }: ModalParams) => {
    if (html) {
      return await scanPage({ html, standard }, true)
    }
    return await scanPage({ query, standard }, false)
  }

  return {
    search,
    html,
    setSearch,
    scanPage,
    setHtml,
    loading,
    data: scanState && scanState.data,
    closeModal,
    toggleModal,
  }
}
