'use client';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const AddOrphanSuccessModal: FC<{ open: boolean }> = ({ open }) => {
  const router = useRouter();
  function handleContinueClick() {
    router.push('/login');
  }
  return (
    <Dialog open={open}>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px',
          }}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddOrphanSuccessModal;
