'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import Slider from 'rc-slider';
import '../../../../node_modules/rc-slider/assets/index.css'

export default function FilterModal() {
    let [open, setOpen] = useState<boolean>(false)

    const [range, setRange] = useState<number[]>([20, 80]); 

    const handleRangeChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
        setRange(values); 
        }
    };
  return (
    <>
        <Link href="#" className="w-12 h-12" onClick={()=>setOpen(!open)}>
            <span className="svg-icon text-primary svg-icon-2hx">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"/>
                    <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"/>
                </svg>
            </span>
        </Link>

        {open && 
        <div className="modal fade bd-example-modal-lg show d-block" id="filter" style={{ backgroundColor:"#0000008a"}}>
          <div className="modal-dialog modal-lg filter_scroll" role="document">
            <div className="modal-content" id="sign-up">
              <span className="mod-close" onClick={()=>setOpen(!open)}><i className="fa-solid fa-xmark"></i></span>
              <div className="modal-body">
                <div className="filter_modal">
                  <div className="filter_modal_inner">
                    <div className="filter_modal_flex">
                    
                      <div className="adv_ft_title"><h5>Advance Filter</h5></div>
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Price</label></div>
                        <div className="flt_item_content flcl">
                          <div className="rg-slider">
                          <Slider
                                range 
                                min={0}
                                max={100}
                                defaultValue={[20, 80]} 
                                value={range}
                                onChange={handleRangeChange} 
                                allowCross={false} 
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                <span>Min: {range[0]}</span>
                                <span>Max: {range[1]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Bedrooms</label></div>
                        <div className="flt_item_content">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bd-1" className="switchbtn-checkbox" type="checkbox" value="bd1" name="bd-1"/>
                              <label className="switchbtn-label" htmlFor="bd-1">Studio</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bd-2" className="switchbtn-checkbox" type="checkbox" value="bd2" name="bd-2"/>
                              <label className="switchbtn-label" htmlFor="bd-2">1</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bd-3" className="switchbtn-checkbox" type="checkbox" value="bd3" name="bd-3"/>
                              <label className="switchbtn-label" htmlFor="bd-3">2</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bd-4" className="switchbtn-checkbox" type="checkbox" value="bd4" name="bd-4"/>
                              <label className="switchbtn-label" htmlFor="bd-4">3</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bd-5" className="switchbtn-checkbox" type="checkbox" value="bd5" name="bd-5"/>
                              <label className="switchbtn-label" htmlFor="bd-5">4+</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Bathrooms</label></div>
                        <div className="flt_item_content">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bt-1" className="switchbtn-checkbox" type="checkbox" value="bt1" name="bt-1"/>
                              <label className="switchbtn-label" htmlFor="bt-1">1</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bt-2" className="switchbtn-checkbox" type="checkbox" value="bt2" name="bt-2"/>
                              <label className="switchbtn-label" htmlFor="bt-2">2</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bt-3" className="switchbtn-checkbox" type="checkbox" value="bt3" name="bt-3"/>
                              <label className="switchbtn-label" htmlFor="bt-3">3</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bt-4" className="switchbtn-checkbox" type="checkbox" value="bt4" name="bt-4"/>
                              <label className="switchbtn-label" htmlFor="bt-4">4</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="bt-5" className="switchbtn-checkbox" type="checkbox" value="bt5" name="bt-5"/>
                              <label className="switchbtn-label" htmlFor="bt-5">5+</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Hot Deals</label></div>
                        <div className="flt_item_content">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="d-4" className="switchbtn-checkbox" type="checkbox" value="d" name="d-4"/>
                              <label className="switchbtn-label" htmlFor="d-4">Hot Deals</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Pets</label></div>
                        <div className="flt_item_content">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="pet-4" className="switchbtn-checkbox" type="checkbox" value="pet" name="pet-4"/>
                              <label className="switchbtn-label" htmlFor="pet-4">Pet Friendly</label>
                            </div>
                          </div>
                        </div>
                      </div>
                  
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Laundry</label></div>
                        <div className="flt_item_content">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="ld-1" className="switchbtn-checkbox" type="checkbox" value="ld1" name="ld-1"/>
                              <label className="switchbtn-label" htmlFor="ld-1">Washer/Dryer In Unit</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="ld-2" className="switchbtn-checkbox" type="checkbox" value="ld2" name="ld-2"/>
                              <label className="switchbtn-label" htmlFor="ld-2">Washer/Dryer Connections</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="ld-3" className="switchbtn-checkbox" type="checkbox" value="ld3" name="ld-3"/>
                              <label className="switchbtn-label" htmlFor="ld-3">Laundry Facility</label>
                            </div>
                          </div>
                        </div>
                      </div>
                  
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Amenities</label></div>
                        <div className="flt_item_content align_center">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-1" className="switchbtn-checkbox" type="checkbox" value="am1" name="am-1"/>
                              <label className="switchbtn-label" htmlFor="am-1">Air Conditioning</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-2" className="switchbtn-checkbox" type="checkbox" value="am2" name="am-2"/>
                              <label className="switchbtn-label" htmlFor="am-2">Senior Living</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-3" className="switchbtn-checkbox" type="checkbox" value="am3" name="am-3"/>
                              <label className="switchbtn-label" htmlFor="am-3">Waterfront</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-4" className="switchbtn-checkbox" type="checkbox" value="am4" name="am-4"/>
                              <label className="switchbtn-label" htmlFor="am-4">Garage</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-5" className="switchbtn-checkbox" type="checkbox" value="am5" name="am-5"/>
                              <label className="switchbtn-label" htmlFor="am-5">Spa & Massage</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-6" className="switchbtn-checkbox" type="checkbox" value="am6" name="am-6"/>
                              <label className="switchbtn-label" htmlFor="am-6">Car Parking</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-7" className="switchbtn-checkbox" type="checkbox" value="am7" name="am-7"/>
                              <label className="switchbtn-label" htmlFor="am-7">Free WiFi</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-8" className="switchbtn-checkbox" type="checkbox" value="am8" name="am-8"/>
                              <label className="switchbtn-label" htmlFor="am-8">Pets Allow</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-9" className="switchbtn-checkbox" type="checkbox" value="am9" name="am-9"/>
                              <label className="switchbtn-label" htmlFor="am-9">Internet</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-10" className="switchbtn-checkbox" type="checkbox" value="am10" name="am-10"/>
                              <label className="switchbtn-label" htmlFor="am-10">Window Covering</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-11" className="switchbtn-checkbox" type="checkbox" value="am11" name="am-11"/>
                              <label className="switchbtn-label" htmlFor="am-11">Alarm</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-12" className="switchbtn-checkbox" type="checkbox" value="am12" name="am-12"/>
                              <label className="switchbtn-label" htmlFor="am-12">Gym</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-13" className="switchbtn-checkbox" type="checkbox" value="am13" name="am-13"/>
                              <label className="switchbtn-label" htmlFor="am-13">Luxury Community</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-14" className="switchbtn-checkbox" type="checkbox" value="am14" name="am-14"/>
                              <label className="switchbtn-label" htmlFor="am-14">Central Heating</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="am-15" className="switchbtn-checkbox" type="checkbox" value="am15" name="am-15"/>
                              <label className="switchbtn-label" htmlFor="am-15">Swimming Pool</label>
                            </div>
                          </div>
                        </div>
                      </div>
                  
                      <div className="flt_single_item">
                        <div className="flt_item_lablel"><label>Sort By</label></div>
                        <div className="flt_item_content">
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="st-1" className="switchbtn-checkbox" type="checkbox" value="st1" name="st-1"/>
                              <label className="switchbtn-label" htmlFor="st-1">Best Match</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="st-2" className="switchbtn-checkbox" type="checkbox" value="st2" name="st-2"/>
                              <label className="switchbtn-label" htmlFor="st-2">Price: Low to High</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="st-3" className="switchbtn-checkbox" type="checkbox" value="st3" name="st-3"/>
                              <label className="switchbtn-label" htmlFor="st-3">Price: High to Low</label>
                            </div>
                          </div>
                          <div className="switchbtn-wrap">
                            <div className="switchbtn">
                              <input id="st-4" className="switchbtn-checkbox" type="checkbox" value="st4" name="st-4"/>
                              <label className="switchbtn-label" htmlFor="st-4">Top Rated</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="elgio_filter">
                  <div className="elgio_ft_first">
                    <button className="btn btn-dark">
                      Reset<span className="reset_counter">10</span>
                    </button>
                  </div>
                  <div className="elgio_ft_last">
                    <button className="btn btn-gray mr-2">Cancel</button>
                    <button className="btn btn-primary mr-2">See 76 Properties</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
