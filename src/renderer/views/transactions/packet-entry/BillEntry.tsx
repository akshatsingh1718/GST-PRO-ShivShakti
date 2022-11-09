import React from 'react';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GSTCalculator from '../../../components/GSTCalculatorCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import YesNoDialog from 'renderer/components/YesNoDialog';
import {
  findCompany,
  getDistinctValuesFromEmployeeCol,
  getEmployee,
  saveBill,
  fakeResp,
  deleteBill,
} from '../../../utils/api.utils';
import { PacketEntryInputs, BillInputs } from '../../../utils/types.utils';
import EntriesTable from 'renderer/components/EntriesTable';
import { IconButton } from '@mui/material';
import Notification from 'renderer/components/Notification';
import BillAvatarChip from 'renderer/components/BillAvatarChip';
import {
  Controller,
  TextAutocomplete,
  AvatarAutocomplete,
  CustomSelect,
  CustomDatePicker,
  EmployeeAutocomplete,
  CompanyAutocomplete,
  CustomCurrencyField,
  CustomEmailField,
  CustomAddressField,
} from 'renderer/components/CustomInputs';
import SimpleInfoCard from 'renderer/components/SimpleInfoCard';
import Alert from '@mui/material/Alert';
import AppBarWidgets from 'renderer/components/AppBarWidgets';
import { BillIcon, ClearFormIcon, PrintIcon, SendIcon } from 'renderer/utils/icons.utils';

