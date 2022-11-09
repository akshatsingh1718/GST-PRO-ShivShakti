import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  findLastestInvoice,
  findInvoiceById,
  getInvoiceGreaterThan,
  getInvoiceLesserThan,
  deleteInvoice,
  undoDeletedInvoice,
  getInvoice,
} from 'renderer/utils/api.utils';
import InvoiceTable from 'renderer/components/InvoiceTable';
import YesNoDialog from 'renderer/components/YesNoDialog';
import Notification from 'renderer/components/Notification';
import InvoiceDownloadView from 'renderer/components/InvoiceDownloadView';
import { Card, TextField } from '@mui/material';
import AppBarWidgets from 'renderer/components/AppBarWidgets';
import { isEmptyObject } from 'renderer/utils/common.utils';
import {DeleteIcon, ForwardIcon, BackwardIcon, CaretRightIcon, CaretLeftIcon, DownloadIcon, ArrowLeftIcon} from "renderer/utils/icons.utils";

export default function InvoiceFilterTable() {
  const [invoice, setInvoice] = React.useState();
  const [invoiceId, setInvoiceId] = React.useState();
  const [filterOptions, setFilterOptions] = useState({});

  const [isDownloadView, setIsDownloadView] = React.useState(false);

  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });

  useEffect(() => {
    if (!isEmptyObject(filterOptions)) {
      getInvoice({ filter: filterOptions })
        .then((resp) => {
          console.log('useeffect triggerd');
          console.log(resp);
          if (resp.isSuccessful) {
            setInvoice(resp.data[0]);
            setInvoiceId(resp.data[0].id);
          } else {
            setNotificationStatus(resp);
          }
        })
        .catch((e) => {});
    }
  }, [filterOptions]);

  useEffect(() => {
    findLastestInvoice().then((resp) => {
      console.log('---> getLatestInvoice');
      if (resp.isSuccessful) {
        setInvoice(resp.data);
        setInvoiceId(resp.data.id);
      }
      setNotificationStatus(resp);

      console.log(resp);
    });
  }, []);

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

  const deleteInvoiceAndNotify = () => {
    console.log('DELETE!!!!' + invoice?.id);
    deleteInvoice({ id: invoice?.id }).then((resp) => {
      setNotificationStatus(resp);
      if (resp.isSuccessful) {
        console.log({ ...invoice, id: null });
        setInvoice({ ...invoice, id: null });
      }
    });
  };

  const undoDeletedInovceAndNotify = () => {
    console.log('DELETE!!!!' + invoice?.id);
    const billIds = Array.from(
      new Set(invoice?.bills?.map((bill) => bill.billId))
    );
    const data = {
      startDate: invoice?.startDate,
      endDate: invoice?.endDate,
      createdAt: invoice?.createdAt,
      billIds,
    };
    console.log(data);
    undoDeletedInvoice({ invoice: data }).then((resp) => {
      console.log('-----------><><><><---------');
      console.log(resp);
      setNotificationStatus(resp);
      if (resp?.isSuccessful) {
        setInvoice({ ...invoice, id: resp?.data?.id });
      }
    });
  };

  const setInvoiceToOldest = () => {
    getInvoiceGreaterThan({ id: -1 }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setInvoice(resp.data);
        setInvoiceId(resp.data.id);
      }
    });
  };

  const setInvoiceToPrev = () => {
    getInvoiceLesserThan({ id: invoiceId }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setInvoice(resp.data);
        setInvoiceId(resp.data.id);
      }
    });
  };

  const setInvoiceToNext = () => {
    getInvoiceGreaterThan({ id: invoiceId }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setInvoice(resp.data);
        setInvoiceId(resp.data.id);
      }
    });
  };

  const setInvoiceToLatest = () => {
    findLastestInvoice().then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setInvoice(resp.data);
        setInvoiceId(resp.data.id);
      }
    });
  };

  const appBarWidgets = [
    <TextField
      fullWidth
      label="Search Invoice no"
      id="filled-start-adornment"
      type="number"
      size="small"
      variant="filled"
      defaultValue={setFilterOptions?.id}
      onBlur={(e) =>
        setFilterOptions({ ...setFilterOptions, id: e.target.value })
      }
    />,
    <Button
      variant="contained"
      startIcon={<BackwardIcon size={25} />}
      onClick={setInvoiceToOldest}
    >
      First
    </Button>,
    <Button
      variant="contained"
      startIcon={<CaretLeftIcon size={25} />}
      onClick={setInvoiceToPrev}
    >
      Previous
    </Button>,
    <Button
      variant="contained"
      endIcon={<CaretRightIcon size={25} />}
      onClick={setInvoiceToNext}
    >
      Next
    </Button>,
    <Button
      variant="contained"
      endIcon={<ForwardIcon size={25} />}
      onClick={setInvoiceToLatest}
    >
      Lastest
    </Button>,
    !isDownloadView ? (
      <Button
        startIcon={<DownloadIcon />}
        variant="contained"
        onClick={() => setIsDownloadView(!isDownloadView)}
      >
        Download
      </Button>
    ) : (
      <></>
    ),
    isDownloadView ? (
      <Button
        startIcon={<ArrowLeftIcon />}
        variant="contained"
        onClick={() => setIsDownloadView(!isDownloadView)}
      >
        Back
      </Button>
    ) : (
      <></>
    ),

    invoice?.id ? (
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          setIsDeleteBtnClicked(true);
        }}
      >
        <DeleteIcon size={25} />
      </Button>
    ) : (
      <></>
    ),
    !invoice?.id ? (
      <Button
        variant="contained"
        color="info"
        onClick={undoDeletedInovceAndNotify}
      >
        UNDO
      </Button>
    ) : (
      <></>
    ),
  ];
  return (
    <div>
      <Notification state={notificationState} setState={setNotificationState} />

      <YesNoDialog
        heading="Delete Invoice"
        text="Are you sure you want to delete this invoice?"
        onYes={() => deleteInvoiceAndNotify()}
        open={isDeleteBtnClicked}
        setOpen={setIsDeleteBtnClicked}
      />

      <AppBarWidgets childs={appBarWidgets} sx={{ mb: 1, mx: 2 }} />

      {!isDownloadView && (
        <InvoiceTable invoice={invoice} showMasterCardHeader />
      )}
      {isDownloadView && <InvoiceDownloadView invoice={invoice} />}
    </div>
  );
}
