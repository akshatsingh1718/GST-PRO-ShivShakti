import React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GSTCalculator from 'renderer/components/GSTCalculatorCard';
import EntriesTable from 'renderer/components/EntriesTable';
import Alert from '@mui/material/Alert';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { CompanyCard, EmployeeCard } from 'renderer/components/CustomCards';
import Typography from '@mui/material/Typography';
import SimpleInfoCard from 'renderer/components/SimpleInfoCard';
import { BillIcon } from 'renderer/utils/icons.utils';

const BillDisplay = ({ bill }) => {
  const getEntriesTotalAmt = () => {
    return bill.entries.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.amount);
    }, 0);
  };

  return (
    <Card elevation={1} sx={{ p: 1, my: 1 }}>
      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SimpleInfoCard
              label="Bill date"
              text={bill.createdAt.toISOString().slice(0, 10)}
            />
          </Grid>
          <Grid item xs={2.5}>
            <Card elevation={1} sx={{ p: 1, my: 1 }}>
              <BillIcon size={25} /> Bill No : {bill.id}
            </Card>
          </Grid>
          <Grid item>
            {bill.invoiceId && (
              <SimpleInfoCard
                label="Connected Invoice no"
                text={bill.invoiceId}
              />
            )}
            {!bill.invoiceId && (
              <Alert severity="info">Invoice not generated for this bill</Alert>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Card elevation={1} sx={{ p: 1 }}>
              <CompanyCard company={bill.employee.company} />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={1} sx={{ p: 1 }}>
              <EmployeeCard employee={bill.employee} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <SimpleInfoCard label="group" text={bill.employee.grpName} />
          </Grid>
          <Grid item xs={3}>
            <SimpleInfoCard
              label="department"
              text={bill.employee.department}
            />
          </Grid>

          <Grid item xs={2}>
            <SimpleInfoCard label="gsttype" text={bill.gstType} />
          </Grid>
          <Grid item xs={7}>
            <SimpleInfoCard
              label="company address"
              text={bill.company.address}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Card
              elevation={3}
              sx={{ p: 0, m: 0 }}
              style={{ height: 400, width: '100%' }}
            >
              <EntriesTable getRows={bill?.entries} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              elevation={3}
              sx={{ p: 0, m: 0 }}
              style={{ height: 400, width: '100%' }}
            >
              <GSTCalculator
                GSTToCalculate={bill.gstType}
                taxableAmount={getEntriesTotalAmt}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default BillDisplay;
