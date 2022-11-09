import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// Master Information
const AddCompanyForm = React.lazy(() =>
  import('./views/master-info/add-company-form/AddCompanyForm')
);
const AddEmployeeForm = React.lazy(() =>
  import('./views/master-info/add-emp-form/AddEmployeeForm')
);
const MasterDetailsForm = React.lazy(() =>
  import('./views/master-info/master-details/MasterDetailsForm')
);

// settings
const UserSettings = React.lazy(() =>
  import('./views/settings/user-settings/UserSettings')
);

// Transactions
const BillEntry = React.lazy(() =>
  import('./views/transactions/packet-entry/BillEntry')
);
const EntriesTable = React.lazy(() =>
  import('./views/transactions/entries-table/AllBillTable')
);
const CreateInvoice = React.lazy(() =>
  import('./views/transactions/create-invoice/CreateInvoice')
);
const InvoiceFilterTable = React.lazy(() =>
  import('./views/transactions/all-invoices/InvoiceFilterTable')
);

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/master-info/add-company-form',
    name: 'Add Company',
    element: AddCompanyForm,
  },
  {
    path: '/master-info/add-emp-form',
    name: 'Add Employee',
    element: AddEmployeeForm,
  },
  {
    path: '/master-info/master-details',
    name: 'Master Details',
    element: MasterDetailsForm,
  },

  {
    path: '/transactions/packet-entry',
    name: 'Packet Entry',
    element: BillEntry,
  },
  {
    path: '/transactions/entries-table',
    name: 'All Entries',
    element: EntriesTable,
  },
  {
    path: '/transactions/create-invoice',
    name: 'Create Invoice',
    element: CreateInvoice,
  },
  {
    path: '/transactions/all-invoices',
    name: 'Invoices',
    element: InvoiceFilterTable,
  },

  {
    path: '/settings/user-settings',
    name: 'User Settings',
    element: UserSettings,
  },
];

export default routes;
