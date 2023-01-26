'use client'

import { useRef, SyntheticEvent, useCallback } from 'react'
import { AppManager } from '@app/managers'
import { useRestWebsiteContext } from '@app/components/providers/rest/rest-website'
import { AccessibilityStandardKeys } from '@app/components/general/select/select-input'

function CtaInputRest({
  small,
  standard,
}: {
  small?: boolean
  standard?: AccessibilityStandardKeys
}) {
  const ref = useRef<HTMLInputElement>(null)
  const { search, setSearch, loading, toggleModal } = useRestWebsiteContext()

  const submitForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e?.preventDefault()
      if (!search) {
        return AppManager.toggleSnack(
          true,
          `Please enter a valid web url`,
          'error',
          true
        )
      }
      await toggleModal({ query: search, standard })

      if (ref.current) {
        ref.current.value = ''
      }
    },
    [toggleModal, ref, search, standard]
  )

  return (
    <form
      className={`flex flex-col md:flex-row br-4 w-initial md:w-fit`}
      onSubmit={submitForm}
      noValidate
    >
      <div
        className={`relative flex md:rounded-t md:rounded-tr-none md:rounded-bl md:rounded-l md:rounded-tr-none hover:bg-gray-300`}
      >
        <label htmlFor='search-input-c' className='sr-only'>
          Scan your website for issues
        </label>
        <input
          placeholder={'Enter website url'}
          id='search-input-c'
          ref={ref}
          type='url'
          className={`w-full border-r px-6 border-l border-t rounded-bl-none rounded-br-none rounded-l rounded-r md:w-inherit md:rounded-bl md:border-b md:border-r-0 md:rounded-r-none${
            small ? ' py-1.5' : ' py-3'
          } text-lg`}
          onChange={setSearch}
          minLength={4}
          name={'search'}
        />
      </div>
      <button
        className={`min-w-[187.562px] py-1.5 text-xl border font-bold rounded-b md:rounded-l-none md:rounded-r-md${
          loading || !search ? ' text-gray-600' : ''
        } hover:bg-[#0E1116] hover:text-white`}
        type={'submit'}
        disabled={loading || !search}
        aria-label={'Analyze website'}
      >
        Analyze
      </button>
    </form>
  )
}

export { CtaInputRest }
