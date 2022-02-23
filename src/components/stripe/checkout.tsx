import React from 'react'
import { theme } from '@app/theme'
import { Button } from '@material-ui/core'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

interface Props {
  onToken(token: any): any
  basic: boolean
  price: number
  disabled: boolean
}

const style = {
  base: {
    iconColor: '#000',
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontSmoothing: 'antialiased',
  },
}

export const CheckoutForm = ({ onToken, basic, price, disabled }: Props) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement)

      if (!error) {
        await onToken(token)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div className='flex place-content-center flex-1'>
      <form
        onSubmit={handleSubmit}
        className={
          'h-42 space-y-6 bg-gray-200 p-5 rounded sm:w-full lg:w-1/3 md:1/2'
        }
      >
        <div className='text-2xl font-bold'>
          Total{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price / 100)}
        </div>
        <CardElement options={{ disabled, style }} className={'p-5 bg-white'} />
        <Button
          variant='contained'
          color='secondary'
          type='submit'
          disabled={disabled}
          style={{
            minWidth: 160,
          }}
        >
          Start {basic ? 'Basic' : 'Premium'}
        </Button>
        <div className='text-sm'>14 days money back guarantee.</div>
      </form>
    </div>
  )
}