import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({
  child,
  titleToolbar,
  open,
  setOpen,
  size = 'sm',
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={size}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ p: 0, m: 1 }}>
          <Grid
            container
            spacing={1}
            sx={{
              p: 1,
              justifyContent: 'end',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            {titleToolbar.map((child) => (
              <Grid item>{child}</Grid>
            ))}
            <Grid item>
              <Button
                startIcon={<AiOutlineArrowLeft />}
                variant="contained"
                onClick={handleClose}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ p: 0, m: 0 }}>{child}</DialogContent>
      </Dialog>
    </>
  );
}
