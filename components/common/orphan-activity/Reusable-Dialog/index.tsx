import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Modal, Typography } from "@mui/material";

export interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onAgree?: () => void;
  title: any;
  content: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "50%" },
  bgcolor: "background.paper",
  py: 10,
  px: 4,
  borderRadius: "16px",
};

const ActivityDialog: React.FC<ActivityDialogProps> = ({
  open,
  onClose,
  onAgree,
  title,
  content,
}) => {
  const handleAgree = () => {
    if (onAgree) {
      onAgree();
    }
    onClose(); // Close the modal after triggering the agreed action
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ActivityDialog;
