import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

const AppBarWidgets = ({ childs, ...props }) => {
  const theme = useTheme();

  return (
    <Card elevation={1} {...props}>
      <Grid
        container
        spacing={1}
        sx={{
          p: 1,
          justifyContent: 'center',
          bgcolor: 'background.paper',
          backgroundColor: theme.palette.info.main,
          borderRadius: 1,
        }}
      >
        {childs.map((child) => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default AppBarWidgets;
