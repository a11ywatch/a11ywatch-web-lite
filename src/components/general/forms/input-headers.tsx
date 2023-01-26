import { memo } from 'react'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { Button } from '../buttons'
import { TextField } from '../text-field'

// dynamic headers for forms
export function InputHeadersComponent({
  customHeader,
  customFields,
  removeFormField,
  addFormField,
  updateFormField,
}: any) {
  if (customHeader) {
    return (
      <ul className='border-t list-style-none py-1'>
        {customFields?.map((item: any, index: number) => {
          const inputKeyName = 'Key'
          const inputValueName = 'Value'

          return (
            <li className={`flex flex-1 px-1 space-x-2`} key={index}>
              <TextField
                autoFocus
                underline
                value={item.key}
                placeholder={inputKeyName}
                required
                onChange={(event: any) =>
                  updateFormField(
                    event.target.value,
                    index,
                    inputKeyName.toLowerCase()
                  )
                }
              />
              <TextField
                underline
                value={item?.value}
                placeholder={inputValueName}
                onChange={(event: any) =>
                  updateFormField(
                    event.target.value,
                    index,
                    inputValueName.toLowerCase()
                  )
                }
                required
              />
              {customFields?.length > 1 ? (
                <Button
                  aria-label='add header field'
                  onClick={() => removeFormField(index)}
                  iconButton
                >
                  <GrSubtractCircle />
                </Button>
              ) : null}
              {index === customFields?.length - 1 ? (
                <Button
                  aria-label='add header field'
                  onClick={addFormField}
                  iconButton
                >
                  <GrAddCircle className='grIcon' />
                </Button>
              ) : null}
            </li>
          )
        })}
      </ul>
    )
  }
  return null
}

export const InputHeaders = memo(InputHeadersComponent)
