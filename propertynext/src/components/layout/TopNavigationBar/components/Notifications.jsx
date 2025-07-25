'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getNotifications } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner } from 'react-bootstrap';
const NotificationItem = ({
  from,
  content,
  icon
}) => {
  return <DropdownItem className="py-3 border-bottom text-wrap">
      <div className="d-flex">
        <div className="flex-shrink-0">
          {icon ? <Image src={icon} className="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-1" /> : <div className="avatar-sm me-2">
              <span className="avatar-title bg-soft-info text-info fs-20 rounded-circle">{from.charAt(0).toUpperCase()}</span>
            </div>}
        </div>
        <div className="flex-grow-1">
          <p className="mb-0 fw-semibold">{from}</p>
          <p className="mb-0 text-wrap">{content}</p>
        </div>
      </div>
    </DropdownItem>;
};
const Notifications = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await getNotifications();
        setNotificationList(notifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setNotificationList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Dropdown className="topbar-item">
      <DropdownToggle
        as={'a'}
        type="button"
        className="topbar-button position-relative content-none"
        id="page-header-notifications-dropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <IconifyIcon icon="ri:notification-3-line" className="fs-24 align-middle" />
        <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
          {notificationList.length}<span className="visually-hidden">unread messages</span>
        </span>
      </DropdownToggle>

      <DropdownMenu
        className="py-0 dropdown-lg dropdown-menu-end"
        aria-labelledby="page-header-notifications-dropdown"
      >
        <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
          <Row className="align-items-center">
            <Col>
              <h6 className="m-0 fs-16 fw-semibold">Notifications</h6>
            </Col>
            <Col xs={'auto'}>
              <Link href="" className="text-dark text-decoration-underline">
                <small>Clear All</small>
              </Link>
            </Col>
          </Row>
        </div>

        <SimplebarReactClient style={{ maxHeight: 280 }}>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" />
              <p className="mt-2 mb-0 text-muted">Loading notifications...</p>
            </div>
          ) : notificationList.length > 0 ? (
            notificationList.map((notification, idx) => (
              <NotificationItem key={idx} {...notification} />
            ))
          ) : (
            <div className="text-center py-4">
              <IconifyIcon icon="solar:bell-off-bold" className="fs-2 text-muted mb-2" />
              <p className="mb-0 text-muted">No notifications</p>
            </div>
          )}
        </SimplebarReactClient>

        <div className="text-center py-3">
          <Link href="" className="btn btn-primary btn-sm">
            View All Notification <IconifyIcon icon="bx:right-arrow-alt" className="ms-1" />
          </Link>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};
export default Notifications;