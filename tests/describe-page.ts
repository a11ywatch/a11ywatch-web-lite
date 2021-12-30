import { createElement, FC } from 'react'
import { render, screen } from '@testing-library/react'
import { MyApp } from '../src/components/general/app'

interface Target {
  component?: FC
  folder?: string
  name?: string
  apollo?: boolean
}

export const describePage = jest.fn(
  ({ component, folder, name }: Target, callBack?: () => void) => {
    describe(folder.toUpperCase(), () => {
      const Component = component || require(`@app/pages/${folder}`).default

      it('renders without crashing', () => {
        render(
          createElement(MyApp, {
            name,
            Component,
          })
        )

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

        if (typeof name !== 'undefined') {
          expect(screen.getByRole('heading', { name })).toBeInTheDocument()
        }

        if (typeof callBack === 'function') {
          jest.fn(callBack)
        }
      })
    })
  }
)
