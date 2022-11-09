import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import Box, { BoxProps } from '@mui/material/Box';
import MasterCardHeader from 'renderer/components/MasterCardHeader';
import { styled } from '@mui/material/styles';
import CustomNoEntriesOverlay from 'renderer/components/CustomNoEntriesOverlay';
import SimpleInfoCard from 'renderer/components/SimpleInfoCard';
import Grid from '@mui/material/Grid';
import { InvoiceIcon } from 'renderer/utils/icons.utils';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'SNo', editable: false, width: 25 },
  {
    field: 'employee',
    headerName: 'Employee',
    width: 200,
    valueFormatter: ({ value }) => value.name,
  },
  {
    field: 'billId',
    headerName: 'Bill no',
    width: 40,
  },
  {
    field: 'createdAt',
    headerName: 'Bill date',
    type: 'date',
    valueFormatter: ({ value }) => value.toISOString().slice(0, 10),
  },
  { field: 'docketNo', headerName: 'Docket No' },
  {
    field: 'destination',
    headerName: 'Destination',
  },
  { field: 'partyName', headerName: 'Party Name', width: 100 },
  {
    field: 'description',
    headerName: 'Description',
  },
  { field: 'weight', headerName: 'Weight', width: 100 },
  {
    field: 'amount',
    headerName: 'Amount (in ₹)',
    width: 150,
  },
];

export function CustomFooterStatusComponent(props) {
  console.log('----------> FOOTER');
  console.log(props);
  return (
    <Box sx={{ p: 1, display: 'flex' }}>
      <Div>
        <b>
          Total :{' '}
          {props?.bills?.reduce((n, { amount }) => n + parseFloat(amount), 0)}
        </b>
      </Div>
    </Box>
  );
}

export default function InvoiceTable({ invoice, showMasterCardHeader }) {
  return (
    <>
      {/* {showMasterCardHeader && (
        <MasterCardHeader
          otherDetails={[
            [
              { label: 'SUM INVOICE NO:', val: invoice?.id },
              {
                label: 'INVOICE DATE:',
                val: invoice?.createdAt?.toISOString().slice(0, 10),
              },
              {
                label: 'DEPARTMENT:',
                val: invoice?.bills?.[0]?.employee?.department,
              },
            ],
          ]}
        />
      )} */}
      {invoice?.id && (
        <Box sx={{ flexGrow: 1, m: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <SimpleInfoCard
                label="Bill date"
                text={invoice?.createdAt?.toISOString().slice(0, 10)}
              />
            </Grid>
            <Grid item>
              <Card elevation={1} sx={{ p: 1, my: 1 }}>
                <InvoiceIcon size={25}/> invoice No : {invoice?.id}
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card elevation={3} sx={{ p: 0, m: 1 }} style={{ height: 400 }}>
              <DataGrid
                rows={invoice?.bills || []}
                getRowId={(row) => row.id}
                columns={columns}
                isCellEditable={(params) => true}
                density="compact"
                components={{
                  Footer: CustomFooterStatusComponent,
                  NoRowsOverlay: CustomNoEntriesOverlay,
                }}
                componentsProps={{
                  footer: { bills: invoice?.bills },
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
