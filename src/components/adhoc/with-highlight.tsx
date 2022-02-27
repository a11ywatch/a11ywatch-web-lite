import React from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { TextSkeleton } from '@app/components/placeholders'
import { a11yDark } from '@app/styles'

const useStyles = makeStyles(() => ({
  code: {
    fontSize: '12px',
    '&::-webkit-scrollbar': {
      background: '#424242',
      height: 7,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1b1b1b',
      borderRadius: 0,
      border: 0,
    },
  },
}))

const SyntaxHighlighter = dynamic(
  () =>
    import('react-syntax-highlighter').then(
      ({ PrismLight }: { PrismLight: React.ReactNode }) => PrismLight
    ) as any,
  {
    ssr: false,
    loading: () => (
      <TextSkeleton
        width={'100%'}
        height={29}
        style={{ marginTop: 12, marginBottom: 12 }}
      />
    ),
  }
) as any

function WithHighlight({ setScript, children, ...extraProps }: any) {
  const classes = useStyles()

  return (
    <SyntaxHighlighter
      style={a11yDark}
      className={classes.code}
      language='html'
      useInlineStyles
      {...extraProps}
    >
      {children}
    </SyntaxHighlighter>
  )
}
WithHighlight.displayName = 'WithHighlight'

export { WithHighlight }
