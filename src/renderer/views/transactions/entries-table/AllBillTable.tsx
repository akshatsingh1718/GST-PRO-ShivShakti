import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  getAllBills,
  getBillById,
  findLastestBills,
  getBillGreaterThan,
  getBillLesserThan,
  deleteBill,
  undoDeletedBill,
} from '../../../utils/api.utils';
import TextField from '@mui/material/TextField';
import YesNoDialog from 'renderer/components/YesNoDialog';
import BillDisplay from 'renderer/components/BillDisplay';
import Notification from 'renderer/components/Notification';
import BillDisplaySkeleton from 'renderer/components/BillDisplaySkeleton';
import { useTheme } from '@mui/material';
import AppBarWidgets from 'renderer/components/AppBarWidgets';
import {
  DeleteIcon,
  ForwardIcon,
  BackwardIcon,
  CaretRightIcon,
  CaretLeftIcon,
} from 'renderer/utils/icons.utils';

export default function EntriesTable() {
  const theme = useTheme();

  const [bill, setBill] = useState();
  const [searchBillDetails, setSearchBillDetails] = useState();
  const [loadingState, setLoadingState] = useState({
    text: 'loading',
    open: true,
  });
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });

  const [billId, setBillId] = useState();
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);

  const updateBillState = (billDetails) => {
    console.log('updateBillState');
    console.log(billDetails);
    setBillId(billDetails.id);
    setBill({
      id: billDetails?.id,
      invoiceId: billDetails?.invoiceId,
      company: billDetails.employee.company,
      createdAt: billDetails.createdAt,
      grpName: billDetails.employee.grpName,
      department: billDetails.employee.department,
      entries: billDetails.entries,
      gstType: billDetails.gstType,
      employee: billDetails.employee,
    });
  };

  const setBillToPrev = () => {
    setLoadingState({ text: 'searching', open: true });
    getBillLesserThan({ id: billId }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setLoadingState({ ...loadingState, open: false });
        updateBillState(resp.data);
      } else setLoadingState({ text: 'No data found', open: false });
    });
  };

  const setBillToNext = () => {
    setLoadingState({ text: 'searching', open: true });
    getBillGreaterThan({ id: billId }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setLoadingState({ ...loadingState, open: false });
        updateBillState(resp.data);
      } else setLoadingState({ text: 'No data found', open: false });
    });
  };

  const setBillToOldest = () => {
    setLoadingState({ text: 'searching', open: true });
    getBillGreaterThan({ id: -1 }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setLoadingState({ ...loadingState, open: false });
        updateBillState(resp.data);
      } else setLoadingState({ text: 'No data found', open: false });
    });
  };

  const setBillToLatest = () => {
    setLoadingState({ text: 'searching', open: true });
    findLastestBills().then((resp) => {
      console.log('------> LATEST');
      console.log(resp);
      if (resp.isSuccessful) {
        setLoadingState({ ...loadingState, open: false });
        updateBillState(resp.data);
      } else {
        alert('LAST REACED');
        setLoadingState({ text: 'No data found', open: false });
      }
    });
  };

  const setNotificationStatus = (resp) => {
    let description = '';
    let severity = '';
    console.log(resp);
    console.log(resp.isSuccessful);
    if (resp.isSuccessful) {
      severity = 'success';
    } else {
      severity = 'error';
      description = `${resp?.error}`;
    }
    setNotificationState({
      ...notificationState,
      open: true,
      text: resp?.message,
      description,
      severity,
    });
  };

  const undoDeletedBillAndNotify = () => {
    const data = {
      employeeId: bill?.employee?.id,
      gstType: bill?.gstType,
      invoiceId: bill?.invoiceId,
      entries: bill?.entries,
      createdAt: bill?.createdAt,
    };
    undoDeletedBill({ bill: data })
      .then((resp) => {
        console.log('--------------xxxxxxxxxxx');
        console.log(resp);
        setNotificationStatus(resp);
        if (resp.isSuccessful) {
          setBill({ ...bill, id: resp.data.id });
          setBillId(resp.data.id);
        }
        return null;
      })
      .catch((e) => {});
  };

  const deletedBillAndNotify = () => {
    deleteBill({ id: billId })
      .then((resp) => {
        console.log('------------- AFTER DELETE');
        console.log(resp);
        setNotificationStatus(resp);
        if (resp.isSuccessful) {
          setBill({ ...bill, id: '' });
        }
        return null;
      })
      .catch((e) => {});
  };

  useEffect(() => {
    setLoadingState({ text: 'searching', open: true });
    if (searchBillDetails) {
      getBillById({
        id: searchBillDetails,
        includeEntries: true,
        includeEmployee: true,
      })
        .then((resp) => {
          console.log('useeffect triggerd');
          console.log(resp);

          if (resp?.data?.id) {
            setLoadingState({ ...loadingState, open: false });
            updateBillState(resp.data);
          } else {
            setLoadingState({ text: resp.message, open: true });
          }
        })
        .catch((e) => {});
    } else {
      setBillToLatest();
    }
  }, [searchBillDetails]);

  const appBarWidgets = [
    <TextField
      fullWidth
      label="Search Bill no"
      id="filled-start-adornment"
      type="number"
      size="small"
      variant="filled"
      defaultValue={searchBillDetails}
      onBlur={(e) => setSearchBillDetails(e.target.value)}
    />,
    <Button variant="contained" onClick={setBillToOldest}>
      <BackwardIcon size={30} />
    </Button>,
    <Button
      variant="contained"
      startIcon={<CaretLeftIcon size={30} />}
      onClick={setBillToPrev}
    >
      Previous
    </Button>,
    <Button
      variant="contained"
      endIcon={<CaretRightIcon size={30} />}
      onClick={setBillToNext}
    >
      Next
    </Button>,
    <Button variant="contained" onClick={setBillToLatest}>
      <ForwardIcon size={30} />
    </Button>,
    bill?.id ? (
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          setIsDeleteBtnClicked(true);
        }}
      >
        <DeleteIcon size={30} />
      </Button>
    ) : (
      <></>
    ),
    !bill?.id ? (
      <Button
        variant="contained"
        color="info"
        onClick={undoDeletedBillAndNotify}
      >
        UNDO
      </Button>
    ) : (
      <></>
    ),
  ];
  return (
    <>
      <YesNoDialog
        heading="Delete Invoice"
        text={`Are you sure you want to delete this bill?`}
        onYes={deletedBillAndNotify}
        open={isDeleteBtnClicked}
        setOpen={setIsDeleteBtnClicked}
      />
      <Notification state={notificationState} setState={setNotificationState} />

      <AppBarWidgets childs={appBarWidgets} sx={{ mb: 1, mx: 2 }} />

      {/* key as billId because after deleting bill.id will be removed and it will update the component making all things dissappear */}
      <Box sx={{ p: 1 }} key={bill?.id}>
        {!loadingState.open && <BillDisplay bill={bill} />}

        {loadingState.open && loadingState.text === 'searching' && (
          <BillDisplaySkeleton />
        )}
        {loadingState.open && loadingState.text !== 'searching' && (
          <h1>{loadingState.text}</h1>
        )}
      </Box>
    </>
  );
}
