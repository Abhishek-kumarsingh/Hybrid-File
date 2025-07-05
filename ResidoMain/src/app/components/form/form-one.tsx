"use client"
import React from 'react'
import dynamic from 'next/dynamic';

const Select = dynamic(()=>import('react-select'),{ssr:false})


export default function FormOne() {
    const minprice = [
        { value: '1', label: '$500' },
        { value: '1', label: '$1000' },
        { value: '1', label: '$1500' },
        { value: '1', label: '$2000' },
        { value: '1', label: '$3000' },
      ];
      const maxprice = [
          { value: '1', label: '$1000' },
          { value: '1', label: '$1500' },
          { value: '1', label: '$2000' },
          { value: '1', label: '$3000' },
          { value: '1', label: '$3000' },
      ];
    
      const propertyType = [
          { value: '1', label: 'Rental' },
          { value: '1', label: 'Villas' },
          { value: '1', label: 'Offices' },
          { value: '1', label: 'Condos' },
          { value: '1', label: 'Studios' },
      ]
      const rooms = [
          { value: '1', label: '1' },
          { value: '1', label: '2' },
          { value: '1', label: '3' },
          { value: '1', label: '4' },
          { value: '1', label: '5' },
      ]
      const loction = [
          { value: '1', label: 'Los Angeles, CA' },
          { value: '1', label: 'New York City, NY' },
          { value: '1', label: 'Chicago, IL' },
          { value: '1', label: 'Houston, TX' },
          { value: '1', label: 'Philadelphia, PA' },
          { value: '1', label: 'San Antonio, TX' },
          { value: '1', label: 'San Jose, CA' },
      ]
  return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className='mb-2'>Min Price</label>
                        <Select options={minprice}  className="form-control" placeholder="No Min"/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className='mb-2'>Max Price</label>
                        <Select options={maxprice} className="form-control" placeholder="No Max"/>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className='mb-2'>Property Type</label>
                        <Select options={propertyType} className="form-control" placeholder="Show All"/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className='mb-2'>Bed Rooms</label>
                        <Select options={rooms} className="form-control" placeholder="Bedrooms"/>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                        <label className='mb-2'>Property Location</label>
                        <Select options={loction} className="form-control" placeholder="All Cities"/>
                    </div>
                </div>
            </div>
        </>
  )
}
