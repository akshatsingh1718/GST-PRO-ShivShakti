import React from 'react';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import YesNoDialog from './YesNoDialog';
import { FcRightUp } from 'react-icons/fc';
import { CustomAvatarCard } from 'renderer/components/CustomCards';
import Chip from '@mui/material/Chip';
import moment from 'moment';
import * as momenttz from 'moment-timezone';
momenttz.tz.setDefault('Etc/UTC');

const CustomToolbar = ({
  delBtnOnClick,
  clearAllBtnOnClick,
  selectedRows,
  rows,
}) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <Button
        startIcon={<ClearIcon />}
        onClick={clearAllBtnOnClick}
        disabled={rows?.length > 0 ? false : true}
      >
        Clear all
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={delBtnOnClick}
        color={'error'}
        disabled={selectedRows?.length > 0 ? false : true}
      >
        delete
      </Button>  */}
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const UserTable = ({ getRows, setUser, isReloadRows }) => {
  const columns = [
    { field: 'id', headerName: 'UID', editable: false, width: 50 },
    {
      headerName: 'Edit',
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FcRightUp size={30} />}
          label="edit"
          onClick={() => {
            setUser?.({ ...params.row, password: '', confirm_password: '' });
          }}
        />,
      ],
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 200,
      editable: false,
      renderCell: ({ value }) => <CustomAvatarCard name={value} />,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: false,
    },
    {
      field: 'userType',
      headerName: 'User Type',
      width: 100,
      editable: false,
      renderCell: ({ value }) => (
        <Chip label={value} color="primary" variant="filled" />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'date',
      width: 100,
      editable: false,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'date',
      width: 200,
      editable: false,
      valueFormatter: (params) =>
        params?.value
          ? moment(params?.value).format('DD/MM/YYYY hh:mm A')
          : 'Not available',
    },
    {
      field: 'lastLogout',
      headerName: 'Last Logout',
      type: 'date',
      width: 200,
      editable: false,
      valueFormatter: (params) =>
        params?.value
          ? moment(params?.value).format('DD/MM/YYYY hh:mm A')
          : 'Not available',
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const [isClearAllClicked, setIsClearAllClicked] = useState(false);
  const [rows, setRows] = React.useState([]);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      const updatedRows = getRows.map((row) => {
        if (row.id === id) {
          row[field] = value;
        }
        return row;
      });

      setRows?.(updatedRows);
    },
    [getRows]
  );

  const handleRowSelection = (rowsIds) => {
    setSelectedRows(rowsIds);
  };

  const deleteSelectedRows = () => {
    const rowsToKeep = getRows.filter(
      (r) => selectedRows.filter((sr) => sr === r.id).length < 1
    );
    rowsToKeep.forEach((o, i) => (o.id = i + 1));
    setRows?.(rowsToKeep);
  };

  const clearAllBtnOnClick = () => {
    setIsClearAllClicked(true);
  };

  const refreshRows = () => {
    getRows()
      .then((resp) => {
        console.log(resp);
        if (resp.isSuccessful) {
          setRows(resp.data);
        }
        return null;
      })
      .catch((e: Error) => console.log(e));
  };

  React.useEffect(() => {
    refreshRows();
  }, [isReloadRows]);

  return (
    <>
      <YesNoDialog
        heading={'Delete Entries?'}
        text={'Are you sure you want to clear all the entires?'}
        onYes={() => setRows?.([])}
        open={isClearAllClicked}
        setOpen={setIsClearAllClicked}
      />
      <DataGrid
        rows={rows || []}
        getRowId={(row) => row.id}
        columns={columns}
        isCellEditable={(params) => true}
        onCellEditCommit={handleCellEditCommit}
        // checkboxSelection
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: {
            delBtnOnClick: deleteSelectedRows,
            clearAllBtnOnClick,
            rows: getRows,
            selectedRows,
          },
        }}
        onSelectionModelChange={(newSelectionModel) => {
          handleRowSelection(newSelectionModel);
        }}
      />
    </>
  );
};

export default UserTable;
