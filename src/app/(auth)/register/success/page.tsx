'use client';
import RegisterSideInfo from '@/components/auth/side-info/register';
import RegistrationSuccessMessage from '@/components/registration-success-message';
import { Grid } from '@mui/material';

export default function RegisterSuccess() {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          position: { xs: 'static', lg: 'fixed' },
          backgroundColor: '#F5F5F5',
          height: { xs: 'auto', lg: '100vh' },
        }}
      >
        <RegisterSideInfo />
      </Grid>
      <Grid container xs={12} lg={12}>
        <Grid item lg={6}></Grid>
        <Grid
          className='min-h-screen flex flex-col justify-center'
          item
          xs={12}
          lg={6}
        >
          <div style={{ marginTop: '-130px' }}>
            <RegistrationSuccessMessage />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
