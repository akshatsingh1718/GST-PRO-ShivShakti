import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const SimpleInfoCard = ({ label, text }) => {
  return (
    <Card elevation={1} sx={{ p: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography gutterBottom>{text}</Typography>
    </Card>
  );
};

export default SimpleInfoCard;
