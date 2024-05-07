import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import AlertDialog from "../../Reusable-Dialog";
import { OrphansNeedData } from "../../../utils";
import { useSession } from "next-auth/react";
import LoaderBackdrop from "../../common/loader";
import { AddSponsorshipRequestApi } from "../../../service/update-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageNameGenderIdCell } from "../../tables/cells";

const AddSponsorshipRequestSideModal: React.FC<{
  openSideModal: boolean;
  setOpenSideModal: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedOrphan: any;
}> = ({ openSideModal, setOpenSideModal, SelectedOrphan }) => {
  const { data: session } = useSession();
  const token = session?.token;
  const [orphansNeed, setOrphansNeed] = useState("");
  const [SponsorshipDecs, setSponsorshipDecs] = useState("");
  const [AmountNeeded, setAmountNeeded] = useState("");
  const [CurrentAmountGotten, setCurrentAmountGotten] = useState("");
  const [orphansNeedError, setOrphansNeedError] = useState(false);
  const [SponsorshipDecsError, setSponsorshipDecsError] = useState(false);
  const [AmountNeededError, setAmountNeededError] = useState(false);
  const [CurrentAmountGottenError, setCurrentAmountGottenError] =
    useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const orphanId = SelectedOrphan?.id;

  const formatAmount = (value: string) => {
    // Remove non-numeric characters
    let amount = value.replace(/\D/g, "");
    // Add commas for thousands, millions, etc.
    amount = amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return amount;
  };

  const mutation = useMutation({
    mutationFn: (payload: any) => AddSponsorshipRequestApi(payload, token),
    onSuccess: (data) => {
      setIsLoading(true);
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
      } else {
        toast.success("Sponsorship request added successfully");
        queryClient.invalidateQueries({ queryKey: ["orphans"] });
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Error occurred while creating the user");
      setIsLoading(false);
    },
  });

  const handleCloseSideModal = () => {
    setOpenSideModal(false);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const sendDataToParent = () => {
    let isValid = true;

    if (!orphansNeed) {
      setOrphansNeedError(true);
      isValid = false;
    }
    if (!SponsorshipDecs) {
      setSponsorshipDecsError(true);
      isValid = false;
    }
    if (!AmountNeeded) {
      setAmountNeededError(true);
      isValid = false;
    }
    if (!CurrentAmountGotten) {
      setCurrentAmountGottenError(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      setOpenDialog(true);
    }
  };

  const handleYesClick = async () => {
    // Convert strings to numbers
    const amountNeededNumber = parseInt(AmountNeeded.replace(/,/g, ""), 10);
    const currentAmountNumber = parseInt(
      CurrentAmountGotten.replace(/,/g, ""),
      10
    );

    // Assemble the data required by the backend API
    const payload = {
      guardian_id: SelectedOrphan?.guardians_id,
      orphan_id: SelectedOrphan?.id,
      need: orphansNeed,
      description: SponsorshipDecs,
      amount_needed: amountNeededNumber,
      current_amount: currentAmountNumber,
      request_status: SelectedOrphan?.account_status,
    };

    console.log(payload);

    // Check if the token is available
    if (!token) {
      return;
    }

    // Close the dialog
    setOpenDialog(false);

    // Set loading state to true
    setIsLoading(true);

    try {
      // Make the API call with the payload
      await mutation.mutateAsync(payload);

      // Close the side modal
      setOpenSideModal(false);
      setAmountNeeded("");
      setOrphansNeed("");
      setSponsorshipDecs("");
      setCurrentAmountGotten("");
    } catch (error) {
      // Show error message if API call fails
      toast.error("An error occurred. Please try again later");
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoaderBackdrop />}
      <Dialog open={openSideModal} onClose={handleCloseSideModal}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "20px",
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 1102,
            overflow: "scroll",
            height: "100vh",
            width: { sm: "621px" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              display: "flex",
              mx: "-20px",
              mt: "-20px",
              px: "20px",
              pt: "20px",
              pb: "20px",
              mb: "20px",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                Add Sponsorship Request
              </Typography>
            </Box>
            <Box
              sx={{ position: "absolute", right: 0, top: 15 }}
              onClick={handleCloseSideModal}
            >
              <Close />
            </Box>
          </Box>
          <Box sx={{ paddingY: "30px" }}>
            <Box>
              <Box sx={{ marginBottom: "30px" }}>
                <ImageNameGenderIdCell
                  image=""
                  name={`${SelectedOrphan?.first_name} ${SelectedOrphan?.last_name}`}
                  gender={SelectedOrphan?.gender}
                  id={SelectedOrphan?.unique_code}
                />
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                  <Typography>Your needs?</Typography>
                </Box>
                <Box sx={{ borderRadius: "10px" }}>
                  <Select
                    value={orphansNeed}
                    sx={{
                      borderRadius: "10px",
                      width: "100%",
                    }}
                    onChange={(e) => {
                      setOrphansNeed(e.target.value);
                      setOrphansNeedError(false);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      -- Select --
                    </MenuItem>
                    {[...OrphansNeedData].map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {orphansNeedError && (
                    <Typography component="p" color="error">
                      Your needs is a required field
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                  <Typography>Description of Sponsorship Request</Typography>
                </Box>
                <Box sx={{ borderRadius: "10px" }}>
                  <TextField
                    placeholder="Write in here..."
                    sx={{
                      width: "100%",
                      borderRadius: "50px",
                    }}
                    inputProps={{
                      sx: {
                        borderRadius: "10px",
                      },
                    }}
                    value={SponsorshipDecs}
                    onChange={(event: {
                      target: {
                        value: string;
                      };
                    }) => {
                      setSponsorshipDecs(event?.target.value);
                      setSponsorshipDecsError(false);
                    }}
                    multiline
                    rows={4}
                  />
                  {SponsorshipDecsError && (
                    <Typography component="p" color="error">
                      Request description is required
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "30px" }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>Amount Needed</Typography>
                      </Box>
                      <Box sx={{ borderRadius: "10px" }}>
                        <TextField
                          sx={{
                            width: "100%",
                            borderRadius: "50px",
                          }}
                          inputProps={{
                            sx: {
                              borderRadius: "10px",
                            },
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            type: "text",
                          }}
                          value={"₦ " + formatAmount(AmountNeeded)}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            const value = event?.target.value;
                            setAmountNeeded(formatAmount(value));
                            setAmountNeededError(false);
                          }}
                        />
                        {AmountNeededError && (
                          <Typography component="p" color="error">
                            Amount needed is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>Current Amount Gotten</Typography>
                      </Box>
                      <Box sx={{ borderRadius: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TextField
                            sx={{
                              width: "100%",
                              borderRadius: "50px",
                            }}
                            inputProps={{
                              sx: {
                                borderRadius: "10px",
                              },
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                              type: "text",
                            }}
                            value={"₦ " + formatAmount(CurrentAmountGotten)}
                            onChange={(event: {
                              target: {
                                value: string;
                              };
                            }) => {
                              const value = event?.target.value;

                              setCurrentAmountGotten(formatAmount(value));
                              setCurrentAmountGottenError(false);
                            }}
                          />
                        </Box>
                        {CurrentAmountGottenError && (
                          <Typography component="p" color="error">
                            Current Amount Gotten is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ marginBottom: "100px" }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Box>
                          <Button
                            variant="contained"
                            sx={{
                              boxShadow: "none",
                              width: "100%",
                              borderRadius: "2rem",
                              textTransform: "none",
                              paddingY: "10px",
                              paddingX: "70px",
                              background: "#000",
                              ":hover": { backgroundColor: "#000" },
                            }}
                            onClick={handleCloseSideModal}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Button
                            onClick={sendDataToParent}
                            variant="contained"
                            sx={{
                              boxShadow: "none",
                              width: "100%",
                              borderRadius: "2rem",
                              textTransform: "none",
                              paddingY: "10px",
                              paddingX: "70px",
                              backgroundColor: "#3863FA",
                              ":hover": { backgroundColor: "#3863FA" },
                            }}
                          >
                            Add
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <AlertDialog
                open={openDialog}
                onClose={handleClickClose}
                onAgree={handleYesClick}
                title={"Confirm Submission"}
                content={
                  "Before submitting your Application, Make sure to verify every data is correct."
                }
                disagreeText={" No, Cancel"}
                agreeText={"Yes, continue"}
              />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default AddSponsorshipRequestSideModal;
