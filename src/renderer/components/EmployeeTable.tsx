import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import Card from '@mui/material/Card';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CustomNoEmployeeOverlay from 'renderer/components/CustomNoEmployeeOverlay';
import { FcRightUp } from 'react-icons/fc';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CompanyCard, EmployeeCard } from 'renderer/components/CustomCards';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export function CustomFooterStatusComponent(props) {
  console.log('----------> FOOTER');
  console.log(props);
  return (
    <Box sx={{ p: 1, display: 'flex' }}>
      <Div></Div>
    </Box>
  );
}

const CustomToolbar = ({ refreshRows }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button onClick={refreshRows} startIcon={<RefreshIcon />}>
        {' '}
        Refresh
      </Button>
    </GridToolbarContainer>
  );
};

export default function EmployeeTable({ getRows, setEmployee, isReloadRows }) {
  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        headerName: 'Edit',
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<FcRightUp size={30} />}
            label="edit"
            onClick={() => {
              setEmployee && setEmployee(params.row);
            }}
          />,
        ],
      },

      {
        field: 'company',
        headerName: 'company',
        width: 300,
        valueFormatter: ({ value }) => value.name,
        renderCell: ({ value }) => <CompanyCard company={value} />,
      },
      {
        field: 'name',
        headerName: 'Employee',
        width: 200,
        valueFormatter: ({ value }) => value,
      },
      {
        field: 'email',
        headerName: 'email',
        width: 200,
      },
      {
        field: 'empCode',
        headerName: 'empCode',
      },
      { field: 'mobile', headerName: 'mobile' },
      {
        field: 'designation',
        headerName: 'designation',
      },
      { field: 'department', headerName: 'department' },
      { field: 'address', headerName: 'address' },
      {
        field: 'district',
        headerName: 'district',
      },
      {
        field: 'state',
        headerName: 'state',
      },
      {
        field: 'pincode',
        headerName: 'pincode',
      },
    ],

    [setEmployee]
  );

  const [rows, setRows] = React.useState();

  const refreshRows = () => {
    getRows()
      .then((resp) => {
        if (resp.isSuccessful) {
          setRows(resp.data);
        }
        return null;
      })
      .catch((e: Error) => console.log(e));
  };

  useEffect(() => {
    refreshRows();
  }, [isReloadRows]);

  return (
    <>
      <DataGrid
        rows={rows || []}
        getRowId={(row) => row.id}
        columns={columns}
        isCellEditable={(params) => true}
        // density="compact"
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: { refreshRows },
        }}
        components={{
          Footer: CustomFooterStatusComponent,
          NoRowsOverlay: CustomNoEmployeeOverlay,
          Toolbar: CustomToolbar,
        }}
      />
    </>
  );
}
