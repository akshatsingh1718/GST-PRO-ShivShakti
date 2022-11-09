import * as React from 'react';
import Chip from '@mui/material/Chip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Stack from '@mui/material/Stack';
import { stringAvatar } from 'renderer/utils/common.utils';
import Avatar from '@mui/material/Avatar';

export default function BillAvatarChip({ bill }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<ReceiptLongIcon />}
        color="primary"
        label={'Bill no: ' + bill?.id}
      />
      <Chip
        color="primary"
        avatar={<Avatar {...stringAvatar(bill?.name)} />}
        label={bill?.name}
      />
    </Stack>
  );
}
