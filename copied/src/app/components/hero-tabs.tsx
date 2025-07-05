'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin } from 'react-icons/fi';

export default function HeroTabs() {
  useEffect(() => {
    // Initialize Bootstrap tabs if Bootstrap is available
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');

      tabEls.forEach(tabEl => {
        tabEl.addEventListener('click', event => {
          event.preventDefault();

          // Remove active class from all tabs
          tabEls.forEach(el => {
            el.classList.remove('active');
            el.style.backgroundColor = '#f8f9fa';
            el.style.color = '#212529';
            el.style.boxShadow = 'none';
          });

          // Add active class to clicked tab
          tabEl.classList.add('active');
          tabEl.style.backgroundColor = 'var(--primary-color)';
          tabEl.style.color = 'white';
          tabEl.style.boxShadow = '0 2px 5px rgba(74, 111, 165, 0.2)';

          // Hide all tab panes
          const tabPanes = document.querySelectorAll('.tab-pane');
          tabPanes.forEach(pane => {
            pane.classList.remove('show', 'active');
          });

          // Show the target tab pane
          const target = tabEl.getAttribute('data-bs-target');
          if (target) {
            const targetPane = document.querySelector(target);
            if (targetPane) {
              targetPane.classList.add('show', 'active');
            }
          }
        });
      });
    }
  }, []);

  return (
    <div className="card shadow border-0" style={{borderRadius: '8px'}} data-aos="fade-up" data-aos-delay="200">
      {/* Tabs for property type - 99acres style */}
      <div className="bg-white" style={{borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}}>
        <ul className="nav nav-tabs border-0 d-flex" role="tablist" style={{marginBottom: '-1px'}}>
          <li className="nav-item flex-fill" role="presentation">
            <button className="nav-link active w-100 py-2 rounded-0 border-0 text-center fw-medium"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      fontSize: '14px',
                      borderTopLeftRadius: '8px'
                    }}
                    id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab">
              Buy
            </button>
          </li>
          <li className="nav-item flex-fill" role="presentation">
            <button className="nav-link w-100 py-2 rounded-0 border-0 text-center fw-medium"
                    style={{
                      fontSize: '14px',
                      backgroundColor: '#f8f9fa',
                      transition: 'all 0.3s ease'
                    }}
                    id="rent-tab" data-bs-toggle="tab" data-bs-target="#rent" type="button" role="tab">
              Rent / Lease
            </button>
          </li>
          <li className="nav-item flex-fill" role="presentation">
            <button className="nav-link w-100 py-2 rounded-0 border-0 text-center fw-medium"
                    style={{
                      fontSize: '14px',
                      backgroundColor: '#f8f9fa',
                      transition: 'all 0.3s ease'
                    }}
                    id="pg-tab" data-bs-toggle="tab" data-bs-target="#pg" type="button" role="tab">
              Plots/Land
            </button>
          </li>
          <li className="nav-item flex-fill" role="presentation">
            <button className="nav-link w-100 py-2 rounded-0 border-0 text-center fw-medium"
                    style={{
                      fontSize: '14px',
                      backgroundColor: '#f8f9fa',
                      transition: 'all 0.3s ease',
                      borderTopRightRadius: '8px'
                    }}
                    id="commercial-tab" data-bs-toggle="tab" data-bs-target="#commercial" type="button" role="tab">
              PG / Co-living
            </button>
          </li>
        </ul>
      </div>

      {/* Search form - 99acres style */}
      <div className="tab-content bg-white p-3" style={{borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
        <div className="tab-pane fade show active" id="buy" role="tabpanel">
          <div className="row g-2 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Property Type</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>All Residential</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Independent House</option>
                <option>Builder Floor</option>
                <option>Penthouse</option>
                <option>Studio Apartment</option>
              </select>
            </div>
            <div className="col-lg-5 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>City, Locality, Project</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{height: '38px'}}>
                  <FiMapPin className="text-muted" style={{fontSize: '14px'}} />
                </span>
                <input type="text" className="form-control border-start-0 py-1"
                       style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}
                       placeholder="Enter city, locality, project or landmark"/>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Budget</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>Budget</option>
                <option>₹5 Lac - ₹10 Lac</option>
                <option>₹10 Lac - ₹20 Lac</option>
                <option>₹20 Lac - ₹30 Lac</option>
                <option>₹30 Lac - ₹40 Lac</option>
                <option>₹40 Lac - ₹50 Lac</option>
                <option>₹50 Lac - ₹60 Lac</option>
                <option>₹60 Lac+</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6">
              <button type="button" className="btn w-100 py-1 fw-medium"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontSize: '14px',
                        height: '38px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(74, 111, 165, 0.3)'
                      }}>
                <FiSearch className="me-1" style={{fontSize: '14px'}} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Rent tab */}
        <div className="tab-pane fade" id="rent" role="tabpanel">
          <div className="row g-2 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Property Type</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>All Residential</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Independent House</option>
                <option>Builder Floor</option>
                <option>Penthouse</option>
                <option>Studio Apartment</option>
              </select>
            </div>
            <div className="col-lg-5 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>City, Locality, Project</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{height: '38px'}}>
                  <FiMapPin className="text-muted" style={{fontSize: '14px'}} />
                </span>
                <input type="text" className="form-control border-start-0 py-1"
                       style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}
                       placeholder="Enter city, locality, project or landmark"/>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Budget</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>Budget</option>
                <option>₹5K - ₹10K</option>
                <option>₹10K - ₹15K</option>
                <option>₹15K - ₹20K</option>
                <option>₹20K - ₹25K</option>
                <option>₹25K - ₹30K</option>
                <option>₹30K - ₹40K</option>
                <option>₹40K+</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6">
              <button type="button" className="btn w-100 py-1 fw-medium"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontSize: '14px',
                        height: '38px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(74, 111, 165, 0.3)'
                      }}>
                <FiSearch className="me-1" style={{fontSize: '14px'}} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Plots/Land tab */}
        <div className="tab-pane fade" id="pg" role="tabpanel">
          <div className="row g-2 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Land Type</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>All Plots & Land</option>
                <option>Residential Plot</option>
                <option>Commercial Plot</option>
                <option>Agricultural Land</option>
                <option>Industrial Land</option>
              </select>
            </div>
            <div className="col-lg-5 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>City, Locality</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{height: '38px'}}>
                  <FiMapPin className="text-muted" style={{fontSize: '14px'}} />
                </span>
                <input type="text" className="form-control border-start-0 py-1"
                       style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}
                       placeholder="Enter city or locality"/>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Budget</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>Budget</option>
                <option>₹5 Lac - ₹10 Lac</option>
                <option>₹10 Lac - ₹20 Lac</option>
                <option>₹20 Lac - ₹30 Lac</option>
                <option>₹30 Lac - ₹50 Lac</option>
                <option>₹50 Lac - ₹1 Cr</option>
                <option>₹1 Cr+</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6">
              <button type="button" className="btn w-100 py-1 fw-medium"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontSize: '14px',
                        height: '38px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(74, 111, 165, 0.3)'
                      }}>
                <FiSearch className="me-1" style={{fontSize: '14px'}} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* PG/Co-living tab */}
        <div className="tab-pane fade" id="commercial" role="tabpanel">
          <div className="row g-2 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Looking for</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>PG/Hostel</option>
                <option>Co-living</option>
                <option>Shared Flat</option>
                <option>Serviced Apartment</option>
              </select>
            </div>
            <div className="col-lg-5 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>City, Locality</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{height: '38px'}}>
                  <FiMapPin className="text-muted" style={{fontSize: '14px'}} />
                </span>
                <input type="text" className="form-control border-start-0 py-1"
                       style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}
                       placeholder="Enter city, locality or area"/>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-medium text-dark mb-1" style={{fontSize: '12px'}}>Budget</label>
              <select className="form-select py-1 border" style={{fontSize: '13px', height: '38px', boxShadow: 'none'}}>
                <option>Budget</option>
                <option>₹3K - ₹5K</option>
                <option>₹5K - ₹7K</option>
                <option>₹7K - ₹10K</option>
                <option>₹10K - ₹15K</option>
                <option>₹15K - ₹20K</option>
                <option>₹20K+</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6">
              <button type="button" className="btn w-100 py-1 fw-medium"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontSize: '14px',
                        height: '38px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(74, 111, 165, 0.3)'
                      }}>
                <FiSearch className="me-1" style={{fontSize: '14px'}} /> Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
