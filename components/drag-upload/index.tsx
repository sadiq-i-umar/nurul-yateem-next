import React, { useState } from 'react';
import { Box, Typography, IconButton, Container, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoIcon from '@mui/icons-material/Photo';
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@/config/FirebaseConfig'; // Adjust based on your Firebase config
import Image from 'next/image';
import { formatFileSize } from '@/utils';

const DragUpload = ({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(selectedFile.name);
      onFileChange(selectedFile);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setFileUrl(null);
    onFileChange(null);
  };

  return (
    <>
      <Container
        style={{
          marginBottom: '40px',
          padding: '50px',
          border: '2px dashed #DFDFDF',
          cursor: 'pointer',
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <Box
          sx={{
            paddingX: '20px',
            textAlign: 'center',
          }}
        >
          <input
            type='file'
            id='fileInput'
            accept='.pdf, .doc, .docx'
            hidden
            onChange={handleFileSelect}
          />
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <Image src='/doc.svg' width={40} height={40} alt='' />
              <p
                style={{ color: '#B4B3B3', fontWeight: 500, fontSize: '14px' }}
              >
                Drag and drop document
              </p>
            </Box>
          </Box>
        </Box>
      </Container>
      {fileUrl && (
        <Box
          sx={{
            display: 'flex',
            border: '1px dashed #B4B3B3',
            mb: '30px',
            mt: '-10px',
            padding: '10px',
            alignItems: 'center',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <Image src='/doc.svg' width={40} height={40} alt='' />
          </div>
          <Stack flexGrow={1} gap={0.1}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {file?.name}
            </div>
            <div style={{ fontSize: '12px' }}>
              {file?.size ? formatFileSize(file?.size) : ''}
            </div>
          </Stack>
          <div>
            <IconButton onClick={handleDeleteFile}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Box>
      )}
    </>
  );
};

export default DragUpload;
