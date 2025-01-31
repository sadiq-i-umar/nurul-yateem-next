import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import HeroImage from '../../../public/Account Signup/Login/Group 8.svg';
import EmailImage from '../../../public/Account Signup/Login/Group 28.svg';

export const LogoImageFrame: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        width: '154px',
        height: '70px',
      }}
    />
  );
};

export const ImageFrameRectangular117By53: React.FC<{ image: string }> = ({
  image,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        width: '117px',
        height: '53px',
      }}
    />
  );
};

export const ImageFrame40: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        backgroundColor: '#E7E7E7',
      }}
    />
  );
};

export const ImageFrameCircular60: React.FC<{ image: string }> = ({
  image,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#E7E7E7',
      }}
    />
  );
};

export const ImageFrameCircular70: React.FC<{ image: string }> = ({
  image,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
      }}
    />
  );
};

export const ImageFrameCircular80: React.FC<{ image: string }> = ({
  image,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#E7E7E7',
      }}
    />
  );
};

export const HeroImageFrame: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        width: '421px',
        height: '492.49px',
      }}
    />
  );
};

export const HeroImageFramePlaceHolder: React.FC = () => {
  return (
    <Box
      sx={{
        width: '300px',
        height: '300px',
      }}
    >
      <img src={HeroImage.src} alt='Hero Image' />
    </Box>
  );
};
export const EmailImageFramePlaceHolder: React.FC = () => {
  return (
    <Box>
      <img src={EmailImage.src} alt='Email Image' />
    </Box>
  );
};

export const ProfileImageFrame: React.FC<{ initials: string }> = ({
  initials,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#3863FA',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '21px',
        textTransform: 'uppercase',
      }}
    >
      {initials}
    </Box>
  );
};
export const PhotoUploadFrame: React.FC<{
  image: string | { url: string };
  url?: string;
}> = ({ image }) => {
  let imageUrl: string | undefined;

  if (typeof image === 'string') {
    imageUrl = image;
  } else if (image && image.url) {
    imageUrl = image.url;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${imageUrl || '/camera.svg'})`,
        backgroundSize: imageUrl ? '100% 100%' : '30% 30%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
      }}
    ></Box>
  );
};
