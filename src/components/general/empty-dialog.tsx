import React from 'react'
import { GrChapterAdd } from 'react-icons/gr'
import { Button } from './buttons'

export const EmptyDialogButton = ({
  buttonTitle,
  icon,
  buttonStyles,
  iconButton,
}: {
  icon?: boolean
  buttonTitle?: string | JSX.Element
  buttonStyles?: string
  iconButton?: boolean
}) => {
  return (
    <Button
      className={`bg-gray-200 dark:bg-inherit ${buttonStyles}`}
      disabled
      iconButton={iconButton}
    >
      <>
        {buttonTitle}
        {icon ? <GrChapterAdd className='grIcon' /> : null}
      </>
    </Button>
  )
}
