import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box, { BoxProps } from '@mui/material/Box';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons';
import logo from '../../assets/brand/logo.jpeg';
import Grid from '@mui/material/Grid';
import { getSoftwareDetails } from 'renderer/utils/api.utils';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';

const Dashboard = () => {
  const [softwareDetails, setSoftwareDetails] = React.useState({ a: 10 });

  React.useEffect(() => {
    getSoftwareDetails().then((resp) => {
      console.log(resp);
      setSoftwareDetails(resp);
      Object.keys(resp).forEach((key, index) => {
        console.log(key);
      });
    });
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          p: 1,
          justifyContent: 'center',
          borderRadius: 1,
        }}
      >
        <Grid item sm={12} md={8} lg={6}>
          <Card
            elevation={0}
            sx={{
              p: 1,
              m: 1,
              width: '100%',
              borderRadius: 10,
            }}
          >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {Object.keys(softwareDetails).map((key, index) => {
                return (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={key}
                        secondary={softwareDetails[key]}
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
