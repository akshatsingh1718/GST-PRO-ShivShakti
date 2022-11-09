import React from 'react';

import Alert from '@mui/material/Alert';

const CustomAlert = ({ state, setState }) => {
  const { open, severity, text } = state;
  console.log(state);
  return <>{open && <Alert severity={severity}>{text}</Alert>}</>;
};
export default CustomAlert;
