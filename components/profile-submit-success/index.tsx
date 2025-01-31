import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfileSubmitSuccess: React.FC = () => {
  const router = useRouter();

  const handleContinueClick = () => {
    router.push('/dashboard/add-an-orphan');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: '20px',
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
        <Typography
          sx={{ fontSize: '30px', fontWeight: 'bold', color: '#3863FA' }}
        >
          Your Profile has been submitted Successfully
        </Typography>
      </Box>
      <Box sx={{ marginBottom: { xs: '20px', sm: '40px' } }}>
        <Box
          sx={{
            marginBottom: { xs: '5px', sm: '0px' },
            width: { xs: '100%', sm: '550px' },
          }}
        >
          <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>
            Meanwhile, check your email if your account has been approved by the
            admin, so you can get access to your dashboard.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Proceed to</span>{' '}
          <span
            style={{ cursor: 'pointer', color: '#3863FA' }}
            onClick={handleContinueClick}
          >
            Add an Orphan Account
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileSubmitSuccess;
