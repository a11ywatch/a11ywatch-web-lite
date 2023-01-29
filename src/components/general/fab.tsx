'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { IframeManager } from '@app/managers'
import { Box } from '@a11ywatch/ui'
import { GrMultimedia, GrStatusWarning, GrTestDesktop } from 'react-icons/gr'
import { issueExtractor } from '@app/utils'
import { Button } from './buttons'
import { useInteractiveContext } from '../providers/interactive'

const btnStyle =
  'w-full py-3 place-items-center bg-[rgba(20,20,20,0.3)] border-3'

const MFab = observer(({ iframeStore, issue, marketing }: any) => {
  const { setMiniPlayerContent, miniPlayer } = useInteractiveContext()

  const pageIssues = issueExtractor(issue)

  const onViewIssuesModal = () => {
    setMiniPlayerContent(!miniPlayer.open)
  }

  return (
    <Box
      className={
        'absolute p-3 min-w-[100px] flex-col flex place-content-end bottom-0 left-0 space-y-2'
      }
    >
      {!marketing ? (
        <Button
          className={btnStyle}
          onClick={() => iframeStore.toggleView()}
          iconButton
          title='Issue with page, toggle to webview'
        >
          {iframeStore.viewMode ? (
            <GrTestDesktop className={'grIcon'} />
          ) : (
            <GrMultimedia className={'grIcon'} />
          )}
        </Button>
      ) : null}
      {pageIssues?.length ? (
        <Button
          iconButton
          className={btnStyle}
          onClick={onViewIssuesModal}
          title='View page issues as list'
        >
          <GrStatusWarning className={'grIcon'} />
        </Button>
      ) : null}
    </Box>
  )
})

export const Fab = ({ issue, marketing }: any) => (
  <MFab iframeStore={IframeManager} issue={issue} marketing={marketing} />
)
