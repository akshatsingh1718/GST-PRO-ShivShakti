import React from 'react';
import { useState, useEffect } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {
  useForm,
  SubmitHandler,
  useFormState,
  useWatch,
} from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { EmployeeFormInputs } from 'renderer/utils/types.utils';
import {
  getEmployee,
  EmployeeFormInputs,
  findCompany,
  createOrUpdateEmp,
  fakeResp,
} from 'renderer/utils/api.utils';
import {
  // Controller,
  TextAutocomplete,
  AvatarAutocomplete,
  CustomTextField,
  CustomSelect,
  CustomEmailField,
  CustomPhoneField,
  CustomAddressField,
} from 'renderer/components/CustomInputs';
import Notification from 'renderer/components/Notification';
import EmployeeTable from 'renderer/components/EmployeeTable';
import { CompanyAutocomplete } from 'renderer/components/CustomInputs';
import { getStates, getStateCode } from 'renderer/utils/common.utils';
import AppBarWidgets from 'renderer/components/AppBarWidgets';
import { AddEmpIcon, EmpIcon } from 'renderer/utils/icons.utils';

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
  const [companyOptions, setCompanyOptions] = React.useState();
  const [employeeOptions, setEmployeeOptions] = React.useState();
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });
  const defaultValues = {
    company: '',
    name: '',
    grpName: '',
    empCode: '',
    email: '',
    mobile: '',
    phone: '',
    designation: '',
    department: '',
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
    formState: { isDirty },
  } = useForm<EmployeeFormInputs>({ defaultValues });

  React.useEffect(() => {
    findCompany({}).then((resp) => {
      console.log(resp.data);
      setCompanyOptions(resp.data);
    });
  }, []);

  const onAddEmployeeFormSubmit = (data) => {
    console.log(data);
    if (!isDirty) {
      setNotificationState({
        ...notificationState,
        open: true,
        text: 'Please change employee details to update.',
        severity: 'warning',
      });
      return;
    }
    createOrUpdateEmp({ ...data, companyId: data.company.id })
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
  const appBarWidgets = [
    <Button
      variant="contained"
      color={isDirty ? 'success' : 'primary'}
      onClick={handleSubmit(onAddEmployeeFormSubmit)}
      startIcon={<EmpIcon size={25} />}
    >
      {getValues?.('id') ? 'Update Employee' : 'Save Employee'}
    </Button>,
    getValues?.('id') ? (
      <Button
        variant="contained"
        startIcon={<AddEmpIcon size={25} />}
        onClick={() => {
          reset(defaultValues);
        }}
      >
        Add New Employee
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
              <Grid item sm={12} md={5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'company',
                    rules: {
                      required: {
                        value: true,
                        message: 'Select a company',
                      },
                    },
                    render: (props) => (
                      <CompanyAutocomplete
                        readOnly={false}
                        label="company"
                        options={companyOptions}
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12} md={4}>
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
              <Grid item sm={12} md={3}>
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
              <Grid item sm={12} md={2}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'empCode',
                    rules: {
                      required: {
                        value: true,
                        message: 'Employee code required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="Employee code" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12} md={4}>
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

              <Grid item sm={12} md={3}>
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
              <Grid item sm={12} md={3}>
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

              <Grid item sm={12} md={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'designation',
                    rules: {
                      required: {
                        value: true,
                        message: 'designation required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="designation" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12} md={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'department',
                    rules: {
                      required: {
                        value: true,
                        message: 'department required.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="department" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12} md={2}>
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
              <Grid item sm={12} md={2}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'state',
                    rules: {
                      required: {
                        value: true,
                        message: 'Please choose state.',
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
              <Grid item sm={12} md={2}>
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
              <Grid item sm={12} md={12}>
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
        <EmployeeTable
          getRows={getEmployee}
          setEmployee={reset}
          isReloadRows={isReloadRows}
        />
      </Card>
    </>
  );
};
export default AddEmployeeForm;
