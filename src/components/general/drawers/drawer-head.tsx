import React from 'react'
import Head from 'next/head'

export const DrawerHead = () => {
  return (
    <Head>
      <style>
        {`html { overflow: hidden; }
.row-bg::after {
  content: "";
  background: #2b6cb0;
  position: absolute;
  height: 100%;
  top: 0;
  left: -1.3rem;
  z-index: 0;
  transition: all 0 ease;
  opacity: .2;
  border-radius: 2px;
}
@media (any-pointer: coarse) {
  ul a {
    padding:inherit;
  }
}`}
      </style>
    </Head>
  )
}
