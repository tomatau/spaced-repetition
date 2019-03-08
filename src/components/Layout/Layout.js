import React from 'react'
import cx from 'classnames'
import './Layout.css'

export function Section({ className, ...props }) {
  return (
    <section
      className={['Layout__section', className].join(' ')}
      {...props}
    />
  )
}

export function FullWidth({ className, green, ...props }) {
  return (
    <div
      className={cx({
        'Layout__full-width': true,
        'Layout__full-width--green': green,
      }, className)}
      {...props}
    />
  )
}

export function Header({ className, ...props }) {
  return (
    <header
      className={['Layout__header', className].join(' ')}
      {...props}
    />
  )
}