import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function BillDisplaySkeleton() {
  return (
    <>
      <Card elevation={1} sx={{ p: 1, my: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
            <Grid item xs={7}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, mt:2 }}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Card
                elevation={3}
                sx={{ p: 0, m: 0 }}
                style={{ height: 400, width: '100%' }}
              >
                <Skeleton variant="rectangular" height={400} />
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card
                elevation={3}
                sx={{ p: 0, m: 0 }}
                style={{ height: 400, width: '100%' }}
              >
                <Skeleton variant="rectangular" height={400} />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
