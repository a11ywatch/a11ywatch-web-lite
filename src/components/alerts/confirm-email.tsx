import React from 'react'
import { GrMail } from 'react-icons/gr'

const classes = {
  sticky: 'fixed flex justify-center bottom-11 left-0 right-0 z-10',
  container: 'border-2 p-3',
  text: 'font-semibold text-xl',
  btn: 'flex rounded place-items-center px-2 py-1 border-2',
}

interface Props {
  sendEmail(): any
  visible: boolean
}

function ConfirmEmail({ sendEmail, visible }: Props) {
  return !!visible ? (
    <div className={classes.sticky}>
      <div
        className={[
          classes.container,
          'items-center flex rounded bg-gray-100 dark:bg-black',
        ]
          .join(' ')
          .trim()}
      >
        <p
          className={[classes.text, 'text-sm mr-5 md:text-lg lg:text-xl']
            .join(' ')
            .trim()}
        >
          Please confirm your email to get started.
        </p>
        <button
          onClick={sendEmail}
          title={'Resend email confirmation'}
          className={classes.btn}
        >
          <GrMail />
          <p className={[classes.text, 'ml-2'].join(' ').trim()}>Resend</p>
        </button>
      </div>
    </div>
  ) : null
}

export { ConfirmEmail }
