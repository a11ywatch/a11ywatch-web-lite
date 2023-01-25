import { API_ENDPOINT } from '@app/configs'
import { AppManager, UserManager } from '@app/managers'

// app fetch wrapper todo: merge params
export const fetcher = async (
  url: string,
  body: Record<string, any> | null = null,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET'
) => {
  const headers = new Headers()
  let data = { data: null as any, message: '', code: 200 }
  let source = null

  if (UserManager.token) {
    headers.append('Authorization', UserManager.token)
  }

  // todo: make optional content-tye
  if ((method === 'POST' && body) || method !== 'POST') {
    headers.append('Content-Type', 'application/json')
  }

  headers.append('Connection', 'keep-alive')

  try {
    source = await fetch(API_ENDPOINT + url, {
      headers,
      method,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) {
      message = e.message
    }
    AppManager.toggleSnack(true, message, 'error')
  }

  // attempt to parse content to json if success
  if (source && source.ok) {
    try {
      data = await source.json()
    } catch (e) {
      let message = 'Parse Error'
      if (e instanceof Error) {
        message = e.message
      }
      AppManager.toggleSnack(true, message, 'error')
    }
  }

  return data
}
