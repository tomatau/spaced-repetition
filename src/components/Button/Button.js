import React from 'react'
import './Button.css'

export default function Button({ className, ...props }) {
  return (
    <button className={['Button', className].join(' ')} {...props} />
  )
}
