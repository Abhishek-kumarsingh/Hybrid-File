import React, { useState } from 'react'
import Link from 'next/link'

export default function DetailSidebarTwo() {
    let [count1, setCount1] = useState<number>(0)
    let [count2, setCount2] = useState<number>(0)
    let [activeTab, setActiveTab] = useState<number>(1)

    const increment = () =>{
        if(count1 >= 0){
            setCount1(count1 + 1)
        }
    }
    const decrement = () =>{
        if(count1 > 0){
            setCount1(count1 - 1)
        }
    }
    const increment2 = () =>{
        if(count2 >= 0){
            setCount2(count2 + 1)
        }
    }
    const decrement2 = () =>{
        if(count2 > 0){
            setCount2(count2 - 1)
        }
    }
  return (
    <>
        <div className="like_share_wrap b-0">
            <ul className="like_share_list">
                <li><Link href="#" className="btn btn-likes" data-toggle="tooltip" data-original-title="Share"><i className="fas fa-share"></i>Share</Link></li>
                <li><Link href="#" className="btn btn-likes" data-toggle="tooltip" data-original-title="Save"><i className="fas fa-heart"></i>Save</Link></li>
            </ul>
        </div>
        
        <div className="property-sidebar side_stiky">
                                            
            <div className="sider_blocks_wrap">
                <div className="side-booking-header">
                    <ul className="nav nav-pills sider_tab" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <Link scroll={false} className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="#" onClick={()=>setActiveTab(1)}>Book Now</Link>
                        </li>
                        <li className="nav-item">
                            <Link scroll={false} className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="#" onClick={()=>setActiveTab(2)}>Appointment</Link>
                        </li>
                    </ul>
                </div>
                <div className="sidetab-content">
                    <div className="tab-content">
                        <div className={`tab-pane fade ${activeTab === 1 ? 'active show' : ''}`}>
                            <div className="side-booking-body">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="guests">Check In</label>
                                            <div className="cld-box">
                                                <input type="date" name="checkin" className="form-control ps-3"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="guests">Check Out</label>
                                            <div className="cld-box">
                                                <input type="date" name="checkout" className="form-control ps-3"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="form-group">
                                            <div className="guests">
                                                <label htmlFor="guests">Adults</label>
                                                <div className="guests-box">
                                                    <button className="counter-btn" type="button" id="cnt-down" onClick={()=>decrement()}><i className="fa-solid fa-minus"></i></button>
                                                    <input type="text" id="guestNo" name="guests" value={count1}/>
                                                    <button className="counter-btn" type="button" id="cnt-up" onClick={()=>increment()}><i className="fa-solid fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="form-group">
                                            <div className="guests">
                                                <label htmlFor="guests">Kids</label>
                                                <div className="guests-box">
                                                    <button className="counter-btn" type="button" id="cnt-down" onClick={()=>decrement2()}><i className="fa-solid fa-minus"></i></button>
                                                    <input type="text" id="guestNo" name="guests" value={count2}/>
                                                    <button className="counter-btn" type="button" id="cnt-up" onClick={()=>increment2()}><i className="fa-solid fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                                        <label htmlFor="guests">Advance features</label>
                                        <div className="_adv_features_list">
                                            <ul className="no-ul-list">
                                                <li>
                                                    <input id="a-1" className="form-check-input me-2" name="a-1" type="checkbox"/>
                                                    <label htmlFor="a-1" className="form-check-label">Air Condition<i>$10</i></label>
                                                </li>
                                                <li>
                                                    <input id="a-2" className="form-check-input me-2" name="a-2" type="checkbox" defaultChecked/>
                                                    <label htmlFor="a-2" className="form-check-label">Bedding<i>$07</i></label>
                                                </li>
                                                <li>
                                                    <input id="a-3" className="form-check-input me-2" name="a-3" type="checkbox" defaultChecked/>
                                                    <label htmlFor="a-3" className="form-check-label">Heating<i>$20</i></label>
                                                </li>
                                                <li>
                                                    <input id="a-4" className="form-check-input me-2" name="a-4" type="checkbox"/>
                                                    <label htmlFor="a-4" className="form-check-label">Internet<i>$10</i></label>
                                                </li>
                                                <li>
                                                    <input id="a-5" className="form-check-input me-2" name="a-5" type="checkbox"/>
                                                    <label htmlFor="a-5" className="form-check-label">Microwave<i>$05</i></label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                                        <label htmlFor="guests">Price & Tax</label>
                                        <div className="_adv_features">
                                            <ul>
                                                <li>I Night<span>$310</span></li>
                                                <li>Discount 25$<span>-$250</span></li>
                                                <li>Service Fee<span>$17</span></li>
                                                <li>Breakfast Per Adult<span>$35</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="side-booking-foot">
                                            <span className="sb-header-left">Total Payment</span>
                                            <h3 className="price text-primary">$170</h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="stbooking-footer mt-1">
                                            <div className="form-group mb-0 pb-0">
                                                <Link href="#" className="btn btn-primary fw-medium full-width">Book It Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`tab-pane fade ${activeTab === 2 ? 'active show' : ''}`}>
                            <div className="sider-block-body p-3">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" className="form-control light" placeholder="Enter Name"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label>Email ID</label>
                                            <input type="text" className="form-control light" placeholder="Enter eMail ID"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label>Contact Number</label>
                                            <input type="text" className="form-control light" placeholder="Enter Phone No."/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label>Message</label>
                                            <textarea className="form-control light" placeholder="Explain Query"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <button className="btn btn-primary fw-medium full-width">Make Appointment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
