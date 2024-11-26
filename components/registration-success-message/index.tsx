import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoaderBackdrop from '../common/loader';

const RegistrationSuccessMessage: React.FC = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  function handleContinueClick() {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      router.push('/login');
    }, 3000);
  }

  return (
    <>
      {showLoader && <LoaderBackdrop />}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box>
          <Image
            src={'/reg_message.svg'}
            width={103}
            height={123}
            alt={'Registration Success'}
          />
        </Box>
        <Box sx={{ marginBottom: '15px', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
            You are almost there!
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '25px' }}>
          <Box sx={{ marginBottom: { xs: '5px', sm: '0px' } }}>
            <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>
              Congratulations! 🌟 Your account has been successfully created
            </Typography>
          </Box>
          <Box sx={{ marginBottom: { xs: '5px', sm: '0px' } }}>
            <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>
              Now, let&apos;s make a positive difference together.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>
              Click below to proceed and start your journey of impact!
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            onClick={handleContinueClick}
            variant='contained'
            sx={{
              boxShadow: 'none',
              width: '100%',
              borderRadius: '30px',
              textTransform: 'none',
              paddingY: '10px',
              paddingX: '70px',
              backgroundColor: '#3863FA',
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RegistrationSuccessMessage;
