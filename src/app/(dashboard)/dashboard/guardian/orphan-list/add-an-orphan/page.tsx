import React from 'react';
import AddAnOrphan from '../../../../../../../components/add-an-orphan/add-orphan';
import { Stack } from '@mui/material';

const page = () => {
  return (
    <div>
      <Stack gap={1}>
        <div>Create an Orphan Account</div>
        <div>Simply fill in the details below</div>
      </Stack>
      <AddAnOrphan />
    </div>
  );
};

export default page;
