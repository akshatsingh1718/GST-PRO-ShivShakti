import * as React from 'react';
import {
  saveInvoice,
  findLastestInvoice,
  findInvoiceById,
} from 'renderer/utils/api.utils';
import {
  useForm,
  SubmitHandler,
  useFormState,
  useWatch,
} from 'react-hook-form';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  getBillById,
  findCompany,
  getDistinctValuesFromEmployeeCol,
  getEmployee,
  saveInvoice,
  saveBill,
  fakeResp,
  deleteBill,
  getUnsavedInvoice,
} from '../../../utils/api.utils';
import {
  Controller,
  TextAutocomplete,
  AvatarAutocomplete,
  CustomSelect,
  CustomDatePicker,
  CustomMonthPicker,
} from 'renderer/components/CustomInputs';
import { IconButton } from '@mui/material';
import { FiSearch, FiSettings } from 'react-icons/fi';
import { AiFillSliders } from 'react-icons/ai';

import InvoiceTable from 'renderer/components/InvoiceTable';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import Notification from 'renderer/components/Notification';
import { Grow, Slide } from '@mui/material';
import { SearchIcon, FilterIcon } from 'renderer/utils/icons.utils';

const Controller = ({ control, register, name, rules, render, onChange }) => {
  const value = useWatch({
    control,
    name,
  });

  const { errors } = useFormState({
    control,
    name,
  });

  const props = register(name, rules);

  const onChangeFun = (newValue) => {
    onChange && onChange(newValue);
    props.onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return render({
    value,
    name: props.name,
    error: errors[name],
    onChange: onChangeFun,
    onBlur: props.onBlur,
  });
};

export default function CreateInvoice({
  defaultValues = {
    startDate: '',
    endDate: '',
    company: '',
    department: '',
    selectedDateMonth: new Date(),
  },
}) {
  const {
    register: registerForFilter,
    handleSubmit: handleFilterSubmit,
    getValues: getFilterValues,
    setValue: setFilterValue,
    watch: watchFilter,
    formState: { errors: filterErrors },
    control,
  } = useForm({
    defaultValues,
  });
  const navigate = useNavigate();

  const [companyOptions, setCompanyOptions] = React.useState();
  const [departmentOptions, setDepartmentOptions] = React.useState();
  const [invoice, setInvoice] = React.useState({ id: null, bills: [] });
  const [showFilter, setShowFilter] = React.useState(false);
  const [notificationState, setNotificationState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });

  React.useEffect(() => {
    const subscription = watchFilter((value, { name, type }) => {
      console.log('======== watch =======');
      console.log(value, name, type);
      if (name === 'company') {
        if (value[name] === null) {
          setFilterValue('department', '');
          setDepartmentOptions('');
        } else {
          console.log('---> Department search trigger');
          getDistinctValuesFromEmployeeCol({
            filter: { companyId: value?.company?.id },
            column: 'department',
          })
            .then((resp) => {
              setDepartmentOptions(resp.data);
              return null;
            })
            .catch((e) => {});
        }
      } else if (name === 'selectedDateMonth') {
        console.log('watch for selectedDateMonth');
        console.log(value[name]);
        setFilterDates(value[name]);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watchFilter]);

  React.useEffect(() => {
    findCompany().then((resp) => {
      setCompanyOptions(resp.data);
    });

    const date = new Date();
    console.log('------ ><>< -------');
    console.log(date.getFullYear());
    setFilterValue('selectDateMonth', date);

    setFilterDates(date);
  }, []);

  const onFilterSubmit: SubmitHandler<PacketEntryInputs> = (data) => {
    getUnsavedInvoice({
      filter: {
        startDate: data?.startDate,
        endDate: data?.endDate,
        companyId: data?.company?.id,
        department: data?.department,
      },
    }).then((resp) => {
      console.log(resp);
      if (resp.isSuccessful) {
        setInvoice(resp.data);
        if (resp?.data?.bills?.length === 0) {
          setNotificationState({
            ...notificationState,
            open: true,
            description: '',
            text: 'No pending bills found for given details',
            severity: 'warning',
          });
        }
      } else {
        setNotificationStatus(resp);
      }
    });
  };

  const setNotificationStatus = (resp) => {
    let description = '';
    let severity = '';
    console.log(resp.data);
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

  const sendSaveInvoiceRequest: SubmitHandler<PacketEntryInputs> = (data) => {
    console.log(data);
    // return;
    saveInvoice({
      filter: {
        startDate: data?.startDate,
        endDate: data?.endDate,
        companyId: data?.company?.id,
        department: data?.department,
      },
    }).then((resp) => {
      console.log('--------------- response of sendSaveInvoiceRequest');
      console.log(resp);
      setNotificationStatus(resp);

      if (resp.isSuccessful) {
        setInvoice(resp.data);
      }
    });
  };

  const setFilterDates = (date: Date) => {
    console.log('=---> setFilterDates');
    console.log(date);
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setFilterValue('startDate', startDate);
    setFilterValue('endDate', endDate);
    console.log(startDate);
    console.log(endDate);
  };

  return (
    <div>
      <Notification state={notificationState} setState={setNotificationState} />

      <Card elevation={1} sx={{ p: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <Controller
                {...{
                  control,
                  register: registerForFilter,
                  name: 'selectedDateMonth',
                  rules: {
                    required: {
                      value: true,
                      message: 'SelectedDateMonth required.',
                    },
                  },
                  render: (props) => (
                    <CustomMonthPicker label="Invoice Month" {...props} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                {...{
                  control,
                  register: registerForFilter,
                  name: 'company',
                  rules: {
                    required: {
                      value: true,
                      message: 'company required.',
                    },
                  },
                  render: (props) => (
                    <AvatarAutocomplete
                      label="company"
                      options={companyOptions}
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                {...{
                  control,
                  register: registerForFilter,
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
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={}>
              <Button
                fullWidth
                color="success"
                variant="contained"
                onClick={handleFilterSubmit(onFilterSubmit)}
              >
                <SearchIcon size={30} />
              </Button>
            </Grid>
            <Grid item xs={12} md={}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterIcon size={30} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Grow in={showFilter}>
        <Card elevation={0} sx={{ minWidth: 275, p: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Controller
                  {...{
                    control,
                    register: registerForFilter,
                    name: 'startDate',
                    rules: {
                      required: {
                        value: false,
                        message: 'start date required.',
                      },
                    },
                    render: (props) => (
                      <CustomDatePicker label="start date" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Controller
                  {...{
                    control,
                    register: registerForFilter,
                    name: 'endDate',
                    rules: {
                      required: {
                        value: false,
                        message: 'start date required.',
                      },
                    },
                    render: (props) => (
                      <CustomDatePicker label="end date" {...props} />
                    ),
                  }}
                />
              </Grid>
              {!invoice?.id && invoice?.bills?.length !== 0 && (
                <Grid item>
                  <Button
                    fullwidth
                    size="large"
                    color="success"
                    variant="contained"
                    onClick={handleFilterSubmit(sendSaveInvoiceRequest)}
                  >
                    Save this Invoice
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
      </Grow>
      <InvoiceTable invoice={invoice} />
    </div>
  );
}
