import React, { useState } from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@/config/FirebaseConfig"; // Adjust based on your Firebase config

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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setUploading(true);
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFileUrl(url);
          setUploading(false);
          if (onFileUpload) onFileUpload(file.name, url); // Trigger callback with file name and URL
        });
      },
    );
  };

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      handleFileUpload(droppedFile);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleFileUpload(selectedFile);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setFileUrl(null);
  };

  return (
    <Container
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <Box
        sx={{
          border: "2px dashed #DFDFDF",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
        <input
          type="file"
          id="fileInput"
          accept=".pdf, .doc, .docx"
          hidden
          onChange={handleFileSelect}
        />
        <Box>
          {fileUrl ? (
            <Box>
              <Typography variant="body1">{file?.name}</Typography>
              <IconButton onClick={handleDeleteFile} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PhotoIcon fontSize="large" />
              {uploading ? (
                <Typography variant="body2">Uploading...</Typography>
              ) : null}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default DragUpload;
