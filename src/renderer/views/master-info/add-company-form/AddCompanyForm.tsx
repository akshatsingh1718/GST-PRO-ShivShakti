import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import {
  useForm,
  useFormState,
  useWatch,
} from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CompanyFormInputs } from 'renderer/utils/types.utils';
import { findCompany, createOrUpdateCompany } from 'renderer/utils/api.utils';
import {
  // Controller,
  TextAutocomplete,
  CustomTextField,
  CustomEmailField,
  CustomPhoneField,
  CustomAddressField,
} from 'renderer/components/CustomInputs';
import TextField from '@mui/material/TextField';
import Notification from 'renderer/components/Notification';
import CompanyTable from 'renderer/components/CompanyTable';
import { getStates, getStateCode } from 'renderer/utils/common.utils';
import { PlusIcon, SaveIcon } from 'renderer/utils/icons.utils';
import AppBarWidgets from 'renderer/components/AppBarWidgets';

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

const AddEmployeeForm = () => {
  const [isReloadRows, setIsReloadRows] = React.useState(true);
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });
  const defaultValues = {
    name: '',
    code: '',
    email: '',
    mobile: '',
    phone: '',
    grpName: '',
    gstin: '',
    district: '',
    state: '',
    pincode: '',
    address: '',
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { isDirty },
  } = useForm<CompanyFormInputs>({ defaultValues });

  const onCompanyFormSubmit = (data) => {
    console.log(data);
    if (!isDirty) {
      setNotificationState({
        ...notificationState,
        open: true,
        text: 'Please change company details to update.',
        severity: 'warning',
      });
      return;
    }
    createOrUpdateCompany(data)
      .then((resp) => {
        let text = '';
        let severity = 'info';
        if (resp.isSuccessful) {
          setIsReloadRows(!isReloadRows);
          text = resp.message;
          severity = 'success';
          // if were modifying the record.
          console.log(resp.data);
          if (!getValues?.('id')) {
            reset(defaultValues);
          } else {
            reset(data);
          }
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
      .catch((e) => {
        setNotificationState({
          ...notificationState,
          open: true,
          text: `${e}`,
          severity: 'error',
        });
      });
  };
  const watchState = watch('state');

  const appBarWidgets = [
    <Button
      variant="contained"
      color={isDirty ? 'success' : 'primary'}
      size="large"
      startIcon={<SaveIcon />}
      onClick={handleSubmit(onCompanyFormSubmit)}
    >
      {getValues?.('id') ? 'Update Company' : 'Save Company'}
    </Button>,
    getValues?.('id') ? (
      <Button
        startIcon={<PlusIcon />}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => reset(defaultValues)}
      >
        Add new Company
      </Button>
    ) : (
      <></>
    ),
  ];
  return (
    <>
      <Notification state={notificationState} setState={setNotificationState} />
      <AppBarWidgets childs={appBarWidgets} sx={{ mb: 1, mx: 2 }} />

      <form>
        <Card elevation={3} sx={{ minWidth: 275, m: 1, p: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'code',
                    rules: {
                      required: {
                        value: true,
                        message: 'code required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="code" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'name',
                    rules: {
                      required: {
                        value: true,
                        message: 'Name required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="Name" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'email',
                    rules: {
                      required: {
                        value: true,
                        message: 'Email required.',
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
                        message: 'invalid email address',
                      },
                    },
                    render: (props) => (
                      <CustomEmailField label="Email" {...props} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'mobile',
                    rules: {
                      required: {
                        value: true,
                        message: 'Mobile required.',
                      },
                    },
                    render: (props) => (
                      <CustomPhoneField label="mobile" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'phone',
                    rules: {
                      required: {
                        value: true,
                        message: 'phone required.',
                      },
                    },
                    render: (props) => (
                      <CustomPhoneField label="phone" {...props} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'grpName',
                    rules: {
                      required: {
                        value: true,
                        message: 'Group name required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="Group Name" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'gstin',
                    rules: {
                      required: {
                        value: true,
                        message: 'gstin required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="GSTIN" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'state',
                    rules: {
                      required: {
                        value: true,
                        message: 'state required.',
                      },
                    },
                    render: (props) => (
                      <TextAutocomplete
                        label="state"
                        options={getStates()}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'district',
                    rules: {
                      required: {
                        value: true,
                        message: 'district required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="district" {...props} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  value={getStateCode(watchState)}
                  label="State code"
                  size="small"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'pincode',
                    rules: {
                      required: {
                        value: true,
                        message: 'pincode required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField
                        label="pincode"
                        type="number"
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'address',
                    rules: {
                      required: {
                        value: true,
                        message: 'address required.',
                      },
                    },
                    render: (props) => (
                      <CustomAddressField label="address" {...props} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </form>
      <Card
        elevation={3}
        sx={{ m: 1, p: 0, minWidth: 275 }}
        style={{ height: 400 }}
      >
        <CompanyTable
          getRows={findCompany}
          setCompany={reset}
          isReloadRows={isReloadRows}
        />
      </Card>
    </>
  );
};
export default AddEmployeeForm;
