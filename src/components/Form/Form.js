import React from 'react'
import './Form.css'

export function Label({ className, ...props }) {
  return (
    <label className={['Label', className].join(' ')} {...props} />
  )
}

export function Input({ className, ...props }) {
  return (
    <input className={['Input', className].join(' ')} type='text' {...props} />
  )
}

export function Required({ className, ...props }) {
  return (
    <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
  )
}

export function Textarea({ className, ...props }) {
  return (
    <textarea className={['Textarea', className].join(' ')} {...props} />
  )
}
