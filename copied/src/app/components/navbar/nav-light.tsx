"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { FiChevronDown } from "react-icons/fi";
import { TiSocialGooglePlus, TiSocialFacebook } from "react-icons/ti";

import { navProperty } from '../../data/data';

export default function NavLight() {
    const [activeMenu, setActiveMenu] = useState<{[key: string]: { [key: string]: boolean };}>({});
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [property, setProperty] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(1)

    let[scroll,setScroll] = useState<boolean>(false)

    const location = usePathname();
    const current = location

    const handleMouseEnter = (menu: string, submenu?: string) => {
        setActiveMenu((prev) => ({
          ...prev,
          [menu]: {
            ...prev[menu],
            [submenu || 'main']: true, // Open main menu or submenu
          },
        }));
      };

      // Handle mouse leave for any menu or submenu
      const handleMouseLeave = (menu: string, submenu?: string) => {
        setActiveMenu((prev) => ({
          ...prev,
          [menu]: {
            ...prev[menu],
            [submenu || 'main']: false, // Close main menu or submenu
          },
        }));
      };

      useEffect(()=>{
        if (typeof window === "undefined") return;
        window.scrollTo(0,0)

        const handlerScroll=()=>{
            if(window.scrollY > 50){
                setScroll(true)
            }else{setScroll(false)}
        }

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };

        window.addEventListener('scroll',handlerScroll)
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll',handlerScroll)
            window.removeEventListener('resize', handleResize);
          };
    },[])

  return (
    <>
        <div className={`header header-transparent ${scroll ? 'header-fixed' : ''}`}>
            <div className="container">
                <nav id="navigation" className={windowWidth > 991 ? "navigation navigation-landscape" : "navigation navigation-portrait"}>
                    <div className="nav-header" style={{lineHeight:'0'}}>
                        <Link className="nav-brand text-logo exchange" href="#">
                            {scroll ? (<img src='/img/logo-new.svg' alt="HomeVista Logo" />) :
                            (
                                <>
                                    <img src='/img/logo-light-new.svg' alt="HomeVista Logo" className='d-none d-lg-block' />
                                    <img src='/img/logo-new.svg' alt="HomeVista Logo" className='d-block d-lg-none' />
                                </>
                            )}

                            <h5 className="fs-3 fw-bold ms-1 my-0">HomeVista</h5>
                        </Link>
                        <div className="nav-toggle" onClick={()=>setIsToggle(!toggle)}></div>
                        <div className="mobile_nav">
                            <ul>
                                <li>
                                    <Link href="#" onClick={()=>setLogin(!login)}>
                                        <img src='/img/svg/users.svg' alt="" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="submit-property" className="text-primary">
                                        <img src='/img/svg/add.svg' alt="" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-primary"  onClick={()=>setProperty(!property)}>
                                        <img src='/img/svg/bar.svg' alt="" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`nav-menus-wrapper  ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{transitionProperty:toggle ? 'none' : 'left'}}>
                        <span className="nav-menus-wrapper-close-button" onClick={()=>setIsToggle(!toggle)}>✕</span>
                        <ul className="nav-menu">

                            <li className={`${['/','/video','/map'].includes(current) ? 'active' : ''}`}><Link href="/">Home</Link></li>

                            <li className={` ${['/list-layout-one','/list-layout-two','/list-layout-three','/list-layout-with-map','/list-layout-full','/list-layout-one','/list-layout-two','/list-layout-three','/list-layout-with-map','/list-layout-full','/grid-layout-with-sidebar','/classical-layout-with-sidebar','/grid-layout-with-map','/grid','/classical-property','/list-layout-with-map','/grid-layout-with-map','/classical-layout-with-map','/half-map','/half-map-2'].includes(current) ? 'active' : ''} ${activeMenu['listing']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('listing')} onMouseLeave={() => handleMouseLeave('listing')}><Link href="#">Listings<FiChevronDown className="submenu-indicator"/></Link>
                                <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.main ? 'block' : 'none', pointerEvents: activeMenu['listing']?.main ? 'auto' : 'none',}}>
                                    <li className={`${['/list-layout-one','/list-layout-two','/list-layout-three','/list-layout-with-map','/list-layout-full'].includes(current) ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('listing', 'list-layout')} onMouseLeave={() => handleMouseLeave('listing', 'list-layout')}><Link href="#">List Layout<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['list-layout'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['list-layout'] ? 'auto' : 'none',}}>
                                            <li><Link href="/list-layout-one" className={current === '/list-layout-one' ? 'active' : ''}>List Layout Simple</Link></li>
                                            <li><Link href="/list-layout-two" className={current === '/list-layout-two' ? 'active' : ''}>List Layout Modern</Link></li>
                                            <li><Link href="/list-layout-three" className={current === '/list-layout-three' ? 'active' : ''}>List Layout Advance</Link></li>
                                            <li><Link href="/list-layout-with-map" className={current === '/list-layout-with-map' ? 'active' : ''}>With Map</Link></li>
                                            <li><Link href="/list-layout-full" className={current === '/list-layout-full' ? 'active' : ''}>Full Width</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`${['/grid-layout-with-sidebar','/classical-layout-with-sidebar','/grid-layout-with-map','/grid','/classical-property'].includes(current) ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('listing', 'grid-layout')} onMouseLeave={() => handleMouseLeave('listing', 'grid-layout')}><Link href="#">Grid Layout<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['grid-layout'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['grid-layout'] ? 'auto' : 'none',}}>
                                            <li><Link href="/grid-layout-with-sidebar" className={current === '/grid-layout-with-sidebar' ? 'active' : ''}>With Sidebar</Link></li>
                                            <li><Link href="/classical-layout-with-sidebar" className={current === '/classical-layout-with-sidebar' ? 'active' : ''}>Classical With Sidebar</Link></li>
                                            <li><Link href="/grid-layout-with-map" className={current === '/grid-layout-with-map' ? 'active' : ''}>With Map</Link></li>
                                            <li><Link href="/grid" className={current === '/grid' ? 'active' : ''}>Full Width</Link></li>
                                            <li><Link href="/classical-property" className={current === '/classical-property' ? 'active' : ''}>Classical Full Width</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`${['/list-layout-with-map','/grid-layout-with-map','/classical-layout-with-map','/half-map','/half-map-2'].includes(current) ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('listing', 'map-layout')} onMouseLeave={() => handleMouseLeave('listing', 'map-layout')}><Link href="#">With Map Property<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['map-layout'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['map-layout'] ? 'auto' : 'none',}}>
                                            <li><Link href="/list-layout-with-map" className={current === '/list-layout-with-map' ? 'active' : ''}>List With Map</Link></li>
                                            <li><Link href="/grid-layout-with-map" className={current === '/grid-layout-with-map' ? 'active' : ''}>Grid With Map</Link></li>
                                            <li><Link href="/classical-layout-with-map" className={current === '/classical-layout-with-map' ? 'active' : ''}>Classical With Map</Link></li>
                                            <li><Link href="/place-search" className={current === '/place-search' ? 'active' : ''}>Place Search</Link></li>
                                            <li><Link href="/half-map" className={current === '/half-map' ? 'active' : ''}>Half Map Search</Link></li>
                                            <li><Link href="/half-map-2" className={current === '/half-map-2' ? 'active' : ''}>Half Map Search 02</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${['/single-property-1','/single-property-2','/single-property-3','/single-property-4','/agents','/agent-page','/add-agent','/agencies','/agency-page','/dashboard','/create-account','/my-profile','/checkout','/my-property','/bookmark-list','change-password','/compare-property','/submit-property'].includes(current)?'active':''} ${activeMenu['feature']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('feature')} onMouseLeave={() => handleMouseLeave('feature')}><Link href="#">Features<FiChevronDown className="submenu-indicator"/></Link>
                                <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['feature']?.main ? 'block' : 'none', pointerEvents: activeMenu['feature']?.main ? 'auto' : 'none',}}>
                                    <li className={['/single-property-1','/single-property-2','/single-property-3','/single-property-4'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'single-property')} onMouseLeave={() => handleMouseLeave('listing', 'single-property')}><Link href="#">Single Property<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['single-property'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['single-property'] ? 'auto' : 'none',}}>
                                            <li><Link href="/single-property-1" className={current === '/single-property-1' ? 'active' : ''}>Single Property 1</Link></li>
                                            <li><Link href="/single-property-2" className={current === '/single-property-2' ? 'active' : ''}>Single Property 2</Link></li>
                                            <li><Link href="/single-property-3" className={current === '/single-property-3' ? 'active' : ''}>Single Property 3</Link></li>
                                            <li><Link href="/single-property-4" className={current === '/single-property-4' ? 'active' : ''}>Single Property 4</Link></li>
                                        </ul>
                                    </li>
                                    <li className={['/agents','/agent-page','/add-agent'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'agent-list')} onMouseLeave={() => handleMouseLeave('listing', 'agent-list')}><Link href="#">Agents<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['agent-list'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['agent-list'] ? 'auto' : 'none',}}>
                                            <li><Link href="/agents" className={current === '/agents' ? 'active' : ''}>Agents List</Link></li>
                                            <li><Link href="/agent-page" className={current === '/agent-page' ? 'active' : ''}>Agent Page</Link></li>
                                            <li><Link href="/add-agent" className={current === '/add-agent' ? 'active' : ''}>Add Agent</Link></li>
                                            <li><Link href="/edit-agent" className={current === '/edit-agent' ? 'active' : ''}>Edit Agent</Link></li>
                                        </ul>
                                    </li>
                                    <li className={['/agencies','/agency-page'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'agency-list')} onMouseLeave={() => handleMouseLeave('listing', 'agency-list')}><Link href="#">Agencies<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['agency-list'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['agency-list'] ? 'auto' : 'none',}}>
                                            <li><Link href="/agencies" className={current === '/agencies' ? 'active' : ''}>Agencies List</Link></li>
                                            <li><Link href="/agency-page" className={current === '/agency-page' ? 'active' : ''}>Agency Page</Link></li>
                                        </ul>
                                    </li>
                                    <li className={['/dashboard','/create-account','/my-profile','/checkout','/my-property','/bookmark-list','/change-password'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'account')} onMouseLeave={() => handleMouseLeave('listing', 'account')}><Link href="#">My Account<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['account'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['account'] ? 'auto' : 'none',}}>
                                            <li><Link href="/dashboard" className={current === '/dashboard' ? 'active' : ''}>User Dashboard</Link></li>
                                            <li><Link href="/create-account" className={current === '/create-account' ? 'active' : ''}>Create Account</Link></li>
                                            <li><Link href="/payment">Payment Confirmation</Link></li>
                                            <li><Link href="/checkout" className={current === '/checkout' ? 'active' : ''}>Checkout</Link></li>
                                            <li><Link href="/my-profile" className={current === '/my-profile' ? 'active' : ''}>My Profile</Link></li>
                                            <li><Link href="/my-property" className={current === '/my-property' ? 'active' : ''}>Property List</Link></li>
                                            <li><Link href="/bookmark-list" className={current === '/bookmark-list' ? 'active' : ''}>Bookmarked Listings</Link></li>
                                            <li><Link href="/change-password" className={current === '/change-password' ? 'active' : ''}>Change Password</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link href="/compare-property" className={current === '/compare-property' ? 'active' : ''}>Compare Property</Link>
                                    </li>
                                    <li>
                                        <Link href="/submit-property" className={current === '/submit-property' ? 'active' : ''}>Submit Property</Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${['/about-us','/blog','/blog-detail','/component','/pricing','/404','/contact'].includes(current)?'active':''} ${activeMenu['pages']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('pages')} onMouseLeave={() => handleMouseLeave('pages')}><Link href="#">Pages<FiChevronDown className="submenu-indicator"/></Link>
                                <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['pages']?.main ? 'block' : 'none', pointerEvents: activeMenu['pages']?.main ? 'auto' : 'none',}}>
                                    <li><Link href="/about-us" className={current === '/about-us' ? 'active' : ''}>About Us</Link></li>
                                    <li><Link href="/blog" className={current === '/blog' ? 'active' : ''}>Blogs Page</Link></li>
                                    <li><Link href="/blog-detail" className={current === '/blog-detail' ? 'active' : ''}>Blog Detail</Link></li>
                                    <li><Link href="/component" className={current === '/component' ? 'active' : ''}>Shortcodes</Link></li>
                                    <li><Link href="/pricing" className={current === '/pricing' ? 'active' : ''}>Pricing</Link></li>
                                    <li><Link href="/faq" className={current === '/faq' ? 'active' : ''}>Faq</Link></li>
                                    <li><Link href="/404" className={current === '/404' ? 'active' : ''}>Error Page</Link></li>
                                    <li><Link href="/contact" className={current === '/contact' ? 'active' : ''}>Contacts</Link></li>
                                </ul>
                            </li>

                        </ul>

                        <ul className="nav-menu nav-menu-social align-to-right d-none d-lg-inline-flex">

                            <li>
                                <Link href="#" data-bs-toggle="modal" data-bs-target="#login" className="fw-medium text-invers" onClick={()=>setLogin(!login)}>
                                    <span className="svg-icon svg-icon-2hx me-1">
                                        <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor"/>
                                            <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor"/>
                                            <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    SignUp or SignIn
                                </Link>
                            </li>
                            <li className="add-listing light">
                                <Link href="/submit-property" className="bg-primary">
                                    {scroll ? (<img src='/img/svg/login.svg' alt="" className='me-1'/>) : (<img src='/img/svg/login-dark.svg' alt="" className='me-1'/>) }
                                    Post Property
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-invers" onClick={()=>setProperty(!property)}>
                                    <span className="svg-icon svg-icon-2hx">
                                        <svg width="24" height="24" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect y="6" width="16" height="3" rx="1.5" fill="currentColor"/>
                                            <rect opacity="0.3" y="12" width="8" height="3" rx="1.5" fill="currentColor"/>
                                            <rect opacity="0.3" width="12" height="3" rx="1.5" fill="currentColor"/>
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-overlay-panel" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: toggle ?  'block' : 'none'}}></div>
                </nav>
            </div>
        </div>
        <div className="clearfix"></div>

        {login &&
            <div className="modal fade show" style={{display: 'block', backgroundColor:"#0000008a"}}>
                <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
                    <div className="modal-content" id="registermodal">
                        <span className="mod-close"  onClick={()=>setLogin(!login)}>
                            <span className="svg-icon text-primary svg-icon-2hx">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"></rect>
                                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"></rect>
                                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"></rect>
                                </svg>
                            </span>
                        </span>
                        <div className="modal-body">
                            <h4 className="modal-header-title">Log In</h4>
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <img src='/img/logo-new.svg' width={80} height={80} alt="HomeVista Logo" className="mb-2" />
                            </div>
                            <div className="login-form">
                                <form>

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" placeholder="name@example.com"/>
                                        <label>Email address</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" placeholder="Password"/>
                                        <label>Password</label>
                                    </div>

                                    <div className="form-group mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="flex-shrink-0 flex-first">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="save-pass" value="option1"/>
                                                    <label className="form-check-label" htmlFor="save-pass">Save Password</label>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 flex-first">
                                                <Link href="#" className="link fw-medium">Forgot Password?</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="button" className="btn btn-lg btn-primary fw-medium full-width rounded-2">LogIn</button>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-divider"><span>Or login via</span></div>
                            <div className="social-login mb-3">
                                <ul>
                                    <li><Link href="#" className="btn connect-fb"><TiSocialFacebook className="ti-facebook" style={{width:'25px' , height:'25px'}}/>Facebook</Link></li>
                                    <li><Link href="#" className="btn connect-google"><TiSocialGooglePlus  className="ti-google" style={{width:'25px' , height:'25px'}}/>Google+</Link></li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <p className="mt-4">Have't Any Account? <Link href="/create-account" className="link fw-medium">Acreate An Account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        <div className={`offcanvas offcanvas-end  ${property ? 'show' : ''}`}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Compare & Selected Property</h5>
                <Link href="#" onClick={()=>setProperty(!property)}>
                    <span className="svg-icon text-primary svg-icon-2hx">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
                        </svg>
                    </span>
                </Link>
            </div>
            <div className="offcanvas-body">
                <ul className="nav nav-pills sider_tab mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 1 ? 'active' : ''}`} onClick={()=>setActiveTab(1)}>Compare Property</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 2 ? 'active' : ''}`} onClick={()=>setActiveTab(2)}>Saved Property</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`}>
                        <div className="sidebar_featured_property">

                            {navProperty.slice(0,4).map((item,index)=>{
                                return(
                                    <div className="sides_list_property p-2" key={index}>
                                        <div className="sides_list_property_thumb">
                                            <img src={item.image} className="img-fluid" alt=""/>
                                        </div>
                                        <div className="sides_list_property_detail">
                                            <h4><Link href="/single-property-1">{item.title}</Link></h4>
                                            <span className="text-muted-2"><i className="fa-solid fa-location-dot"></i>{item.loction}</span>
                                            <div className="lists_property_price">
                                                <div className="lists_property_types">
                                                    {item.tag === 'For Sale' && <div className="property_types_vlix sale">For Sale</div>}
                                                    {item.tag === 'For Rent' && <div className="property_types_vlix">For Rent</div>}
                                                    {item.tag === 'For Buy' && <div className="property_types_vlix buy">For Buy</div>}

                                                </div>
                                                <div className="lists_property_price_value">
                                                    <h4 className="text-primary">{item.value}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="input-group">
                                <Link href="/compare-property" className="btn btn-light-primary fw-medium full-width">View & Compare</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`}>
                        <div className="sidebar_featured_property">
                            {navProperty.slice(4,8).map((item,index)=>{
                                return(
                                    <div className="sides_list_property p-2" key={index}>
                                        <div className="sides_list_property_thumb">
                                            <img src={item.image} className="img-fluid" alt=""/>
                                        </div>
                                        <div className="sides_list_property_detail">
                                            <h4><Link href="/single-property-1">{item.title}</Link></h4>
                                            <span className="text-muted-2"><i className="fa-solid fa-location-dot"></i>{item.loction}</span>
                                            <div className="lists_property_price">
                                                <div className="lists_property_types">
                                                    {item.tag === 'For Sale' && <div className="property_types_vlix sale">For Sale</div>}
                                                    {item.tag === 'For Rent' && <div className="property_types_vlix">For Rent</div>}
                                                    {item.tag === 'For Buy' && <div className="property_types_vlix buy">For Buy</div>}

                                                </div>
                                                <div className="lists_property_price_value">
                                                    <h4 className="text-primary">{item.value}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="input-group">
                                <Link href="#" className="btn btn-light-primary fw-medium full-width">View & Compare</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
