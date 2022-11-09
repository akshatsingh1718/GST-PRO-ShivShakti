import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import {
  useForm,
  SubmitHandler,
  useFormState,
  useWatch,
} from 'react-hook-form';
import {
  CustomSelect,
  CustomPasswordField,
} from 'renderer/components/CustomInputs';
import CustomAlert from 'renderer/components/CustomAlert';
import { useDispatch } from 'react-redux';
import { login } from 'renderer/features/userSlice';
import { LoginFormInputs, LoginModelType } from 'renderer/utils/types.utils';
import {
  updateUserLastLogin,
  resizeWindow,
  getSoftwareDetails,
  authenticateUser,
  getUsers,
} from 'renderer/utils/api.utils';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import logo from '../../../../../assets/logo.png';

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

const useStyles = {
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    color: 'black',
  },
};

const Login = () => {
  const { register, handleSubmit, control, reset, watch } =
    useForm<LoginFormInputs>();
  const wathcUsername = watch('username');
  const [userOptions, setUserOptions] = React.useState<Array<LoginModelType>>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [softwareDetails, setSoftwareDetails] = React.useState();

  React.useEffect(() => {
    getSoftwareDetails().then((resp) => {
      console.log(resp);
      setSoftwareDetails(resp);
      Object.keys(resp).forEach((key, index) => {
        console.log(key);
      });
    });
  }, []);

  const [alertState, setAlertState] = React.useState<State>({
    open: false,
    severity: 'info',
    text: '',
  });

  React.useEffect(() => {
    resizeWindow({ width: 900, height: 385 });
    getUsers().then((resp) => {
      if (resp.isSuccessful) {
        setUserOptions(resp.data);
      } else {
      }
    });
  }, []);

  async function onSubmit(data: LoginFormInputs) {
    console.log(data);
    const resp = await authenticateUser({ data });
    console.log('-------------------');
    console.log(resp);
    if (resp.isSuccessful) {
      updateUserLastLogin({ id: resp?.data?.id });
      dispatch(login(resp.data));
      resizeWindow({ width: 1024, height: 728 });
      navigate('/');
    } else {
      setAlertState({
        open: true,
        severity: 'error',
        text: resp.message,
      });
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid container item xs={12} md={6}>
        <Card sx={useStyles.card} elevation={0}>
          <CardContent className="text-center" sx={{ p: 4 }}>
            <h1>
              <b>Login</b>
            </h1>
            <b>Sign In to your account</b>
            <CustomAlert state={alertState} setState={setAlertState} />

            <CInputGroup className="my-3">
              <Controller
                {...{
                  control,
                  register,
                  name: 'username',
                  rules: {
                    required: {
                      value: true,
                      message: 'Please select user.',
                    },
                  },

                  render: (props) => (
                    <CustomSelect
                      label="Choose User"
                      options={userOptions?.map((user) => {
                        return {
                          label: user.username,
                          value: user.username,
                        };
                      })}
                      {...props}
                    />
                  ),
                }}
              />
            </CInputGroup>

            <CInputGroup className="mb-4">
              <Controller
                {...{
                  control,
                  register,

                  name: 'password',
                  rules: {
                    required: {
                      value: true,
                      message: 'Please enter password',
                    },
                  },
                  render: (props) => (
                    <CustomPasswordField label="Password" {...props} />
                  ),
                }}
              />
            </CInputGroup>

            <CRow>
              <CCol xs={6}>
                <Button
                  color="error"
                  variant="contained"
                  className="px-4"
                  onClick={handleSubmit(onSubmit)}
                >
                  Login
                </Button>
              </CCol>
              <CCol xs={6} className="text-right">
                <Button color="error" className="px-0">
                  Forgot password?
                </Button>
              </CCol>
            </CRow>
          </CardContent>
        </Card>
      </Grid>
      <Grid container item xs={12} md={6}>
        <Card className="text-center" sx={useStyles.card} elevation={0}>
          <CardContent>
            <img src={logo} />
            <h2>by {softwareDetails?.company}</h2>
            <p>{softwareDetails?.loginSlogan}</p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
