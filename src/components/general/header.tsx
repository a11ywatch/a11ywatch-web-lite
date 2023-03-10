import React, { FC, PropsWithChildren } from 'react'

type HeaderProps = PropsWithChildren<{
  id?: string
  className?: string
  itemProp?: string
  style?: React.CSSProperties
}>

// h1
export const Header: FC<HeaderProps> = ({ children, id, className, style }) => {
  return (
    <h1
      id={id}
      style={style}
      className={`font-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-[90vw] py-4 sm:leading-[1.1em]${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </h1>
  )
}

export const Header2: FC<HeaderProps> = ({
  children,
  className,
  itemProp,
  style,
}) => {
  return (
    <h2
      itemProp={itemProp}
      style={style}
      className={[
        `font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl py-3 sm:leading-[1.1em]`,
        className,
      ].join(' ')}
    >
      {children}
    </h2>
  )
}

export const Header3: FC<HeaderProps> = ({
  children,
  className,
  itemProp,
  style,
}) => {
  return (
    <h3
      itemProp={itemProp}
      style={style}
      className={[
        `font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl py-3 sm:leading-[1.1em]`,
        className,
      ].join(' ')}
    >
      {children}
    </h3>
  )
}

export const Header4: FC<HeaderProps> = ({
  children,
  className,
  itemProp,
  style,
}) => {
  return (
    <h4
      itemProp={itemProp}
      style={style}
      className={[
        `font-medium text-base md:text-lg lg:text-xl xl:text-2xl py-2 sm:leading-[1.1em]`,
        className,
      ].join(' ')}
    >
      {children}
    </h4>
  )
}

export const Header5: FC<HeaderProps> = ({ children, style }) => {
  return (
    <h5
      style={style}
      className={`font-medium text-sm md:text-base lg:text-lg xl:text-xl py-2 sm:leading-[1.1em]`}
    >
      {children}
    </h5>
  )
}
