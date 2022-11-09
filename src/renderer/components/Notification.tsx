import React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({state, setState}) => {
//   const [state, setState] = React.useState<State>({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//     text: '',
//     severity: 'info',
//   });
  const { vertical, horizontal, open, text,description, severity } = state;
  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      <AlertTitle>{text}</AlertTitle>
      {description}
      </Alert>
    </Snackbar>
  );
};
export default Notification;
