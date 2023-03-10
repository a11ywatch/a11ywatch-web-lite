import { useMemo } from 'react'

// format lighthouse data returned
export const useLighthouse = (insight: any) => {
  const data = useMemo(() => {
    if (insight && insight?.json) {
      try {
        const parsedResult =
          typeof insight.json === 'string'
            ? JSON.parse(insight.json)
            : insight.json

        if (parsedResult && 'lighthouseVersion' in parsedResult) {
          return parsedResult
          // return online results <-- tmp remove from endpoint
        } else {
          return null
        }
      } catch (e) {
        console.error(`Error parsing lighthouse: ${e}`)
        return null
      }
    }
    return null
  }, [insight])

  return data
}
