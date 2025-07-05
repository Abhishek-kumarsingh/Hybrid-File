'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../../node_modules/tiny-slider/dist/tiny-slider.css'

const settings = {
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    nav: true,
    speed: 400,
    gutter: 0,
};

export default function GridProperty({item,border}:{item:any, border:any}) {
  return (
        <div className={`property-listing card rounded-3 ${border ? 'border' : 'border-0'}`}>
          <div className={`listing-img-wrapper p-3 `}>
              <div className="list-img-slide position-relative">
                  <div className="position-absolute top-0 left-0 ms-3 mt-3 z-1">
                    {item.tag.map((el:any, index:number)=>{
                      return(
                        
                        <div key={index} className={`label text-light d-inline-flex align-items-center justify-content-center mx-1 ${el === 'Verified' ? 'bg-success' : ''} ${el === 'SuperAgent' ? 'bg-purple' : ''} ${el === 'New' ? 'bg-danger' : ''}`}>
                          {el === 'Verified' && <img src='/img/svg/verified.svg' alt="" className='me-1' />}

                          {el === 'SuperAgent' && <img src='/img/svg/user-1.svg' alt="" className='me-1'/>}

                          {el === 'New' && <img src='/img/svg/moon.svg' alt="" className='me-1'/>}
                            {el}
                        </div>
                      )
                    })}
                  </div>
                  <div className="click rounded-3 overflow-hidden mb-0">
                      <TinySlider settings={settings}>
                        {item.image.map((el:any, index:number) => {
                          return(
                            <div key={index}><Link href={`/single-property-1/${item.id}`}><Image src={el} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" /></Link></div>
                          )
                        })}
                      </TinySlider>
                  </div>
              </div>
          </div>
          
          <div className="listing-caption-wrapper px-3">
              <div className="listing-detail-wrapper">
                  <div className="listing-short-detail-wrap">
                      <div className="listing-short-detail">
                          <div className="d-flex align-items-center">
                            {item.tag2 === "For Rent" && <span className="label bg-light-success text-success prt-type me-2">For Rent</span>}
                            {item.tag2 === "For Sell" && <span className="label bg-light-danger text-danger prt-type me-2">For Sell</span>}
                              <span className="label bg-light-purple text-purple property-cats">{item.type}</span>
                          </div>
                          <h4 className="listing-name fw-semibold fs-5 mb-2 mt-3"><Link href={`/single-property-1/${item.id}`}>{item.name}</Link></h4>
                          <div className="prt-location text-muted-2 d-flex">
                               <img src='/img/svg/map-1.svg' alt="" />
                              {item.loction}
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="price-features-wrapper">
                  <div className="list-fx-features d-flex align-items-center justify-content-between">
                      <div className="listing-card d-flex align-items-center">
                          <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i className="fa-solid fa-building-shield fs-xs"></i></div><span className="text-muted-2 fs-sm">{item.size}</span>
                      </div>
                      <div className="listing-card d-flex align-items-center">
                          <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i className="fa-solid fa-bed fs-xs"></i></div><span className="text-muted-2 fs-sm">{item.beds}</span>
                      </div>
                      <div className="listing-card d-flex align-items-center">
                          <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i className="fa-solid fa-clone fs-xs"></i></div><span className="text-muted-2 fs-sm">{item.sqft}</span>
                      </div>
                  </div>
              </div>
              
              <div className="listing-detail-footer d-flex align-items-center justify-content-between py-4">
                  <div className="listing-short-detail-flex">
                      <h6 className="listing-card-info-price m-0">{item.value}</h6>
                  </div>
                  <div className="footer-flex">
                      <Link href={`/single-property-1/${item.id}`} className="prt-view">
                          <img src='/img/svg/send.svg' alt="" />
                      </Link>
                  </div>
              </div>
          
          </div>
          
        </div>
  )
}
