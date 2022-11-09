import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import {
  TransactionIcon,
  BillIcon,
  InvoiceIcon,
  ModelOperations,
} from 'renderer/utils/icons.utils';
import { HomeIcon } from 'renderer/utils/icons.utils';
import Box from '@mui/material/Box';

const Icon = ({icon}) => {
  return (
    <Box component="span" sx={{ ml:1, mr: 2 }}>
      {icon}
    </Box>
  );
};

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <Icon icon={<HomeIcon/>} />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Add New +',
    to: '/master-info',
    icon: <Icon icon={<ModelOperations/>} />,
    items: [
      {
        component: CNavItem,
        name: 'Company',
        to: '/master-info/add-company-form',
      },
      {
        component: CNavItem,
        name: 'Employee',
        to: '/master-info/add-emp-form',
      },
      {
        component: CNavItem,
        name: 'User',
        to: '/settings/user-settings',
      },
      {
        component: CNavItem,
        name: 'Master Details',
        to: '/master-info/master-details',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Transactions',
    to: '/transactions',
    icon: <Icon icon={<TransactionIcon/>} />,
    items: [
      {
        component: CNavTitle,
        name: 'Bill Operations',
      },
      {
        component: CNavItem,
        name: 'Create New Bill',
        to: '/transactions/packet-entry',
      },
      {
        component: CNavItem,
        name: 'Search Bill',
        to: '/transactions/entries-table',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavTitle,
        name: 'Invoice',
      },
      {
        component: CNavItem,
        name: 'Create New Invoice',
        to: '/transactions/create-invoice',
      },
      {
        component: CNavItem,
        name: 'Search Invoice',
        to: '/transactions/all-invoices',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
