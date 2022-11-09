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
import CustomNoCompanyOverlay from 'renderer/components/CustomNoCompanyOverlay';
import DeleteIcon from '@mui/icons-material/Delete';
import { FcRightUp } from 'react-icons/fc';
import RefreshIcon from '@mui/icons-material/Refresh';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

// const columns: GridColDef[] = [

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

export default function CompanyTable({ getRows, setCompany, isReloadRows }) {
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
              setCompany && setCompany({ ...params.row, state: 'Assam' });
            }}
          />,
        ],
      },
      {
        field: 'code',
        headerName: 'code',
      },
      {
        field: 'name',
        headerName: 'Company name',
        width: 200,
        valueFormatter: ({ value }) => value,
      },
      {
        field: 'state',
        headerName: 'state',
        width: 200,
      },
      { field: 'address', headerName: 'address' },
      { field: 'mobile', headerName: 'mobile' },
      {
        field: 'district',
        headerName: 'district',
      },
      {
        field: 'pincode',
        headerName: 'pincode',
      },
    ],

    [setCompany]
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
    <DataGrid
      rows={rows || []}
      getRowId={(row) => row.id}
      columns={columns}
      isCellEditable={(params) => true}
      density="compact"
      components={{ Toolbar: CustomToolbar }}
      componentsProps={{
        toolbar: { refreshRows },
      }}
      components={{
        Footer: CustomFooterStatusComponent,
        NoRowsOverlay: CustomNoCompanyOverlay,
        Toolbar: CustomToolbar,
      }}
    />
  );
}
