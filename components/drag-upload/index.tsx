import React, { useState } from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoIcon from '@mui/icons-material/Photo';

const DragUpload = ({
  title,
  subtitle,
  onFileUpload,
  setGetUploadedFiles,
}: {
  title: string;
  subtitle: string;
  onFileUpload?: (id: string, file: any) => void;
  setGetUploadedFiles?: any;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  // setGetUploadedFiles(uploadedFiles);

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
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();

        reader.onload = () => {
          const url = reader.result;
          const affidavitData = { file, url };

          onFileUpload && onFileUpload(title, file); // Pass both title and file
          setUploadedFiles((prevFiles) => [...prevFiles, affidavitData]); // Store uploaded file information
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the file at the specified index
  };

  const handleFileInputChange = (e: any) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();

        reader.onload = () => {
          const url = reader.result;
          const affidavitData = { file, url };

          onFileUpload && onFileUpload(title, file);
          setUploadedFiles((prevFiles) => [...prevFiles, affidavitData]); // Store uploaded file information
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <Box
      sx={{
        borderRadius: '10px',
        width: '100%',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: '400',
          pt: { xs: '.5rem', md: '.5rem' },
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      <label
        htmlFor='fileInput'
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
          padding: '50px 0px',
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <PhotoIcon style={{ fontSize: 50 }} />

        <Typography
          sx={{
            fontSize: '14px',
            color: '#B4B3B3',
            marginTop: '10px',
          }}
        >
          {subtitle}
        </Typography>
      </label>

      <input
        id='fileInput'
        type='file'
        multiple
        accept='.jpg, .jpeg, .png, .pdf, .doc, .docx'
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {uploadedFiles.map((uploadedFile, index) => (
        <Box
          key={index}
          sx={{
            border: '1px solid lightgray',
            borderRadius: '10px',
            py: { xs: '1rem', md: '.5rem' },
            px: { xs: '0px', md: '2rem' },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: '2.5rem',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '.5rem',
            }}
          >
            <PhotoIcon style={{ fontSize: 40 }} />
            <Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '400',
                  pt: { xs: '.5rem', md: '.5rem' },
                  textAlign: 'left',
                }}
              >
                {uploadedFile.file.name}
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '200',
                  pt: { xs: '.5rem', md: '.5rem' },
                  px: { xs: '0px', md: '1rem' },
                  textAlign: 'left',
                }}
              >
                {`${(uploadedFile.file.size / 1024).toFixed(2)} KB`}
              </Typography>
            </Box>
          </Container>
          <IconButton
            aria-label='delete'
            size='large'
            color='error'
            onClick={() => handleDeleteFile(index)}
          >
            <DeleteIcon fontSize='inherit' />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default DragUpload;
