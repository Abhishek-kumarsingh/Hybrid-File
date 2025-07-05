'use client';

import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import logoSm from '@/assets/images/logo-sm.png';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutContext } from '@/context/useLayoutContext';
import IconifyIcon from './wrappers/IconifyIcon';

const LogoBox = ({ collapsed = false }) => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  return (
    <div className={`logo-box ${collapsed ? 'logo-collapsed' : ''}`}>
      {collapsed ? (
        <Link href="/dashboards/property" className="logo-icon-only">
          <div className="logo-icon">
            <IconifyIcon icon="solar:home-2-bold" className="fs-24" />
          </div>
        </Link>
      ) : (
        <>
          {isDark ? (
            <Link href="/dashboards/property" className="logo-full">
              <div className="logo-icon me-2">
                <IconifyIcon icon="solar:home-2-bold" className="fs-24" />
              </div>
              <div className="logo-text">PropertyNext</div>
            </Link>
          ) : (
            <Link href="/dashboards/property" className="logo-full">
              <div className="logo-icon me-2">
                <IconifyIcon icon="solar:home-2-bold" className="fs-24" />
              </div>
              <div className="logo-text">PropertyNext</div>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default LogoBox;