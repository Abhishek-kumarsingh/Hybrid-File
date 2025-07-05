import React from 'react'

import UserNav from '../components/navbar/user-nav'
import AddImg from '../components/add-img'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
        <UserNav/> 

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Add Agent Under ABC Agency</h2>
                        <span className="ipn-subtitle">Add Agent Under ABC Agency</span>
                    </div>
                </div>
            </div>
        </div>

        <section className="bg-light">
	
		<div className="container">
			<div className="row">
				
				<div className="col-lg-12 col-md-12">
				
					<div className="submit-page">
					
						<div className="form-submit middle-logo">	
							<h3>Profile Logo</h3>
							<div className="submit-section">
								<div className="form-row">
									<div className="form-group col-md-12 position-relative">
										<AddImg/>
									</div>
								</div>
							</div>
						</div>
						
						<div className="form-submit">	
							<h3>Basic Information</h3>
							<div className="submit-section">
								<div className="row">
								
									<div className="form-group col-md-12">
										<label className='mb-2'>Full Name<span className="tip-topdata" data-tip="Property Title"><i className="fa-solid fa-info"></i></span></label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Designation</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Phone</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Email</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Landline</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-12">
										<label className='mb-2'>Description</label>
										<textarea className="form-control h-120"></textarea>
									</div>
									
								</div>
							</div>
						</div>
						
						<div className="form-submit">	
							<h3>Location</h3>
							<div className="submit-section">
								<div className="row">
								
									<div className="form-group col-md-6">
										<label className='mb-2'>Address</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Address 2</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Country</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>State</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>City</label>
										<input type="text" className="form-control"/>
									</div>
									
									<div className="form-group col-md-6">
										<label className='mb-2'>Zip Code</label>
										<input type="text" className="form-control"/>
									</div>
									
								</div>
							</div>
						</div>
						
						<div className="form-submit">	
							<h3>Social Accounts</h3>
							<div className="submit-section">
								<div className="row">
									<div className="form-group col-md-4">
										<label className='mb-2'>Facebook</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group col-md-4">
										<label className='mb-2'>Twitter</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group col-md-4">
										<label className='mb-2'>Linkedin</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group col-md-4">
										<label className='mb-2'>Google Plus</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group col-md-4">
										<label className='mb-2'>Instagram</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group col-md-4">
										<label className='mb-2'>Tumbler</label>
										<input type="text" className="form-control"/>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group col-lg-12 col-md-12">
							<label>GDPR Agreement *</label>
							<ul className="no-ul-list">
								<li className="form-check">
									<input id="aj-1" className="form-check-input" name="aj-1" type="checkbox"/>
									<label htmlFor="aj-1" className="form-check-label">I consent to having this website store my submitted information so they can respond to my inquiry.</label>
								</li>
							</ul>
						</div>
						<div className="form-group col-lg-12 col-md-12">
							<button className="btn btn-primary px-5 rounded" type="submit">Submit & Preview</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

    <FooterTop bg="theme-bg"/>

	<Footer/>

    <ScrollToTop/>
    
    </>
  )
}
