
import { Box, Typography } from '@mui/material';
import { ImageFrame40 } from '../../common/image-frames';

export const ImageNameEmailCell: React.FC<{
  image: string;
  name: string;
  email: string;
}> = ({ image, name, email }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: '12px' }}>
        <ImageFrame40 image={image} />
      </Box>
      <Box sx={{ mr: '20px' }}>
        <Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'black',
              mb: { xs: '5px', sm: '0px' },
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: '12px', color: '#908E8F', fontWeight: 500 }}
          >
            {email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ImageAndNameCell: React.FC<{ image: string; role: string }> = ({
  image,
  role,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: '12px' }}>
        <ImageFrame40 image={image} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: '600', color: '#101828' }}>
          {role}
        </Typography>
      </Box>
    </Box>
  );
};
