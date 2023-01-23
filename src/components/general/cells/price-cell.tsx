import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr'

const highLight = (highLightStyles: any, selected: boolean, d: string = '') =>
  selected ? highLightStyles : d

const SubHeading = ({ children, pricingPage, ...extra }: any) =>
  pricingPage ? <h3 {...extra}>{children}</h3> : <h4 {...extra}> {children}</h4>

export function PriceCell({
  selected,
  onClick,
  pricingPage,
  textColor,
  yearly,
  costYearly,
  cost,
  selectHighPlans,
  activePlan,
  pageCount,
}: any) {
  const pageCountFormatted = Intl.NumberFormat().format(pageCount || 0)

  return (
    <button
      className={`w-full h-full rounded flex flex-1 flex-col justify-between border border-[#2A2A2A] sm:w-full md:min-w-[450px] lg:min-w-[550px] ${highLight(
        'border-blue-600',
        selected,
        ''
      )} border-t-[4px] border-2 ${
        onClick
          ? `hover:border-blue-700 hover:opacity-95 active:opacity-90 active:opacity-100 active:border-[#2A2A2A]`
          : ''
      } rounded`}
      onClick={onClick}
      disabled={activePlan}
    >
      <>
        <div className='w-full'>
          <div
            className={`text-left w-full flex-col text-white px-4 py-4 ${highLight(
              'bg-blue-700 text-white',
              selected,
              selectHighPlans ? 'bg-gradient-radial' : `bg-[${textColor}]`
            )}`}
          >
            <SubHeading
              className={`w-full ${highLight(
                'text-gray-50',
                selected,
                selectHighPlans ? 'text-black dark:text-white' : ''
              )}`}
              pricingPage={pricingPage}
            >
              <span
                className={
                  'text-base font-light flex place-items-center place-content-between gap-x-4'
                }
              >
                <span className='block'>
                  {activePlan ? (
                    <span className='text-xs'>{'Active Plan'}</span>
                  ) : null}
                  <span className={'flex gap-x-4 place-items-center'}>
                    <span className='text-xl md:text-2xl font-semibold w-[135px]'>
                      {yearly ? costYearly : cost}
                    </span>
                    <span
                      className={`text-sm ${
                        selectHighPlans && !selected ? '' : 'text-gray-100'
                      }`}
                    >
                      up to {pageCountFormatted} monthly analyzations
                    </span>
                  </span>
                </span>
                {selected ? (
                  <GrCheckboxSelected className='grIcon text-lg' />
                ) : (
                  <GrCheckbox className='grIcon text-lg' />
                )}
              </span>
            </SubHeading>
          </div>
        </div>
      </>
    </button>
  )
}
