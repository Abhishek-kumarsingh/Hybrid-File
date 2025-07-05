import { MenuItemType } from '@/types/menu'

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'main',
    label: 'MAIN',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'solar:widget-bold',
    url: '/dashboards/property',
  },
  {
    key: 'property-management',
    label: 'PROPERTY MANAGEMENT',
    isTitle: true,
  },
  {
    key: 'property',
    label: 'Properties',
    icon: 'solar:home-2-bold',
    children: [
      {
        key: 'all-properties',
        label: 'All Properties',
        url: '/property',
        parentKey: 'property',
      },
      {
        key: 'pending-approval',
        label: 'Pending Approval',
        url: '/property/approvals',
        parentKey: 'property',
        badge: {
          text: 'New',
          variant: 'warning',
        },
      },
      {
        key: 'add-property',
        label: 'Add Property',
        url: '/property/add',
        parentKey: 'property',
      },
      {
        key: 'property-analytics',
        label: 'Property Analytics',
        url: '/dashboards/property',
        parentKey: 'property',
      },
    ],
  },
  {
    key: 'user-management',
    label: 'USER MANAGEMENT',
    isTitle: true,
  },
  {
    key: 'users',
    label: 'Users',
    icon: 'solar:users-group-two-rounded-bold',
    children: [
      {
        key: 'all-users',
        label: 'All Users',
        url: '/users',
        parentKey: 'users',
      },
      {
        key: 'agents',
        label: 'Agents',
        url: '/users/agents',
        parentKey: 'users',
      },
      {
        key: 'customers',
        label: 'Customers',
        url: '/users/customers',
        parentKey: 'users',
      },
      {
        key: 'add-user',
        label: 'Add User',
        url: '/users/add',
        parentKey: 'users',
      },
    ],
  },
  {
    key: 'business',
    label: 'BUSINESS',
    isTitle: true,
  },
  {
    key: 'transactions',
    label: 'Transactions',
    icon: 'solar:card-transfer-bold',
    url: '/transactions',
  },
  {
    key: 'reviews',
    label: 'Reviews & Ratings',
    icon: 'solar:star-bold',
    url: '/reviews',
  },
  {
    key: 'inquiries',
    label: 'Inquiries',
    icon: 'solar:question-circle-bold',
    url: '/inquiries',
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: 'solar:chart-2-bold',
    children: [
      {
        key: 'property-reports',
        label: 'Property Reports',
        url: '/reports/properties',
        parentKey: 'reports',
      },
      {
        key: 'user-reports',
        label: 'User Reports',
        url: '/reports/users',
        parentKey: 'reports',
      },
      {
        key: 'financial-reports',
        label: 'Financial Reports',
        url: '/reports/financial',
        parentKey: 'reports',
      },
    ],
  },
  {
    key: 'communication',
    label: 'COMMUNICATION',
    isTitle: true,
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: 'solar:chat-round-dots-bold',
    url: '/messages',
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: 'solar:bell-bold',
    url: '/notifications',
  },
  {
    key: 'system',
    label: 'SYSTEM',
    isTitle: true,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'solar:settings-bold',
    children: [
      {
        key: 'general-settings',
        label: 'General Settings',
        url: '/settings/general',
        parentKey: 'settings',
      },
      {
        key: 'property-settings',
        label: 'Property Settings',
        url: '/settings/property',
        parentKey: 'settings',
      },
      {
        key: 'email-settings',
        label: 'Email Settings',
        url: '/settings/email',
        parentKey: 'settings',
      },
      {
        key: 'backup-settings',
        label: 'Backup & Security',
        url: '/settings/backup',
        parentKey: 'settings',
      },
    ],
  },
  {
    key: 'help',
    label: 'Help & Support',
    icon: 'solar:question-circle-bold',
    children: [
      {
        key: 'documentation',
        label: 'Documentation',
        url: '/help/documentation',
        parentKey: 'help',
      },
      {
        key: 'support',
        label: 'Support Center',
        url: '/help/support',
        parentKey: 'help',
      },
      {
        key: 'contact',
        label: 'Contact Admin',
        url: '/help/contact',
        parentKey: 'help',
      },
    ],
  },
]
