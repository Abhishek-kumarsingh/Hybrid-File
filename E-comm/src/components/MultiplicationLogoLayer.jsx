import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import MultiplicationLogo from '../helper/MultiplicationLogo';
import SectionMultiplicationLogo from '../helper/SectionMultiplicationLogo';
import MultiplicationLogoDisplay from './child/MultiplicationLogoDisplay';

const MultiplicationLogoLayer = () => {
  const [customExpression, setCustomExpression] = useState('223*345');
  const [customWidth, setCustomWidth] = useState(120);
  const [customHeight, setCustomHeight] = useState(40);

  const sections = [
    'dashboard', 'email', 'chat', 'calendar', 
    'kanban', 'invoice', 'ai', 'analytics', 
    'ecommerce'
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Multiplication Logos</h4>
            <div className="page-title-right">
              <Breadcrumb title="Multiplication Logos" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Main Application Logo</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
                <MultiplicationLogo 
                  expression="223*345" 
                  width={200} 
                  height={80} 
                />
              </div>
              <p className="text-center text-muted">
                The main application logo displays the multiplication expression "223*345"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Section Logos</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {sections.map((section) => (
                  <div key={section} className="col-md-4 mb-4 text-center">
                    <SectionMultiplicationLogo section={section} size="medium" />
                    <p className="mt-2 mb-0 text-capitalize">{section}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Random Logos</h4>
            </div>
            <div className="card-body">
              <MultiplicationLogoDisplay 
                count={6} 
                columns={3} 
                size="medium" 
                randomize={true} 
              />
              <div className="text-center mt-3">
                <p className="text-muted">
                  Random multiplication expressions are generated each time the page loads
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Custom Logo Generator</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="expressionInput" className="form-label">Multiplication Expression</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="expressionInput" 
                      value={customExpression}
                      onChange={(e) => setCustomExpression(e.target.value)}
                      placeholder="e.g. 223*345"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="widthInput" className="form-label">Width</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="widthInput" 
                          value={customWidth}
                          onChange={(e) => setCustomWidth(Number(e.target.value))}
                          min="60"
                          max="300"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="heightInput" className="form-label">Height</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="heightInput" 
                          value={customHeight}
                          onChange={(e) => setCustomHeight(Number(e.target.value))}
                          min="20"
                          max="150"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <MultiplicationLogo 
                      expression={customExpression} 
                      width={customWidth} 
                      height={customHeight} 
                    />
                    <p className="mt-3 text-muted">
                      Preview of your custom multiplication logo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Predefined Expressions</h4>
            </div>
            <div className="card-body">
              <MultiplicationLogoDisplay 
                count={12} 
                columns={4} 
                size="small" 
                randomize={false} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplicationLogoLayer;