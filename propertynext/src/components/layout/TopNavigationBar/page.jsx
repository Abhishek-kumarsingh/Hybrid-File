'use client';

import { useState, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ProfileDropdown from './components/ProfileDropdown';
import ThemeCustomizerToggle from './components/ThemeCustomizerToggle';
import Notifications from './components/Notifications';
import ThemeModeToggle from './components/ThemeModeToggle';
import MaximizeScreen from './components/MaximizeScreen';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useLayoutContext } from '@/context/useLayoutContext';

const TopNavigationBar = ({ toggleSidebar }) => {
  const { theme } = useLayoutContext();
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'topbar-scrolled' : ''} ${theme === 'dark' ? 'topbar-dark' : ''}`}>
      <Container fluid className="px-4">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            {/* Sidebar Toggle Button */}
            <Button 
              variant="link" 
              className="sidebar-toggle-btn p-0 me-3" 
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <IconifyIcon icon="solar:hamburger-menu-bold" className="fs-24" />
            </Button>

            {/* Logo for mobile */}
            <div className="topbar-logo d-lg-none">
              <IconifyIcon icon="solar:home-2-bold" className="fs-24 me-2" />
              <span className="logo-text">PropertyNext</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="search-bar-container ms-4 d-none d-md-block">
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0">
                  <IconifyIcon icon="solar:magnifer-bold" />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Search dashboard..."
                  className="border-start-0 ps-0"
                  aria-label="Search"
                />
              </InputGroup>
            </div>

            {/* Search Toggle - Mobile */}
            <Button 
              variant="link" 
              className="search-toggle-btn p-0 ms-auto d-md-none"
              onClick={() => setSearchExpanded(!searchExpanded)}
              aria-label="Toggle Search"
            >
              <IconifyIcon icon="solar:magnifer-bold" className="fs-22" />
            </Button>
          </div>

          {/* Right Side Actions */}
          <div className="topbar-actions d-flex align-items-center gap-2">
            <ThemeModeToggle />
            <MaximizeScreen />
            <Notifications />
            <ThemeCustomizerToggle />
            <ProfileDropdown />
          </div>
        </div>

        {/* Mobile Search - Expandable */}
        {searchExpanded && (
          <div className="mobile-search-bar d-md-none py-2">
            <InputGroup>
              <InputGroup.Text className="bg-transparent border-end-0">
                <IconifyIcon icon="solar:magnifer-bold" />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search dashboard..."
                className="border-start-0 ps-0"
                aria-label="Search"
                autoFocus
              />
              <Button 
                variant="link" 
                className="border-start-0"
                onClick={() => setSearchExpanded(false)}
              >
                <IconifyIcon icon="solar:close-circle-bold" />
              </Button>
            </InputGroup>
          </div>
        )}
      </Container>
    </header>
  );
};

export default TopNavigationBar;