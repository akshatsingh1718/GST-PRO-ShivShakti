import React, { useState, useEffect } from 'react';
import UserTable from 'renderer/components/UserTable';
import Card from '@mui/material/Card';
import {
  CustomTextField,
  CustomSelect,
  CustomPasswordField,
} from 'renderer/components/CustomInputs';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
  createOrUpdateUser,
  isUsernameAvailable,
  deleteUserById,
  getUsers,
} from 'renderer/utils/api.utils';
import Notification from 'renderer/components/Notification';
import YesNoDialog from 'renderer/components/YesNoDialog';
import AppBarWidgets from 'renderer/components/AppBarWidgets';
import {
  DeleteIcon,
  PlusIcon,
  SaveIcon,
  UpdateIcon,
} from 'renderer/utils/icons.utils';

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

const UserSettings = () => {
  const defaultValues = {
    name: '',
    username: '',
    password: '',
    confirm_password: '',
    userType: '',
  };
  const [isReloadUsers, setIsReloadUsers] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { isDirty, errors },
  } = useForm<CompanyFormInputs>({ defaultValues });

  const notifyResponse = (resp) => {
    let text = '';
    let severity = 'info';
    if (resp.isSuccessful) {
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
  };

  async function onsubmit(user) {
    // check if we are updating user or not
    if (!getValues?.('id')) {
      const isAvailableResponse = await isUsernameAvailable({
        username: user?.username,
      });

      if (isAvailableResponse?.isSuccessful && !isAvailableResponse?.data) {
        setError(
          'username',
          { type: 'usernameTaken', message: 'username already taken' },
          { shouldFocus: true }
        );
        return null;
      }
    }

    if (!isDirty) {
      setNotificationState({
        ...notificationState,
        open: true,
        text: 'Please change user details to update.',
        severity: 'warning',
      });
      return null;
    }

    // if password has not been changed
    if (!user.password) {
      delete user.password;
    }
    const createUserResponse = await createOrUpdateUser({ user });
    notifyResponse(createUserResponse);
    if (createUserResponse.isSuccessful) {
      setIsReloadUsers(!isReloadUsers);
      // if were modifying the record.
      if (!getValues?.('id')) {
        reset(defaultValues);
      } else {
        reset(user);
      }
    }
  }

  async function deleteUserAndNotify() {
    const userDeleteResponse = await deleteUserById({ id: getValues?.('id') });
    notifyResponse(userDeleteResponse);
    if (userDeleteResponse.isSuccessful) {
      setIsReloadUsers(!isReloadUsers);
      reset(defaultValues);
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('======== watch =======');
      console.log(value, name, type);
      if (name === 'password' || name === 'confirm_password') {
        if (value['password'] !== value['confirm_password']) {
          setError(
            'confirm_password',
            {
              type: 'passwordNotMatching',
              message: 'password and confirm password are not same.',
            },
            { shouldFocus: true }
          );
        } else {
          clearErrors(['confirm_password']);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const appBarWidgets = [
    getValues?.('id') ? (
      <Button
        variant="contained"
        startIcon={<PlusIcon size={30} />}
        onClick={() => {
          reset(defaultValues);
        }}
      >
        Add New User
      </Button>
    ) : (
      <></>
    ),
    <Button
      variant="contained"
      color={isDirty ? 'success' : 'primary'}
      size="large"
      startIcon={getValues?.('id') ? <UpdateIcon /> : <SaveIcon />}
      onClick={handleSubmit(onsubmit)}
    >
      {getValues?.('id') ? `Update @${getValues('username')}` : 'Save user'}
    </Button>,
    getValues?.('id') ? (
      <Button
        variant="contained"
        color="error"
        onClick={() => setIsDeleteUser(true)}
      >
        <DeleteIcon size={30} />
      </Button>
    ) : (
      <></>
    ),
  ];
  return (
    <>
      <Notification state={notificationState} setState={setNotificationState} />
      <YesNoDialog
        heading={'Delete User?'}
        text={`Are you sure you want to delete "${getValues('username')}" ?`}
        onYes={deleteUserAndNotify}
        open={isDeleteUser}
        setOpen={setIsDeleteUser}
      />
      <AppBarWidgets childs={appBarWidgets} sx={{ mb: 1, mx: 2 }} />
      <form>
        <Card elevation={3} sx={{  m: 1, p: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'username',
                    rules: {
                      required: {
                        value: true,
                        message: 'username required.',
                      },
                      minLength: {
                        value: 4,
                        message: 'Username should be minimum of 4 characters.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="username" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item  xs={12} sm={6} md={2.5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'name',
                    rules: {
                      required: {
                        value: true,
                        message: 'name required.',
                      },
                      minLength: {
                        value: 4,
                        message: 'Name should be minimum of 4 characters.',
                      },
                    },
                    render: (props) => (
                      <CustomTextField label="Name" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item  xs={12} sm={6} md={2.5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'password',
                    rules: {
                      required: getValues?.('id')
                        ? false
                        : {
                            value: true,
                            message: 'password required.',
                          },
                      minLength: {
                        value: 4,
                        message: 'Password should be minimum of 4 characters.',
                      },
                    },
                    render: (props) => (
                      <CustomPasswordField label="password" {...props} />
                    ),
                  }}
                />
              </Grid>
              <Grid item  xs={12} sm={6} md={2.5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'confirm_password',
                    render: (props) => (
                      <CustomPasswordField
                        label="confirm_password"
                        {...props}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item  xs={12} sm={6} md={1.5}>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'userType',
                    rules: {
                      required: {
                        value: true,
                        message: 'Permission required.',
                      },
                    },
                    render: (props) => (
                      <CustomSelect
                        label="Permission"
                        options={[
                          { value: 'admin', label: 'Admin' },
                          { value: 'staff', label: 'staff' },
                        ]}
                        {...props}
                      />
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
        <UserTable
          getRows={() => getUsers({})}
          setUser={reset}
          isReloadRows={isReloadUsers}
        />
      </Card>
    </>
  );
};

export default UserSettings;
