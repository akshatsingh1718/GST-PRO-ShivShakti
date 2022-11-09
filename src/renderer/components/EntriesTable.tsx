import React from 'react';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import YesNoDialog from './YesNoDialog';

const CustomToolbar = ({
  delBtnOnClick,
  clearAllBtnOnClick,
  selectedRows,
  rows,
  readOnly,
}) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        startIcon={<ClearIcon />}
        onClick={clearAllBtnOnClick}
        disabled={(rows?.length > 0 ? false : true) || readOnly}
      >
        Clear all
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={delBtnOnClick}
        color={'error'}
        disabled={(selectedRows?.length > 0 ? false : true) || readOnly}
      >
        delete
      </Button>
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
};

const EntriesTable = ({ getRows, setRows, readOnly = true }) => {
  const columns = [
    { field: 'id', headerName: 'SNo', editable: false, width: 50 },
    {
      field: 'destination',
      headerName: 'Destination',
      width: 120,
      editable: !readOnly,
    },
    {
      field: 'partyName',
      headerName: 'Party Name',
      width: 100,
      editable: !readOnly,
    },
    {
      field: 'docketNo',
      headerName: 'Docket No',
      type: 'number',
      width: 100,
      editable: !readOnly,
    },
    { field: 'weight', headerName: 'Weight (Kg)', width: 100, editable: !readOnly },
    { field: 'amount', headerName: 'Amount', width: 100, editable: !readOnly },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const [isClearAllClicked, setIsClearAllClicked] = useState(false);

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
        rows={getRows}
        getRowId={(row) => row.id}
        // getRowId={(row) => row.no}

        columns={columns}
        isCellEditable={(params) => true}
        onCellEditCommit={handleCellEditCommit}
        checkboxSelection
        density="compact"
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: {
            delBtnOnClick: deleteSelectedRows,
            clearAllBtnOnClick,
            rows: getRows,
            selectedRows,
            readOnly,
          },
        }}
        onSelectionModelChange={(newSelectionModel) => {
          handleRowSelection(newSelectionModel);
        }}
      />
    </>
  );
};

export default EntriesTable;
