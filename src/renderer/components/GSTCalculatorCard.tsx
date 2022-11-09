import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';

function percentage(percent, total) {
  return Number(((percent / 100) * total).toFixed(4));
}

const GSTCalculator = ({
  taxableAmount = 0,
  CGST = 9,
  SGST = 9,
  IGST = 18,
  GSTToCalculate = ['igst'],
}) => {
  // console.log('<== GSTCalculator ==>');

  const [gstToCalc, setGstToCalc] = useState(GSTToCalculate);
  const [taxableAmt, setTaxableAmt] = useState(taxableAmount);

  const [cgst, setCgst] = useState(
    GSTToCalculate.indexOf('cgst') < 0 ? 0 : CGST
  );
  const [sgst, setSgst] = useState(
    GSTToCalculate.indexOf('sgst') < 0 ? 0 : SGST
  );
  const [igst, setIgst] = useState(
    GSTToCalculate.indexOf('igst') < 0 ? 0 : IGST
  );

  // console.log(`taxableAmount ${taxableAmount}`);
  useEffect(() => {
    setTaxableAmt(taxableAmount);
    setGstToCalc(GSTToCalculate);

    // console.log('USEEFFECT GSTCalculator');
    // console.log(`gsttype: ${gstToCalc}`);

    if (GSTToCalculate.indexOf('igst') < 0) {
      // console.log('0 for igst');
      setIgst(0);
    } else {
      setIgst(IGST);
    }

    if (GSTToCalculate.indexOf('sgst') < 0) {
      setSgst(0);
      // console.log('0 for sgst');
    } else {
      setSgst(SGST);
    }

    if (GSTToCalculate.indexOf('cgst') < 0) {
      setCgst(0);
      // console.log('0 for cgst');
    } else {
      setCgst(CGST);
    }
  });

  return (
    <Card elevation={0} sx={{ m: 0, p: 0 }}>
      <CardContent sx={{ m: 0, p: 0 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ p: 1 }}>
              <Typography variant="h5" component="div" align="center">
                GST Details
              </Typography>
            </Grid>

            <Grid container spacing={2} sx={{ mx: 1 }} >
              <Grid item xs={12} sx={{ p: 0 }}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="Taxable Amount"
                  value={taxableAmt}
                  onChange={(e) => {
                    setTaxableAmt(
                      Number(parseFloat(e.target.value).toFixed(4))
                    );
                  }}
                  variant="filled"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="CGST"
                  variant="filled"
                  type="number"
                  value={cgst}
                  onChange={(e) => {
                    setCgst(parseFloat(e.target.value));
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="CGST Amount"
                  variant="filled"
                  type="number"
                  value={percentage(cgst, taxableAmt)}
                  // value={cgst}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="SGST"
                  variant="filled"
                  type="number"
                  value={sgst}
                  onChange={(e) => {
                    setSgst(parseFloat(e.target.value));
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="SGST Amount"
                  variant="filled"
                  type="number"
                  value={percentage(sgst, taxableAmt)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="IGST"
                  variant="filled"
                  type="number"
                  value={igst}
                  onChange={(e) => {
                    setIgst(parseFloat(e.target.value));
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="IGST Amount"
                  variant="filled"
                  type="number"
                  value={percentage(igst, taxableAmt)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  id="filled-basic"
                  label="Net Amount"
                  variant="filled"
                  type="number"
                  value={
                    taxableAmt +
                    percentage(cgst, taxableAmt) +
                    percentage(sgst, taxableAmt) +
                    percentage(igst, taxableAmt)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GSTCalculator;
