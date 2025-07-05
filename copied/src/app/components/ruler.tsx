import React from "react";

const Ruler = () => {
    const marks = [0, 250, 500, 750]; // Define where the marks should be
    const totalWidth = 800; // Total width of the ruler
  
    return (
        <span className="irs-grid" style={{width: '95.6044%', left: '2.0978%'}}>
            <span className="irs-grid-pol" style={{left:'0'}}></span>
            <span className="irs-grid-text js-grid-text-0" style={{left: '0%', marginLeft: '-1.51099%'}}>0</span>
            <span className="irs-grid-pol small" style={{left: '20%'}}></span><span className="irs-grid-pol small" style={{left: '15%'}}></span>
            <span className="irs-grid-pol small" style={{left: '10%'}}></span><span className="irs-grid-pol small" style={{left: '5%'}}></span>
            <span className="irs-grid-pol" style={{left: '25%'}}></span>
            <span className="irs-grid-text js-grid-text-1" style={{left: '25%', visibility: 'visible', marginLeft: '-2.88462%'}}>250</span>
            <span className="irs-grid-pol small" style={{left: '45%'}}></span>
            <span className="irs-grid-pol small" style={{left: '40%'}}></span>
            <span className="irs-grid-pol small" style={{left: '35%'}}></span>
            <span className="irs-grid-pol small" style={{left: '30%'}}></span>
            <span className="irs-grid-pol" style={{left: '50%'}}></span>
            <span className="irs-grid-text js-grid-text-2" style={{left: '50%', visibility: 'visible', marginLeft: '-2.88462%'}}>500</span>
            <span className="irs-grid-pol small" style={{left: '70%'}}></span><span className="irs-grid-pol small" style={{left: '65%'}}></span>
            <span className="irs-grid-pol small" style={{left: '60%'}}></span>
            <span className="irs-grid-pol small" style={{left: '55%'}}></span>
            <span className="irs-grid-pol" style={{left: '75%'}}></span>
            <span className="irs-grid-text js-grid-text-3" style={{left: '75%', visibility: 'visible', marginLeft: '-2.88462%'}}>750</span>
            <span className="irs-grid-pol small" style={{left: '95%'}}></span>
            <span className="irs-grid-pol small" style={{left: '90%'}}></span>
            <span className="irs-grid-pol small" style={{left: '85%'}}></span>
            <span className="irs-grid-pol small" style={{left: '80%'}}></span>
            <span className="irs-grid-pol" style={{left: '100%'}}></span>
            <span className="irs-grid-text js-grid-text-4" style={{left: '100%', marginLeft: '-3.98352%'}}>1 000</span>
        </span>
    );
};

export default Ruler;