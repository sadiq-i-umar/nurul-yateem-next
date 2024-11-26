import {
  HeroImageFrame,
  LogoImageFrame,
} from '@/components/common/image-frames';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const RegisterSideInfo = () => {
  return (
    <Box sx={{ paddingX: { xs: '20px', lg: '100px' }, paddingY: '30px' }}>
      <Box sx={{ marginBottom: { xs: '0px', lg: '10px' } }}>
        <LogoImageFrame image={'/nurul_yateem_logo.png'} />
      </Box>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Box
          sx={{
            marginBottom: '35px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <HeroImageFrame image={'/hero_picture_reg.png'} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          <Typography>
            Be the change you want to see in the world – join us in transforming
            lives and making a lasting impact.{' '}
            <Link
              href='/register'
              style={{ color: '#3863FA', textDecoration: 'none' }}
            >
              Sign up now
            </Link>{' '}
            to become a beacon of hope and support our mission for a brighter
            tomorrow.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterSideInfo;
