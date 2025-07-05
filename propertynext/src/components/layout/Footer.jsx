'use client';

import React from 'react';
import IconifyIcon from '../wrappers/IconifyIcon';
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { currentYear } from '@/context/constants';
import { useLayoutContext } from '@/context/useLayoutContext';

const Footer = () => {
  const { theme } = useLayoutContext();
  
  return (
    <footer className={`footer ${theme === 'dark' ? 'footer-dark' : ''}`}>
      <Container fluid className="px-4">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <div className="footer-copyright">
              <span className="text-muted">
                © {currentYear} PropertyNext. All rights reserved.
              </span>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="footer-links d-flex justify-content-center justify-content-md-end gap-3">
              <Link href="/pages/privacy-policy" className="text-muted footer-link">
                Privacy Policy
              </Link>
              <Link href="/pages/terms" className="text-muted footer-link">
                Terms of Use
              </Link>
              <Link href="/pages/support" className="text-muted footer-link">
                Support
              </Link>
              <div className="d-flex align-items-center ms-2">
                <IconifyIcon icon="solar:hearts-bold-duotone" className="fs-18 align-middle text-danger me-1" />
                <span className="text-muted small">v1.0.0</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;