const BillEntry = ({
  isEditable = true,

  defaultDetails = {
    company: '',
    employee: '',
    createdAt: new Date(),
    department: '',
    entries: [],
    grpName: '',
    gstType: 'cgst/sgst',
    invoiceId: null,
    id: '',
  },
}) => {
  const {
    register: registerForPacketEntry,
    handleSubmit: handleBillEntrySubmit,
    reset: resetEntry,
    formState: { errors: packetErrors },
  } = useForm<PacketEntryInputs>({
    defaultValues: {
      destination: '',
      partyName: '',
      docketNo: '',
      description: '',
      weight: '',
      amount: '',
    },
  });

  const {
    register: registerForBillEntry,
    handleSubmit: handleBillSubmit,
    getValues: getBillEntryValues,
    setValue: setBillEntryValue,
    watch: watchBillEntry,
    reset: resetBill,
    formState: { errors: billEntryErrors },
    control,
  } = useForm({
    defaultValues: defaultDetails,
  });

  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });
  const [isSaveBillBtnClicked, setIsSaveBillBtnClicked] = useState(false);
  const [isDelBillBtnClicked, setIsDelBillBtnClicked] = useState(false);
  const [companyOptions, setCompanyOptions] = useState();
  const [grpNameOptions, setGrpNameOptions] = useState();
  const [departmentOptions, setDepartmentOptions] = useState();
  const [employeeOptions, setEmployeeOptions] = useState();
  const [billId, setBillId] = useState(defaultDetails?.id);
  const [isFormEditable, setIsFormEditable] = useState(isEditable);

  const watchGstType = watchBillEntry('gstType');

  console.log('------ RELOAD --------');
  const getEntriesTotalAmt = () => {
    return getBillEntryValues('entries').reduce((accumulator, object) => {
      return accumulator + parseFloat(object.amount);
    }, 0);
  };

  const resetForm = () => {
    resetBill(defaultDetails);
  };
  useEffect(() => {
    if (isFormEditable) {
      findCompany().then((resp) => {
        setCompanyOptions(resp.data);
      });
    }
  }, []);

  useEffect(() => {
    // console.log(watchBillEntry());
    const subscription = watchBillEntry((value, { name, type }) => {
      console.log('======== watch =======');
      console.log(value, name, type);
      if (name === 'company') {
        if (value[name] === null) {
          setBillEntryValue('grpName', '');
          setBillEntryValue('department', '');
          setBillEntryValue('employee', '');
          setGrpNameOptions();
          setDepartmentOptions();
          setEmployeeOptions();
        } else {
          getDistinctValuesFromEmployeeCol({
            filter: { companyId: value?.company?.id },
            column: 'grpName',
          }).then((resp) => {
            setGrpNameOptions(resp.data);
          });
          getDistinctValuesFromEmployeeCol({
            filter: { companyId: value?.company?.id },
            column: 'department',
          }).then((resp) => {
            setDepartmentOptions(resp.data);
          });
        }
      }

      if (name === 'grpName' || name === 'department') {
        if (!value[name]) {
          setBillEntryValue('employee', '');
          setEmployeeOptions();
        }
      }

      if (
        value?.company &&
        value?.department &&
        value?.grpName &&
        value?.employee === ''
      ) {
        console.log('Triggered employee search !!!!');
        getEmployee({
          filter: {
            companyId: value.company.id,
            department: value.department,
            grpName: value.grpName,
          },
        }).then((resp) => {
          setEmployeeOptions(resp.data);
          console.log(resp.data);
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watchBillEntry]);

  const onBillEntrySubmit: SubmitHandler<PacketEntryInputs> = (data) => {
    resetEntry();
    if (getBillEntryValues('entries').length === 0) {
      data.id = 1;
    } else {
      data.id = Math.max(...getBillEntryValues('entries').map((o) => o.id)) + 1;
    }

    setBillEntryValue('entries', getBillEntryValues('entries').concat(data));
  };

  const onBillSubmit: SubmitHandler<BillInputs> = (data) => {
    console.log('PacketEntry-> onBillSubmit');
    if (!(data?.entries && data?.entries.length > 0)) {
      setNotificationState({
        ...notificationState,
        open: true,
        text: 'Please fill atleast one Entry',
        severity: 'warning',
      });
      return;
    }
    setIsSaveBillBtnClicked(true);
  };

  const saveBillAndNotify = () => {
    saveBill({
      data: {
        createdAt: getBillEntryValues('createdAt'),
        companyId: getBillEntryValues('company.id'),
        employeeId: getBillEntryValues('employee.id'),
        gstType: getBillEntryValues('gstType'),
        entries: getBillEntryValues('entries'),
      },
    })
      .then((resp) => {
        let text = '';
        let severity = '';
        console.log(resp.data);
        if (resp.isSuccessful) {
          text = 'Bill created successfully.';
          severity = 'success';
          setBillId(resp.data.id);
          setIsFormEditable(false);
        } else {
          text = `${resp.error}`;
          severity = 'error';
        }
        setNotificationState({
          ...notificationState,
          open: true,
          text,
          severity,
        });
        return null;
      })
      .catch((e) => {});
  };

  const deleteBillAndNotify = () => {
    deleteBill({ id: billId }).then((resp) => {
      console.log('------------- AFTER DELETE');
      console.log(resp);
      if (resp.isSuccessful) {
        resetBill();
        setBillId();
        setIsFormEditable(true);

        text = resp.message;
        severity = 'success';
      } else {
        text = `${resp.error}`;
        severity = 'error';
      }
      setNotificationState({
        ...notificationState,
        open: true,
        text,
        severity,
      });
      return null;
    });
  };


  const appBarWidgets = [
    !billId ? (
      <Button
        color="primary"
        variant="contained"
        size="large"
        startIcon={<BillIcon size={25} />}
        onClick={handleBillSubmit(onBillSubmit)}
      >
        Save Bill
      </Button>
    ) : (
      <></>
    ),
    !billId ? (
      <Button
        startIcon={<ClearFormIcon size={25} />}
        color="primary"
        variant="contained"
        size="large"
        onClick={resetForm}
      >
        Clear
      </Button>
    ) : (
      <></>
    ),
    <Button
      color="primary"
      variant="contained"
      size="large"
      startIcon={<PrintIcon />}
      onClick={(e) => {
        window.electron.ipcRenderer.sendMessage('createBill', {});
      }}
    >
      Print
    </Button>,
    billId ? (
      <Button
        color="error"
        variant="contained"
        size="large"
        style={{ justifyContent: 'flex-start' }}
        onClick={() => setIsDelBillBtnClicked(true)}
        startIcon={<DeleteIcon />}
      >
        Delete Bill
      </Button>
    ) : (
      <></>
    ),
  ];
  return (
    <>
      <YesNoDialog
        heading="Save Bill?"
        text="Are you sure you want to save bill? After saving no modification can be done on this bill."
        onYes={() => saveBillAndNotify()}
        open={isSaveBillBtnClicked}
        setOpen={setIsSaveBillBtnClicked}
      />
      <YesNoDialog
        heading="Delete Bill?"
        text={`Are you sure you want to delete bill no ${billId}? After deleting this will be removed from the invoice no ${getBillEntryValues(
          'invoiceId'
        )}.`}
        onYes={() => {
          deleteBillAndNotify();
        }}
        open={isDelBillBtnClicked}
        setOpen={setIsDelBillBtnClicked}
      />
      <Notification state={notificationState} setState={setNotificationState} />

      <AppBarWidgets childs={appBarWidgets} sx={{ mb: 1, mx: 2 }} />

      {billId && (
        <Box sx={{ flexGrow: 1, mb: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SimpleInfoCard
                label="Bill date"
                text={getBillEntryValues('createdAt')
                  .toISOString()
                  .slice(0, 10)}
              />
            </Grid>
            <Grid item xs={2.5}>
              <Card elevation={1} sx={{ p: 1, my: 1 }}>
                <ReceiptLongIcon /> {`Bill No : ${billId}`}
              </Card>
            </Grid>
            <Grid item>
              {getBillEntryValues('invoiceId') && (
                <SimpleInfoCard
                  label="Connected Invoice no"
                  text={getBillEntryValues('invoiceId')}
                />
              )}
              {!getBillEntryValues('invoiceId') && (
                <Alert severity="info">
                  Invoice not generated for this bill
                </Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      <Card elevation={3} sx={{ p: 1, my: 1 }}>
        <form>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={2}>
                <Controller
                  {...{
                    control,
                    register: registerForBillEntry,
                    name: 'createdAt',
                    rules: {
                      required: {
                        value: false,
                        message: 'Bill date required.',
                      },
                    },
                    render: (props) => (
                      <CustomDatePicker label="Bill date" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Controller
                  {...{
                    control,
                    register: registerForBillEntry,
                    name: 'company',
                    rules: {
                      required: {
                        value: true,
                        message: 'company required.',
                      },
                    },
                    render: (props) => (
                      <CompanyAutocomplete
                        readOnly={!isFormEditable}
                        label="company"
                        options={companyOptions}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Controller
                  {...{
                    control,
                    register: registerForBillEntry,
                    name: 'grpName',
                    rules: {
                      required: {
                        value: true,
                        message: 'Group name required.',
                      },
                    },
                    render: (props) => (
                      <TextAutocomplete
                        readOnly={!isFormEditable}
                        label="Group"
                        options={grpNameOptions}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Controller
                  {...{
                    control,
                    register: registerForBillEntry,
                    name: 'department',

                    rules: {
                      required: {
                        value: true,
                        message: 'Group name required.',
                      },
                    },
                    render: (props) => (
                      <TextAutocomplete
                        label="Department"
                        options={departmentOptions}
                        readOnly={!isFormEditable}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Controller
                  {...{
                    control,
                    register: registerForBillEntry,
                    name: 'employee',

                    onChange: () => {},
                    rules: {
                      required: {
                        value: true,
                        message: 'employee required.',
                      },
                    },
                    render: (props) => (
                      <EmployeeAutocomplete
                        label="Employee"
                        options={employeeOptions}
                        readOnly={!isFormEditable}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Controller
                  {...{
                    control,
                    register: registerForBillEntry,
                    name: 'gstType',
                    rules: {
                      required: {
                        value: true,
                        message: 'gstType required.',
                      },
                    },

                    render: (props) => (
                      <CustomSelect
                        label="GST Type"
                        options={[
                          { label: 'CGST/SGST', value: 'cgst/sgst' },
                          { label: 'IGST', value: 'igst' },
                        ]}
                        readOnly={!isFormEditable}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={7}>
                <CustomAddressField
                  readOnly={true}
                  id="filled-basic"
                  label="Company address"
                  size="small"
                  variant="filled"
                  value={getBillEntryValues('company.address') || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Card>

      {isFormEditable && (
        <Card elevation={3} sx={{ p: 1, my: 1 }}>
          <form onSubmit={handleBillEntrySubmit(onBillEntrySubmit)}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    label="destination Name"
                    size="small"
                    variant="filled"
                    error={packetErrors?.destination}
                    helperText={packetErrors?.destination?.message}
                    {...registerForPacketEntry('destination', {
                      required: {
                        value: true,
                        message: 'destination required.',
                      },
                    })}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    label="Party Name"
                    size="small"
                    variant="filled"
                    error={packetErrors?.partyName}
                    helperText={packetErrors?.partyName?.message}
                    {...registerForPacketEntry('partyName', {
                      required: {
                        value: true,
                        message: 'Party name required.',
                      },
                    })}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-basic"
                      label="Docket No"
                      size="small"
                      variant="filled"
                      error={packetErrors?.docketNo}
                      helperText={packetErrors?.docketNo?.message}
                      {...registerForPacketEntry('docketNo', {
                        required: {
                          value: true,
                          message: 'Docket No required.',
                        },
                      })}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-basic"
                      label="Description"
                      size="small"
                      variant="filled"
                      {...registerForPacketEntry('description')}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={1.5}>
                  <FormControl fullWidth>
                    <TextField
                      label="Weight"
                      id="filled-start-adornment"
                      {...registerForPacketEntry('weight')}
                      size="small"
                      variant="filled"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={1.5}>
                  <TextField
                    label="Amount"
                    id="filled-start-adornment"
                    type="number"
                    error={packetErrors?.amount}
                    helperText={packetErrors?.amount?.message}
                    {...registerForPacketEntry('amount', {
                      required: {
                        value: true,
                        message: 'Amount required!',
                      },
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1}>
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Card>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={9} lg={9}>
            <Card
              elevation={3}
              sx={{ p: 0, m: 0 }}
              style={{ height: 400, width: '100%' }}
            >
              <EntriesTable
                readOnly={!isFormEditable}
                getRows={getBillEntryValues('entries')}
                setRows={(val) => setBillEntryValue('entries', val)}
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={3} lg={3}>
            <Card
              elevation={3}
              sx={{ p: 0, m: 0 }}
              style={{ height: 400, width: '100%' }}
            >
              <GSTCalculator
                GSTToCalculate={watchGstType?.split('/')}
                taxableAmount={getEntriesTotalAmt}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BillEntry;
