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
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
  ...theme.typography.body2,
  padding: theme.spacing(2),
}));

export function EmployeeCard({ employee, props }) {
  return (
    <Box {...props} sx={{ m: 0, p: 0, width: '100%' }}>
      <StyledPaper elevation={0} sx={{ width: '100%', m: 0, p: 1 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar {...stringAvatar(employee?.name)} alt={employee?.name} />
          </Grid>
          <Grid item xs>
            <Typography>{employee.name}</Typography>
            <Typography variant="body2" gutterBottom color="text.secondary">
              {employee.address}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}

export function CompanyCard({ company, props }) {
  return (
    <Box {...props} sx={{ m: 0, p: 0, width: '100%' }}>
      <StyledPaper elevation={0} sx={{ width: '100%', m: 0, p: 1 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar {...stringAvatar(company?.name)} alt={company?.name} />
          </Grid>
          <Grid item xs>
            <Typography>{company.name}</Typography>
            <Typography variant="body2" gutterBottom color="text.secondary">
              {company.address}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}

export function CustomAvatarCard({ name }) {
  return (
    <ListItem key={name}>
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
        <PersonIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={name} />
  </ListItem>
  );
}
