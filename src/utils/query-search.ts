import { initUrl } from '@a11ywatch/website-source-builder'

// search the query [url, autoTPT]
export const searchQuery = (
  url: string,
  insecureTransport?: boolean
): [string, boolean] => {
  // raw html
  if (!url) {
    return ['', false]
  }

  return [initUrl(url, insecureTransport), !(url.startsWith("http") || url.startsWith("https"))]
}
