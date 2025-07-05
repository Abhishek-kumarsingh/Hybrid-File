'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  AlertTriangle,
  Activity,
  Settings,
  BarChart3,
  Users,
  ChevronRight,
  Shield,
  ChevronLeft,
  Server,
  Zap,
  MapPin,
  Bell,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: {
    text: string;
    variant: 'default' | 'danger' | 'info' | 'warning' | 'success';
  } | null;
  submenu?: Array<{
    name: string;
    path: string;
  }> | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggleCollapse
}) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const mainNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/',
      badge: null,
      submenu: null
    },
    {
      name: 'Threats',
      icon: <AlertTriangle size={20} />,
      path: '/threats',
      badge: { text: '3', variant: 'danger' as const },
      submenu: null
    },
    {
      name: 'Sensors',
      icon: <Server size={20} />,
      path: '/sensors',
      badge: { text: '42', variant: 'info' as const },
      submenu: null
    },
    {
      name: 'Heat Map',
      icon: <MapPin size={20} />,
      path: '/heatmap',
      badge: null,
      submenu: null
    },
    {
      name: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/analytics',
      badge: null,
      submenu: null
    },
    {
      name: 'Alerts',
      icon: <Bell size={20} />,
      path: '/alerts',
      badge: { text: '7', variant: 'warning' as const },
      submenu: null
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      name: 'Reports',
      icon: <FileText size={20} />,
      path: '/reports',
      badge: null
    },
    {
      name: 'Users',
      icon: <Users size={20} />,
      path: '/users',
      badge: null
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
      badge: null
    },
  ];

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const NavItem = ({ item }: { item: NavItem }) => {
    const active = isActive(item.path) ||
                  (item.submenu && item.submenu.some(subItem => isActive(subItem.path)));
    const hovered = hoveredItem === item.name;
    const expanded = expandedItem === item.name;
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    const handleClick = (e: React.MouseEvent) => {
      if (hasSubmenu) {
        e.preventDefault();
        setExpandedItem(expanded ? null : item.name);
      }
    };

    return (
      <div className="relative">
        <Link
          href={hasSubmenu ? '#' : item.path}
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-md transition-all relative group",
            active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
          onMouseEnter={() => setHoveredItem(item.name)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={handleClick}
        >
          <div className="flex items-center">
            <span className={cn("", collapsed ? "mr-0" : "mr-3")}>{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
          </div>

          {item.badge && !collapsed && (
            <Badge variant={item.badge.variant} size="sm">
              {item.badge.text}
            </Badge>
          )}

          {item.badge && collapsed && (
            <Badge
              variant={item.badge.variant}
              size="sm"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {item.badge.text}
            </Badge>
          )}

          {hasSubmenu && !collapsed && (
            <ChevronRight
              size={16}
              className={cn(
                "ml-2 transition-transform",
                expanded ? "transform rotate-90" : ""
              )}
            />
          )}

          {collapsed && hovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap z-50 shadow-md border border-border"
            >
              {item.name}

              {hasSubmenu && item.submenu && (
                <div className="mt-1 border-t border-border pt-1">
                  {item.submenu.map(subItem => (
                    <Link
                      key={subItem.name}
                      href={subItem.path}
                      className="block px-2 py-1 hover:bg-accent rounded-sm text-xs"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </Link>

        {/* Submenu */}
        {hasSubmenu && !collapsed && expanded && item.submenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pl-8 pr-2"
          >
            {item.submenu.map(subItem => (
              <Link
                key={subItem.name}
                href={subItem.path}
                className={cn(
                  "flex items-center px-3 py-1.5 text-xs rounded-md my-1 transition-colors",
                  isActive(subItem.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {subItem.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "h-screen border-r border-border bg-card flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield size={28} className="text-primary" />
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">ThreatZone</h1>
              <p className="text-xs text-muted-foreground">Prediction System</p>
            </div>
          )}
        </div>
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className={cn("px-3", collapsed ? "space-y-3" : "space-y-1")}>
          <div className={cn("mb-4", collapsed ? "px-0" : "px-3")}>
            {!collapsed && <h2 className="text-xs font-semibold text-muted-foreground mb-2">MONITORING</h2>}
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>

          <div className={cn(collapsed ? "px-0" : "px-3")}>
            {!collapsed && <h2 className="text-xs font-semibold text-muted-foreground mb-2">MANAGEMENT</h2>}
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className={cn(
          "rounded-md bg-accent/50 p-3",
          collapsed ? "text-center" : ""
        )}>
          <div className="flex items-center justify-center">
            <Zap size={20} className="text-green-500" />
            {!collapsed && <span className="ml-2 text-sm font-medium">System Status</span>}
          </div>
          {!collapsed && (
            <>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Uptime</span>
                <span className="text-xs font-medium">99.9%</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Sensors</span>
                <span className="text-xs font-medium">42/42 Online</span>
              </div>
              <div className="mt-2">
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
