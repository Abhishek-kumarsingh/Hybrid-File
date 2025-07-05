'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { findAllParent, findMenuItem, getMenuItemFromURL } from '@/helpers/Manu';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Collapse, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

const MenuItemWithChildren = ({
  item,
  className,
  linkClassName,
  subMenuClassName,
  activeMenuItems,
  toggleMenu,
  collapsed,
  activeSection
}) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key) || activeSection === item.key);
  
  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key) || activeSection === item.key);
  }, [activeMenuItems, item, activeSection]);
  
  const toggleMenuItem = e => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };
  
  const getActiveClass = useCallback(item => {
    return activeMenuItems?.includes(item.key) || activeSection === item.key ? 'active' : '';
  }, [activeMenuItems, activeSection]);

  // For collapsed sidebar with tooltip
  if (collapsed) {
    return (
      <li className={`${className} menu-item-collapsed`}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-${item.key}`}>{item.label}</Tooltip>}
        >
          <div 
            onClick={toggleMenuItem} 
            aria-expanded={open} 
            role="button" 
            className={clsx(linkClassName, 'menu-item-collapsed-link')}
          >
            {item.icon && (
              <span className="nav-icon">
                <IconifyIcon icon={item.icon} />
              </span>
            )}
            {item.badge && (
              <Badge 
                bg={item.badge.variant} 
                className="position-absolute top-0 end-0 translate-middle-y"
              >
                {item.badge.text}
              </Badge>
            )}
          </div>
        </OverlayTrigger>
        
        {/* We don't show submenu when collapsed */}
      </li>
    );
  }

  // Normal expanded view
  return (
    <li className={className}>
      <div 
        onClick={toggleMenuItem} 
        aria-expanded={open} 
        role="button" 
        className={clsx(linkClassName, getActiveClass(item))}
      >
        {item.icon && (
          <span className="nav-icon">
            <IconifyIcon icon={item.icon} />
          </span>
        )}
        <span className="nav-text">{item.label}</span>
        
        <div className="ms-auto d-flex align-items-center">
          {item.badge && (
            <Badge bg={item.badge.variant} className="me-2">
              {item.badge.text}
            </Badge>
          )}
          <IconifyIcon 
            icon={open ? "solar:alt-arrow-up-bold" : "solar:alt-arrow-down-bold"} 
            className="menu-arrow" 
          />
        </div>
      </div>
      
      <Collapse in={open}>
        <div>
          <ul className={clsx(subMenuClassName)}>
            {(item.children || []).map((child, idx) => (
              <Fragment key={child.key + idx}>
                {child.children ? (
                  <MenuItemWithChildren 
                    item={child} 
                    linkClassName={clsx('nav-link', getActiveClass(child))} 
                    activeMenuItems={activeMenuItems} 
                    className="sub-nav-item" 
                    subMenuClassName="nav sub-navbar-nav" 
                    toggleMenu={toggleMenu}
                    collapsed={collapsed}
                    activeSection={activeSection}
                  />
                ) : (
                  <MenuItem 
                    item={child} 
                    className="sub-nav-item" 
                    linkClassName={clsx('sub-nav-link', getActiveClass(child))}
                    collapsed={collapsed}
                    activeSection={activeSection}
                  />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </Collapse>
    </li>
  );
};

const MenuItem = ({
  item,
  className,
  linkClassName,
  collapsed,
  activeSection
}) => {
  const isActive = activeSection === item.key;
  
  // For collapsed sidebar with tooltip
  if (collapsed) {
    return (
      <li className={`${className} menu-item-collapsed`}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-${item.key}`}>{item.label}</Tooltip>}
        >
          <div className="menu-item-collapsed-wrapper">
            <MenuItemLink 
              item={item} 
              className={`${linkClassName} menu-item-collapsed-link ${isActive ? 'active' : ''}`} 
            />
          </div>
        </OverlayTrigger>
      </li>
    );
  }
  
  return (
    <li className={className}>
      <MenuItemLink 
        item={item} 
        className={`${linkClassName} ${isActive ? 'active' : ''}`} 
      />
    </li>
  );
};

const MenuItemLink = ({
  item,
  className
}) => {
  return (
    <Link 
      href={item.url ?? ''} 
      target={item.target} 
      className={clsx(className, {
        disabled: item.isDisabled
      })}
    >
      {item.icon && (
        <span className="nav-icon">
          <IconifyIcon icon={item.icon} />
        </span>
      )}
      <span className="nav-text">{item.label}</span>
      
      {item.badge && (
        <Badge bg={item.badge.variant} className="ms-auto">
          {item.badge.text}
        </Badge>
      )}
    </Link>
  );
};

const AppMenu = ({
  menuItems,
  collapsed,
  activeSection,
  setActiveSection
}) => {
  const pathname = usePathname();
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  
  const toggleMenu = (menuItem, show) => {
    if (show) {
      setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)]);
      if (setActiveSection) {
        setActiveSection(menuItem.key);
      }
    }
  };
  
  const getActiveClass = useCallback(item => {
    return activeMenuItems?.includes(item.key) || activeSection === item.key ? 'active' : '';
  }, [activeMenuItems, activeSection]);
  
  const activeMenu = useCallback(() => {
    const trimmedURL = pathname?.replaceAll('', '');
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);
    
    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)]);
        if (setActiveSection) {
          setActiveSection(activeMt.key.split('-')[0]);
        }
      }
      
      // Smooth scroll to active menu item
      setTimeout(() => {
        const activatedItem = document.querySelector(`.sidebar-nav a[href="${trimmedURL}"]`);
        if (activatedItem) {
          const sidebarContent = document.querySelector('.sidebar-menu-container .simplebar-content-wrapper');
          if (sidebarContent) {
            const offset = activatedItem.offsetTop - window.innerHeight * 0.3;
            smoothScrollTo(sidebarContent, offset);
          }
        }
      }, 300);
    }
  }, [pathname, menuItems, setActiveSection]);
  
  // Smooth scroll function
  const smoothScrollTo = (element, to) => {
    element.scrollTo({
      top: to,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    if (menuItems && menuItems.length > 0) activeMenu();
  }, [activeMenu, menuItems]);
  
  return (
    <ul className={`menu-items ${collapsed ? 'menu-collapsed' : ''}`} id="sidebar-menu">
      {(menuItems || []).map((item, idx) => (
        <Fragment key={item.key + idx}>
          {item.isTitle ? (
            <li className={clsx('menu-title', { 'd-none': collapsed })}>
              <span>{item.label}</span>
            </li>
          ) : (
            <>
              {item.children ? (
                <MenuItemWithChildren 
                  item={item} 
                  toggleMenu={toggleMenu} 
                  className="menu-item" 
                  linkClassName={clsx('menu-link', getActiveClass(item))} 
                  subMenuClassName="submenu" 
                  activeMenuItems={activeMenuItems}
                  collapsed={collapsed}
                  activeSection={activeSection}
                />
              ) : (
                <MenuItem 
                  item={item} 
                  linkClassName={clsx('menu-link', getActiveClass(item))} 
                  className="menu-item"
                  collapsed={collapsed}
                  activeSection={activeSection}
                />
              )}
            </>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default AppMenu;