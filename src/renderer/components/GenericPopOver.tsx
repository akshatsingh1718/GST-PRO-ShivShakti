import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

export default function BasicPopover({ child, text, startIcon }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        startIcon={startIcon}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {text}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button variant="contained" onClick={handleClose}>
          x
        </Button>
        {child}
      </Popover>
    </div>
  );
}
