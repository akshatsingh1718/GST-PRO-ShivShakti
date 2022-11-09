import React from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { stringAvatar } from 'renderer/utils/common.utils';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { EmployeeCard, CompanyCard } from 'renderer/components/CustomCards';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import avatar8 from 'renderer/assets/images/avatars/8.jpg';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';

export const Controller = ({
  control,
  register,
  name,
  rules,
  render,
  onChange,
}) => {
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

export const CustomDatePicker = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={(e) => {
            setValue(e);
            props.onChange && props.onChange(e);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={props?.error}
              helperText={props?.error?.message}
              label={props?.label}
              size="small"
              variant="filled"
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export const CustomMonthPicker = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="MM/yyyy"
          views={['month']}
          value={value}
          onChange={(e) => {
            setValue(e);
            props.onChange && props.onChange(e);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={props?.error}
              helperText={props?.error?.message}
              label={props?.label}
              size="small"
              variant="filled"
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export const TextAutocomplete = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  React.useEffect(() => {
    console.log('options changed ' + props.name + props.options);
    // setValue('');
  }, [props.options]);

  return (
    <>
      <Autocomplete
        name={props.name}
        onChange={(e, newValue) => {
          setValue(newValue);
          props.onChange && props.onChange(newValue);
        }}
        readOnly={props.readOnly || false}
        value={value}
        options={
          !props.options ? [{ label: 'Loading...', id: 0 }] : props.options
        }
        renderInput={(params) => (
          <TextField
            {...params}
            error={props?.error}
            helperText={props?.error?.message}
            label={props?.label}
            size="small"
            variant="filled"
          />
        )}
      />
    </>
  );
};

export const AvatarAutocomplete = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
    console.log('value changed for:' + props.name + ', to =' + props.value);
    // alert(`${props.value}`);
  }, [props.value]);

  React.useEffect(() => {
    console.log('options changed for:' + props.name + ', to=' + props.options);
    // setValue('');
  }, [props.options]);

  return (
    <>
      <Autocomplete
        readOnly={props.readOnly || false}
        name={props.name}
        onChange={(e, newValue) => {
          setValue(newValue);
          props.onChange && props.onChange(newValue);
        }}
        value={value}
        options={
          !props.options ? [{ name: 'Loading....', id: 0 }] : props.options
        }
        getOptionLabel={(option) => option?.name || ''}
        isOptionEqualToValue={(option, values) => option?.id === values?.id}
        renderOption={(props, option) => (
          <ListItem alignItems="flex-start" {...props}>
            <ListItemAvatar>
              <Avatar {...stringAvatar(option?.name)} alt={option?.name} />
            </ListItemAvatar>
            <ListItemText
              primary={option.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {option?.address}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            error={props?.error}
            helperText={props?.error?.message}
            label={props?.label}
            size="small"
            variant="filled"
          />
        )}
      />
    </>
  );
};

export const EmployeeAutocomplete = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Autocomplete
        readOnly={props.readOnly || false}
        name={props.name}
        onChange={(e, newValue) => {
          setValue(newValue);
          props.onChange && props.onChange(newValue);
        }}
        value={value}
        options={props.options || []}
        getOptionLabel={(option) => option?.name || ''}
        isOptionEqualToValue={(option, values) => option?.id === values?.id}
        renderOption={(props, option) => (
          <EmployeeCard props={props} employee={option} />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            error={props?.error}
            helperText={props?.error?.message}
            label={props?.label}
            size="small"
            variant="filled"
          />
        )}
      />
    </>
  );
};

export const CompanyAutocomplete = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Autocomplete
        fullWidth
        readOnly={props.readOnly || false}
        name={props.name}
        onChange={(e, newValue) => {
          setValue(newValue);
          props.onChange && props.onChange(newValue);
        }}
        value={value}
        options={props.options || []}
        getOptionLabel={(option) => option?.name || ''}
        isOptionEqualToValue={(option, values) => option?.id === values?.id}
        renderOption={(props, option) => (
          <CompanyCard props={props} company={option} />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            error={props?.error}
            helperText={props?.error?.message}
            label={props?.label}
            size="small"
            variant="filled"
          />
        )}
      />
    </>
  );
};

export const CustomSelect = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <FormControl fullWidth variant="filled" size="small" error={props?.error}>
      <InputLabel id="demo-simple-select-label">{props?.label}</InputLabel>
      <Select
        value={value}
        name={props.name}
        readOnly={props.readOnly || false}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
      >
        {props?.options?.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{props?.error?.message}</FormHelperText>
    </FormControl>
  );
};

export const CustomTextField = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  console.log('--> CustomTextField');
  console.log(props?.readOnly);
  return (
    <>
      <TextField
        {...props}
        fullWidth
        type={props?.type}
        inputProps={{ readOnly: props.readOnly || false }}
        name={props.name}
        value={value}
        label={props?.label}
        size="small"
        variant="filled"
        error={props?.error}
        helperText={props?.error?.message}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
      />
    </>
  );
};

export const CustomEmailField = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  console.log('--> CustomEmailField');
  console.log(props?.readOnly);
  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiOutlineMail size={25} />
            </InputAdornment>
          ),
        }}
        type={props?.type}
        inputProps={{ readOnly: props.readOnly || false }}
        name={props.name}
        value={value}
        label={props?.label}
        size="small"
        variant="filled"
        error={props?.error}
        helperText={props?.error?.message}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
      />
    </>
  );
};

export const CustomCurrencyField = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  console.log('--> CustomEmailField');
  console.log(props?.readOnly);
  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        type={props?.type}
        inputProps={{ readOnly: props.readOnly || false }}
        name={props.name}
        value={value}
        label={props?.label}
        size="small"
        variant="filled"
        error={props?.error}
        helperText={props?.error?.message}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
      />
    </>
  );
};

export const CustomPhoneField = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  console.log('--> CustomEmailField');
  console.log(props?.readOnly);
  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiOutlinePhone size={25} />
            </InputAdornment>
          ),
        }}
        type={props?.type}
        inputProps={{ readOnly: props.readOnly || false }}
        name={props.name}
        value={value}
        label={props?.label}
        size="small"
        variant="filled"
        error={props?.error}
        helperText={props?.error?.message}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
      />
    </>
  );
};

export const CustomAddressField = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  console.log('--> CustomPhoneField');
  console.log(props?.readOnly);
  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiOutlineHome size={25} />
            </InputAdornment>
          ),
        }}
        type={props?.type}
        inputProps={{ readOnly: props.readOnly || false }}
        name={props.name}
        value={value}
        label={props?.label}
        size="small"
        variant="filled"
        error={props?.error}
        helperText={props?.error?.message}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
      />
    </>
  );
};

export const CustomPasswordField = (props) => {
  const [value, setValue] = React.useState(props.value || '');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <FormControl error={props?.error} fullWidth size="small" variant="filled">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <FilledInput
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        readOnly={props.readOnly || false}
        name={props.name}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id="component-error-text">
        {props?.error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export const CustomImageField = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Input
        style={{ display: 'none' }}
        fullWidth
        id="contained-button-file"
        accept="image/*"
        type="file"
        name={props.name}
        value={value}
        label={props?.label}
        size="small"
        variant="filled"
        onChange={(e) => {
          setValue(e.target.value);
          console.log(e.target.value);
          console.log(e);
          props.onChange && props.onChange(e);
        }}
      />

      <label htmlFor="contained-button-file">
        <Button fullWidth color="primary" variant="contained" component="span">
          Upload Company Logo
        </Button>
      </label>
    </>
  );
};
