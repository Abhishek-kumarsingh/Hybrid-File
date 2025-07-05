"use client"
import React from 'react'
import Navbar from '../components/navbar/navbar'

export default function Loading() {
  return (
    <>
      <Navbar transparent={false}/>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="loading-spinner mb-4">
              <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <h3 className="mb-3">Loading Property Details...</h3>
            <p className="text-muted">Please wait while we fetch the property information for you.</p>
          </div>
        </div>
        
        {/* Loading skeleton for property details */}
        <div className="row mt-4">
          <div className="col-lg-8 col-md-12">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <div className="placeholder-glow">
                <div className="placeholder col-4 mb-3" style={{height: '24px'}}></div>
                <div className="placeholder col-8 mb-2" style={{height: '32px'}}></div>
                <div className="placeholder col-6 mb-4" style={{height: '20px'}}></div>
                <div className="placeholder col-3 mb-3" style={{height: '28px'}}></div>
                <div className="d-flex justify-content-between mb-4">
                  <div className="placeholder col-3" style={{height: '20px'}}></div>
                  <div className="placeholder col-3" style={{height: '20px'}}></div>
                  <div className="placeholder col-3" style={{height: '20px'}}></div>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm p-4">
              <div className="placeholder-glow">
                <div className="placeholder col-5 mb-3" style={{height: '24px'}}></div>
                <div className="placeholder col-12 mb-3" style={{height: '200px'}}></div>
                <div className="placeholder col-12 mb-2" style={{height: '16px'}}></div>
                <div className="placeholder col-12 mb-2" style={{height: '16px'}}></div>
                <div className="placeholder col-10 mb-2" style={{height: '16px'}}></div>
                <div className="placeholder col-8 mb-4" style={{height: '16px'}}></div>
                
                <div className="placeholder col-5 mb-3" style={{height: '24px'}}></div>
                <div className="placeholder col-12 mb-2" style={{height: '16px'}}></div>
                <div className="placeholder col-12 mb-2" style={{height: '16px'}}></div>
                <div className="placeholder col-9 mb-4" style={{height: '16px'}}></div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-12">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <div className="placeholder-glow">
                <div className="placeholder col-8 mb-3" style={{height: '24px'}}></div>
                <div className="placeholder col-12 mb-3" style={{height: '120px'}}></div>
                <div className="placeholder col-12 mb-3" style={{height: '45px'}}></div>
                <div className="placeholder col-12 mb-3" style={{height: '45px'}}></div>
                <div className="placeholder col-12 mb-3" style={{height: '45px'}}></div>
                <div className="placeholder col-12" style={{height: '45px'}}></div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm p-4">
              <div className="placeholder-glow">
                <div className="placeholder col-7 mb-3" style={{height: '24px'}}></div>
                <div className="d-flex align-items-center mb-3">
                  <div className="placeholder col-3 me-3" style={{height: '60px', width: '60px', borderRadius: '50%'}}></div>
                  <div>
                    <div className="placeholder col-8 mb-2" style={{height: '20px'}}></div>
                    <div className="placeholder col-6" style={{height: '16px'}}></div>
                  </div>
                </div>
                <div className="placeholder col-12 mb-3" style={{height: '45px'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
