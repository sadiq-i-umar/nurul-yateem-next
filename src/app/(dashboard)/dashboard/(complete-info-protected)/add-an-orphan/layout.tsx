'use client';
// import { useScrollToTop } from "@/app/(dashboard)/hooks/use-scroll-to-top";
import { Box, Typography, Grid } from '@mui/material';
import { SessionProvider, useSession } from 'next-auth/react';
import {
  LogoImageFrame,
  ProfileImageFrame,
} from '../../../../../../components/common/image-frames';
import { useScrollToTop } from '../../../hooks/use-scroll-to-top';

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();
  const { data: session } = useSession();
  const token = session?.token;
  const firstName = session?.user?.profile.firstName;
  const lastName = session?.user?.profile.lastName;

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          paddingTop: '30px',
          paddingBottom: '20px',
          paddingX: { xs: '10px', sm: '40px', md: '80px' },
          alignItems: 'center',
          borderBottom: '1px solid #DFDFDF',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box>
          <LogoImageFrame image={'/nurul_yateem_logo.png'} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            // ...(showSuccessMessage ? { display: "none" } : { display: "flex" }),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginX: '30px',
            marginTop: { xs: '20px', sm: '0px' },
          }}
        >
          <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
            <Typography
              variant='h1'
              sx={{ fontSize: '20px', display: { xs: 'block', sm: 'none' } }}
            >
              Add an Orphan Account
            </Typography>
            <Typography
              variant='h1'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Add an Orphan Account
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              marginBottom: { xs: '10px', sm: 'none' },
            }}
          >
            <Typography
              sx={{ color: '#8D8B90', display: { xs: 'none', sm: 'block' } }}
            >
              Orphans are vulnerable groups that need intervention
            </Typography>
            <Typography
              sx={{
                color: '#8D8B90',
                fontSize: '14px',
                display: { xs: 'block', sm: 'none' },
              }}
            >
              Orphans are vulnerable groups that needs an intervention
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ marginRight: '15px' }}>
            <Typography style={{ textTransform: 'capitalize' }}>
              {`Welcome ${firstName} ${lastName}`}
            </Typography>
          </Box>
          <Box>
            <ProfileImageFrame
              initials={`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
            />
          </Box>
        </Box>
      </Box>
      <Grid
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'fixed',
          height: '100vh',
          borderRight: '1px solid #DFDFDF',
        }}
        item
        xs={0.5}
        sm={1}
        md={2}
        lg={3}
      >
        <Box
          sx={{
            paddingTop: '0px',
            paddingBottom: '25px',
            borderLeft: '3px solid #E9F3E6',
            marginLeft: { xs: '20px', md: '90px' },
            marginRight: '30px',
            marginY: '30px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              marginLeft: '-7.5px',
            }}
          >
            <Box sx={{ marginRight: '15px' }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                }}
              />
            </Box>
            <Box sx={{ marginRight: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '15px',
                  borderRadius: '50%',
                  bgcolor: '#E9F3E6',
                  fill: '#268600',
                }}
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9Z' />
                </svg>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Orphan Details
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#8D8B90' }}>
                  Add an Orphan Profile
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      {children}
    </main>
  );
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;
