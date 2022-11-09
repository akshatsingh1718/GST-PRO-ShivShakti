import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getLatestMaster } from 'renderer/utils/api.utils';
import { MasterDetailsInputs } from 'renderer/utils/types.utils';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 0.5,
        m: 0.1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function MasterCardHeader({ otherDetails }) {
  const [masterDetails, setMasterDetails] = useState<MasterDetailsInputs>();

  React.useEffect(() => {
    getLatestMaster().then((resp) => {
      setMasterDetails(resp.data);
    });
  }, []);

  return (
    <Card elevation={3} sx={{ p: 1, m: 1 }} style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 0,
          m: 0,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item>{masterDetails?.name}</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 0,
          m: 0,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item>{masterDetails?.service}</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 0,
          m: 0,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item>{masterDetails?.address}</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 0,
          m: 0,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item>Mob : {masterDetails?.phone}</Item>
        <Item>Email :{masterDetails?.phone}</Item>
      </Box>
      {otherDetails?.map((row) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 0,
              m: 0,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            {row?.map((rowDetails) => {
              return (
                <Item>
                  {' '}
                  {rowDetails.label} {rowDetails.val}
                </Item>
              );
            })}
          </Box>
        );
      })}
    </Card>
  );
}
