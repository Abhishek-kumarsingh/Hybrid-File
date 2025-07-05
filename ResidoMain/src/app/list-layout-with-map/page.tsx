import React from 'react'
import Navbar from '../components/navbar/navbar'
import HomeMap from '../components/map/home-map'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ListMap from '../components/property/list-map'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>
        <HomeMap/>
        <section className="bg-light">
			<div className="container">
				<ListMap/>
			</div>	
		</section>
		<FooterTop bg="theme-bg"/>
		<Footer/>

		<ScrollToTop/>
    </>
  )
}
