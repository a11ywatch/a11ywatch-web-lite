import React, { memo } from 'react'

type CellHeaderProps = {
  title?: string
  setVisible(x: any): void
  visible?: boolean
  totalIssues?: number
}

const ListCellHeaderW = ({
  title = 'N/A',
  setVisible,
  visible,
  totalIssues,
}: CellHeaderProps) => {
  const onTogglelist = () => setVisible((v: boolean) => !v)

  return (
    <button
      className={`px-3 py-3 w-full text-left`}
      onClick={onTogglelist}
      aria-expanded={visible}
      aria-label={`Toggle section visible for ${title}`}
    >
      <div>
        <div className={'text-2xl md:text-2xl font-bold'}>{title}</div>
        <div>
          {totalIssues} possible issue
          {totalIssues === 1 ? '' : 's'}
        </div>
      </div>
    </button>
  )
}

export const ListCellHeader = memo(ListCellHeaderW)