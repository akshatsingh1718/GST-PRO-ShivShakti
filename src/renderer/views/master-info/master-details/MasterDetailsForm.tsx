import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {
  useForm,
  useWatch,
  SubmitHandler,
  useFormState,
} from 'react-hook-form';
import {
  getLatestMaster,
  createOrUpdateMaster,
  updateMasterLogo,
  getResourcePath,
} from 'renderer/utils/api.utils';
import { MasterDetailsInputs } from 'renderer/utils/types.utils';
import {
  CustomTextField,
  CustomEmailField,
  CustomPhoneField,
  CustomAddressField,
} from 'renderer/components/CustomInputs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import defaultLogo from '../../../../../assets/master/master1.logo.jpg';
import Notification from 'renderer/components/Notification';
import AppBarWidgets from 'renderer/components/AppBarWidgets';
import {
  EditIcon,
  CloseIcon,
  SaveIcon,
  ImageIcon,
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

const MasterDetailsForm = () => {
  const { register, handleSubmit, reset, control, watch } =
    useForm<MasterDetailsInputs>();
  const [logo, setLogo] = React.useState();
  const [notificationState, setNotificationState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    text: '',
    severity: 'info',
  });
  React.useEffect(() => {
    // console.log(watchBillEntry());
    const subscription = watch((value, { name, type }) => {
      console.log('======== watch =======');
      console.log(value, name, type);
      if (name === 'logo' && value?.logo?.[0]) {
        setLogo(URL.createObjectURL(value.logo[0]));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const notifiyResponse = (resp) => {
    let text = '';
    let severity = '';
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

  const onSubmit: SubmitHandler<MasterDetailsInputs> = (data) => {
    console.log('---> createOrUpdateMaster');

    console.log(data);

    console.log(data?.logo[0]?.path);
    if (data?.logo?.[0]?.path) {
      data.logo = data?.logo[0]?.path;
      updateMasterLogo({ path: data.logo }, (resp) => {
        console.log(resp);
      });
    }
    createOrUpdateMaster({ data }).then((resp) => {
      console.log(resp);
      notifiyResponse(resp);
      if (resp.isSuccessful) {
        setIsEditable(false);
      }
    });
  };

  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    getLatestMaster()
      .then((resp) => {
        reset(resp.data);
        setLogo(defaultLogo);
      })
      .catch((e) => console.log(e));
  }, [isEditable]);

  const appBarWidgets = [
    <Button
      sx={{ mx: 0 }}
      startIcon={!isEditable ? <EditIcon /> : <CloseIcon />}
      variant="contained"
      color={!isEditable ? 'primary' : 'primary'}
      onClick={() => setIsEditable(!isEditable)}
    >
      {!isEditable ? 'Edit Master Details' : 'Cancel'}
    </Button>,
    isEditable ? (
      <Button
        sx={{ mx: 0 }}
        startIcon={<SaveIcon />}
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    ) : (
      <></>
    ),
    isEditable ? (
      <label htmlFor="master-logo-file">
        <Button
          startIcon={<ImageIcon />}
          fullWidth
          color="primary"
          variant="contained"
          component="span"
        >
          Change company Logo
        </Button>
      </label>
    ) : (
      <></>
    ),
  ];
  return (
    <>
      <Notification state={notificationState} setState={setNotificationState} />
      <AppBarWidgets childs={appBarWidgets} sx={{ mb: 1, mx: 2 }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 275, px: 2, py: 1 }}>
          <Grid
            container
            spacing={1}
            sx={{
              p: 1,
              justifyContent: 'center',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={logo ?? defaultLogo}
                  alt="master logo"
                />

                <input
                  style={{ display: 'none' }}
                  accept="image/*"
                  type="file"
                  {...register('logo')}
                  id="master-logo-file"
                />
              </CardActionArea>
            </Card>
          </Grid>

          <Grid container spacing={3}>
            <Grid item sm={12} md={12}>
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
                  },
                  render: (props) => (
                    <CustomTextField
                      label="name"
                      readOnly={!isEditable}
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
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
                    <CustomPhoneField
                      readOnly={!isEditable}
                      label="phone"
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Controller
                {...{
                  control,
                  register,
                  name: 'email',
                  rules: {
                    required: {
                      value: true,
                      message: 'email required.',
                    },
                  },
                  render: (props) => (
                    <CustomEmailField
                      readOnly={!isEditable}
                      label="email"
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
                  name: 'service',
                  rules: {
                    required: {
                      value: true,
                      message: 'service required.',
                    },
                  },
                  render: (props) => (
                    <CustomTextField
                      readOnly={!isEditable}
                      label="service"
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
                    <CustomAddressField
                      readOnly={!isEditable}
                      label="address"
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
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
                    <CustomTextField
                      readOnly={!isEditable}
                      label="gstin"
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Controller
                {...{
                  control,
                  register,
                  name: 'panNo',
                  rules: {
                    required: {
                      value: true,
                      message: 'panNo required.',
                    },
                  },
                  render: (props) => (
                    <CustomTextField
                      readOnly={!isEditable}
                      label="panNo"
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Controller
                {...{
                  control,
                  register,
                  name: 'ceo',
                  rules: {
                    required: {
                      value: true,
                      message: 'ceo required.',
                    },
                  },
                  render: (props) => (
                    <CustomTextField
                      readOnly={!isEditable}
                      label="ceo"
                      {...props}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </form>
    </>
  );
};

export default MasterDetailsForm;
