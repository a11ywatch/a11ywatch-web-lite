import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CheckoutForm } from '@app/components/stripe/checkout'
import { StripeBadges } from '@app/components/stripe/badges'
import { Button, NavBar, PaymentPlans } from '@app/components/general'
import { metaSetter } from '@app/utils'
import { EmptyPayments } from '@app/components/empty/views/payments'
import type { PageProps } from '@app/types'
import { StripProvider } from '@app/components/stripe/stripe-provider'
import { Header } from '@app/components/general/header'
import { StateLessDrawer } from '@app/components/general/drawers'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { priceHandler } from '@app/utils/price-handler'
import { usePaymentsHook } from '@app/data/external/payments/use-payments'
import { roleMap } from '@app/utils/role-map'
import { useAuthContext } from '@app/components/providers/auth'
import { AppManager } from '@app/managers'

interface PaymentProps extends PageProps {
  hideTitle?: boolean
}

// determine the page title
const renderPaymentTitle = (renderPayMentBoxes?: boolean) => {
  return renderPayMentBoxes
    ? 'Get the plan that makes sense for you.'
    : 'Get the right plan for you. Upgrade or downgrade at any time.'
}

// move plan and yearset SSR
function Payments({ hideTitle = false, name }: PaymentProps) {
  const router = useRouter()
  const { data, loading, onToken, refetch } = usePaymentsHook()
  const [selectedPlan, setState] = useState<string>('')
  const [newCard, setNewCard] = useState<boolean>(false)
  const [yearly, setYearly] = useState<boolean>(false)
  const { account } = useAuthContext()

  // router plan query
  const queryPlan = (router?.query?.plan as string) ?? ''
  const yearSet = (router?.query?.yearly as string) ?? ''

  const role = data?.role
  const paymentSubscription = data?.paymentSubscription
  const manualCheckout = !paymentSubscription || newCard
  const partnerProgram = !loading && role && !paymentSubscription
  // allow payments on all non maxed accounts
  const subTitle = renderPaymentTitle(partnerProgram)

  const priceMultiplyier = yearly ? 0 : ''
  const currentPlan = roleMap(role)
  const basePlan = role && currentPlan

  const price = priceHandler(selectedPlan || basePlan || 'L1')
  const selectedPrice = Number(`${price}${priceMultiplyier}`)

  // the plan at hand for payments
  const paymentPlan = selectedPlan || basePlan || 'L1'

  useEffect(() => {
    if (yearSet) {
      setYearly(true)
    }
    if (queryPlan) {
      setState(queryPlan)
    }
  }, [yearSet, queryPlan])

  // on valid payment handling re-set current token
  const onTokenEvent = async (token: any) => {
    await onToken(token, { plan: paymentPlan, yearly })
  }

  const handleChange = async (newState: string) => {
    if (!manualCheckout) {
      if (newState !== currentPlan) {
        await onToken('', { plan: newState, yearly }, true)
        if (typeof refetch === 'function') {
          await refetch()
        }
        AppManager.toggleSnack(true, `Plan set to ${newState}`)
      }
    }
    setState(newState)
  }

  const onToggleCard = () => setNewCard((x) => !x)

  let initialSelectIndex = 0

  if (role > 5) {
    initialSelectIndex = role - 6
  } else if (role) {
    initialSelectIndex = role - 1
  }

  return (
    <>
      <NavBar title={name} backButton notitle authenticated={account.authed} />
      <StateLessDrawer size='max-w-screen-2xl'>
        <SectionContainer container block gapY={false}>
          {hideTitle ? null : <Header>Payments</Header>}
          {loading && !data ? (
            <>
              <EmptyPayments subTitle={subTitle} />
            </>
          ) : (
            <>
              <p className='text-xl pb-2'>{subTitle}</p>
              <PaymentPlans
                onClick={handleChange}
                currentPlan={currentPlan}
                setYearly={setYearly}
                yearly={yearly}
                initialIndex={initialSelectIndex}
                highPlan={role > 5}
              />
              <div>
                {!partnerProgram ? (
                  <div className='space-y-8 py-1'>
                    <div className='sm:w-full place-content-center place-items-center align-center min-w-[350px]'>
                      <div className='space-y-3'>
                        {!data?.activeSubscription || newCard ? (
                          <>
                            {newCard && data?.activeSubscription ? (
                              <Button
                                onClick={onToggleCard}
                                className={'border-none font-semibold'}
                              >
                                Use Old Card
                              </Button>
                            ) : null}
                            <StripProvider>
                              <CheckoutForm
                                onToken={onTokenEvent}
                                plan={paymentPlan}
                                price={selectedPrice}
                                disabled={!paymentPlan}
                              />
                            </StripProvider>
                          </>
                        ) : (
                          <Button
                            onClick={onToggleCard}
                            className={
                              'border-none font-semibold text-blue-700'
                            }
                          >
                            Add New Card
                          </Button>
                        )}
                      </div>
                    </div>
                    <StripeBadges />
                  </div>
                ) : (
                  <div>
                    <div className='text-base font-semibold'>
                      Partner Program Enabled
                    </div>
                    <p>
                      {paymentSubscription
                        ? yearly
                          ? 'Yearly'
                          : 'Monthly'
                        : 'Contact support to alter your plan'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </SectionContainer>
      </StateLessDrawer>
    </>
  )
}

export default metaSetter(
  { Payments },
  {
    description:
      'Payment plans that can be adjusted at any time. Scale with your team and your web needs.',
    gql: true,
  }
)
