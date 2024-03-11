import DeleteIcon from '@mui/icons-material/Delete';
import PhotoIcon from '@mui/icons-material/Photo';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React, { useState } from 'react';

const DragUpload = ({
  title,
  subtitle,
  onFileUpload
}: {
  title: string;
  subtitle: string;
  onFileUpload?: (id: string, file: any) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      onFileUpload && onFileUpload(title, file); // Pass both title and file
      setUploadedFile(true);
    }
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      onFileUpload && onFileUpload(title, file); // Pass both title and file
      setUploadedFile(true);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(false);
  };

  return (
    <Box
      sx={{
        borderRadius: '10px',
        width: "100%"
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: '400',
          pt: { xs: '.5rem', md: '.5rem' },
          textAlign: 'left'
        }}
      >
        {title}
      </Typography>
      <label
        htmlFor="fileInput"
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: '1rem',
          border: `3px dashed ${isDragging ? '#519E33' : 'lightgray'}`,
          borderRadius: '10px',
          padding: "50px 0px"
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* <PhotoIcon style={{ fontSize: 50 }} /> */}
        <Image src={"/file.svg"} width="51" height="51" alt={"File icon"} />

        <Typography
          sx={{
            fontSize: "14px",
            color: "#B4B3B3",
            marginTop: "10px"
          }}
        >
          {subtitle}
        </Typography>
      </label>

      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {uploadedFile && (
        <Box
          sx={{
            border: '1px solid lightgray',
            borderRadius: '10px',
            py: { xs: '1rem', md: '.5rem' },
            px: { xs: '0px', md: '2rem' },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: '2.5rem'
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '.5rem'
            }}
          >
            <PhotoIcon style={{ fontSize: 40 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '400',
                  pt: { xs: '.5rem', md: '.5rem' },
                  textAlign: 'left'
                }}
              >
                Logo.png
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '200',
                  pt: { xs: '.5rem', md: '.5rem' },
                  px: { xs: '0px', md: '1rem' },
                  textAlign: 'left'
                }}
              >
                2.5MB
              </Typography>
            </Box>
          </Container>
          <IconButton aria-label="delete" size="large" color="error" onClick={handleDeleteFile}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default DragUpload;
