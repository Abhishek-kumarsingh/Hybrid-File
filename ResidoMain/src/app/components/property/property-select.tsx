'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Select = dynamic(()=>import('react-select'),{ssr:false})

const shorty = [
    { value: '1', label: 'Low Price' },
    { value: '1', label: 'High Price' },
    { value: '1', label: 'Most Popular' },
]

export default function PropertySelect() {
  return (
    <Select options={shorty}  className="form-control" placeholder="Show All"/>
  )
}
