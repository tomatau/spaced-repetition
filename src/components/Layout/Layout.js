import React from 'react'
import cx from 'classnames'
import './Layout.css'

export function Section({ className, wider, ...props }) {
  return (
    <section
      className={cx({
        'Layout__section': true,
        'Layout__section--wider': wider,
      }, className)}
      {...props}
    />
  )
}

export function FullWidth({ className, darker, ...props }) {
  return (
    <div
      className={cx({
        'Layout__full-width': true,
        'Layout__full-width--darker': darker,
      }, className)}
      {...props}
    />
  )
}

export function Header({ className, ...props }) {
  return (
    <header
      className={cx('Layout__header', className)}
      {...props}
    />
  )
}
