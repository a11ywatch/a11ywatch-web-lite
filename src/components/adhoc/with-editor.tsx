/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useState, useEffect, memo } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(import('@monaco-editor/react'), {
  ssr: false,
})
const ReactSizeDetector = dynamic(import('react-resize-detector'), {
  ssr: false,
})

const WithEditorComponent = ({
  setScript,
  children = '',
  language = 'javascript',
}: any) => {
  const [value, setValue] = useState<any>(children || '')

  useEffect(() => {
    setScript && setScript(value)
  }, [setScript, value])

  return (
    <ReactSizeDetector handleWidth handleHeight>
      {({ height, width }: { width?: number; height?: number }) => (
        <MonacoEditor
          onChange={setValue}
          value={value}
          language={language}
          defaultValue={children}
          theme='vs-dark'
          height={
            typeof height === 'undefined'
              ? typeof window !== 'undefined'
                ? window.innerHeight / 1.4
                : 500
              : height || '100%'
          }
          width={width || '100%'}
        />
      )}
    </ReactSizeDetector>
  )
}

export const WithEditor = memo(WithEditorComponent)
