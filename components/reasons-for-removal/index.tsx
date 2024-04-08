"use client";

import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  InputLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

export interface ReasonForDeleteOrphanProps {
  openDeleteReason: boolean;
  setOpenDeleteReason: (open: boolean) => void;
  SelectedOrphan: any;
}

const ReasonForDeleteOrphan: React.FC<ReasonForDeleteOrphanProps> = ({
  openDeleteReason,
  setOpenDeleteReason,
  SelectedOrphan,
}) => {
  const submitReason = () => {
    setOpenDeleteReason(false);
    console.log("Reason for delete orphan submitted", SelectedOrphan);
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
        sx={{}}
        style={{ overflow: "-moz-hidden-unscrollable" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            paddingTop: "27px",
            paddingBottom: "22px",
            paddingRight: "25px",
            paddingLeft: "25px",
            width: { xs: "auto", sm: "548px" },
            borderRadius: "18px",
          }}
        >
          <form>
            <Box
              sx={{
                marginBottom: "39px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  textAlign: "center",
                  wordWrap: "break-word",
                  width: { xs: "150px", sm: "auto" },
                }}
              >
                Reasons for Removal
              </Typography>
            </Box>

            <InputLabel sx={{ marginBottom: "14px" }}>
              Why are you removing this user?
            </InputLabel>
            <TextField
              multiline
              rows={6}
              sx={{
                width: "100%",
                marginBottom: "5px",
                fontSize: { xs: "10px", sm: "20px" },
              }}
              id="outlined-basic"
              label="Write in here..."
              variant="outlined"
              InputLabelProps={{
                sx: {
                  fontSize: { xs: "13px", sm: "16px" },
                },
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
            onClick={submitReason}
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
