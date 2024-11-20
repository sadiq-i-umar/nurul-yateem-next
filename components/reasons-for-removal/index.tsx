"use client";

import { Box, Button, Dialog, DialogActions, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import toast from "react-hot-toast";

export interface ReasonForDeleteOrphanProps {
  openDeleteReason: boolean;
  setOpenDeleteReason: (open: boolean) => void;
  SelectedOrphan: any;
  onDelete: (reason: string, orphan: any) => void; 
}

const ReasonForDeleteOrphan: React.FC<ReasonForDeleteOrphanProps> = ({
  openDeleteReason,
  setOpenDeleteReason,
  SelectedOrphan,
  onDelete,
}) => {
  const [reason, setReason] = useState(""); 

  const handleDelete = () => {
    if (!reason.trim()) {
      toast("Please provide a reason for removal.");
      return;
    }
    console.log("Reason for deletion:", reason);
  console.log("Selected Orphan:", SelectedOrphan);
    onDelete(reason, SelectedOrphan); 
    setOpenDeleteReason(false);
  };

  const ButtonOne = styled(Button)({
    textTransform: "none",
    paddingY: "12px",
    paddingX: "20px",
    width: "128px",
    height: "48px",
    bgcolor: "##005C1D",
  });

  return (
    <>
      <Dialog
        open={openDeleteReason}
        onClose={() => setOpenDeleteReason(false)}
        style={{ overflow: "-moz-hidden-unscrollable" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            padding: "27px 25px",
            width: { xs: "auto", sm: "548px" },
            borderRadius: "18px",
          }}
        >
          <form>
            <Box sx={{ marginBottom: "39px", textAlign: "center", position: "relative" }}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  wordWrap: "break-word",
                  width: { xs: "150px", sm: "auto" },
                }}
              >
                Reasons for Removal
              </Typography>
            </Box>

            <InputLabel sx={{ marginBottom: "14px" }}>Why are you removing this user?</InputLabel>
            <TextField
              multiline
              rows={6}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{
                width: "100%",
                marginBottom: "5px",
                fontSize: { xs: "10px", sm: "20px" },
              }}
              id="outlined-basic"
              label="Write in here..."
              variant="outlined"
              InputLabelProps={{
                sx: { fontSize: { xs: "13px", sm: "16px" } },
              }}
            />
          </form>
        </Box>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteReason(false)}
            sx={{
              borderRadius: "1rem",
              textTransform: "capitalize",
              backgroundColor: "black",
              color: "white",
              px: "20px",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            autoFocus
            sx={{
              borderRadius: "1rem",
              textTransform: "capitalize",
              backgroundColor: "#4F46E5",
              color: "white",
              px: "20px",
              "&:hover": {
                backgroundColor: "#4F46E5",
              },
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReasonForDeleteOrphan;
