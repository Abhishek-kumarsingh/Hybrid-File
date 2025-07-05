
import Link from "next/link";

import Navbar from "./components/navbar/navbar";
import FormOne from "./components/form/form-one";
import HowItsWork from "./components/how-its-work";
import GridPropertyOne from "./components/property/grid-property-one";
import BestLoctionOne from "./components/best-loction-one";
import ClientOne from "./components/client-one";
import PricingOne from "./components/pricing-one";
import Footer from "./components/footer";
import FooterTop from "./components/footer-top";
import ScrollToTop from "./components/scroll-to-top";

export default function Home() {
  return (
    <>
      <Navbar transparent={false}/>

      <div className="image-cover hero-banner" style={{backgroundImage:`url('/img/bg-1.jpg')`, backgroundRepeat:'no-repeat'}}>
        <div className="container">
            <div className="hero-search-wrap">
                <div className="hero-search">
                    <h1>Find accessible homes to rent</h1>
                </div>
                <div className="hero-search-content side-form">
                    
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                                <div className="input-with-icon">
                                    <input type="text" className="form-control" placeholder="Search for a location"/>
                                    <img src='/img/pin.svg' width="18" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormOne/>
                </div>
                <div className="hero-search-action">
                    <Link href="#" className="btn full-width btn-primary">Search Result</Link>
                </div>
            </div>
        </div>
      </div>

      <section>
        <HowItsWork/>
      </section>

      <section className="bg-light">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                    <div className="sec-heading center">
                        <h2>Explore Recent properties</h2>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                    </div>
                </div>
            </div>
            
            <GridPropertyOne border={false}/>
            
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                    <Link href="/listings-list-with-sidebar" className="btn btn-primary px-md-5 rounded ">Browse More Properties</Link>
                </div>
            </div>
        </div>	
      </section>

      <section>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                    <div className="sec-heading center">
                        <h2>Find Best Locations</h2>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                    </div>
                </div>
            </div>
            <BestLoctionOne/>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                    <Link href="/listings-list-with-sidebar" className="btn btn-primary px-md-5 rounded">Browse More Locations</Link>
                </div>
            </div>
        </div>
      </section>

      <section className="gray">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                    <div className="sec-heading center">
                        <h2>Good Reviews by Customers</h2>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                    </div>
                </div>
            </div>
            <ClientOne/>
        </div>
      </section>

      <section>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                    <div className="sec-heading center">
                        <h2>See our packages</h2>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                    </div>
                </div>
            </div>
            <PricingOne/>
        </div>	
      </section>

      <FooterTop bg="theme-bg"/>
      <Footer/>
      <ScrollToTop/>
    </>
  );
}
