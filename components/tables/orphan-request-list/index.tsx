import { Box, Button, Checkbox, Popover, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PillWithDot } from "../../pills";
import { ImageNameEmailCell } from "../cells";
import { MoreVert } from "@mui/icons-material";
import ViewOrphanDetailsSideModal from "../../side-modals/view-orphan-details";
import AlertDialog from "../../Reusable-Dialog";
import ReasonForDeleteOrphan from "../../reasons-for-removal";
import EditOrphanSideModal from "../../side-modals/edit-orphan-details/side-modal";
import AddSponsorshipRequestSideModal from "../../side-modals/add-sponsorship-request";
import { deleteOrphanRequest } from "@/src/app/api/service/orphan-list";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const OrphanRequestListTable: React.FC<{
  orphanData: any[];
}> = ({ orphanData }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [openViewDetailsModal, setOpenViewDetailsModal] = React.useState(false);
  const [SelectedOrphan, setSelectedOrphan] = React.useState<any>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteReason, setOpenDeleteReason] = React.useState(false);
  const [openEditSideModal, setEditOpenSideModal] = React.useState(false);
  const [openSponsorshipSideModal, setOpenSponsorshipSideModal] =
    React.useState(false);

  const handleOpenDelete = (data: any) => {
    setSelectedOrphan(data);
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = () => {
    setOpenDialog(false);
    setOpenDeleteReason(true);
  };

  const handleEdit = (data: any) => {
    setEditOpenSideModal(true);
    setSelectedOrphan(data);
  };
  const handleView = (data: any) => {
    setOpenViewDetailsModal(true);
    setSelectedOrphan(data);
  };

  const handleOpenPopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrphan(data);
  };

  const handleSponsorshipRequest = () => {
    setOpenSponsorshipSideModal(true);
    setAnchorEl(null);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data: session } = useSession();
  const token = session?.user?.token?.accessToken ?? " ";


  const handleDeleteOrphan = async (reason: string, orphan: any) => {
    const payload = {
      orphanId: orphan, 
      deletionReason : reason
    }

    try {
    const response = await deleteOrphanRequest(payload, token); // Pass token here
      console.log(response);
      if (response) {
        toast("Orphan deleted successfully.");
        // Optionally: Remove orphan from orphanData state
      } else {
        toast("Failed to delete orphan.");
      }
    } catch (error) {
      console.error("Error deleting orphan:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <TableContainer sx={{ backgroundColor: "white" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "14px", color: "#667085" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: "-13px",
                    ml: "-15px",
                  }}
                >
                  <Box sx={{ marginLeft: "20px" }}>
                    <Checkbox />
                  </Box>
                  <Box>Name of orphan</Box>
                </Box>
              </TableCell>
              {[
                "Date of Birth",
                "School Status",
                "Status of Origin",
                "Needs",
                "Status",
                "",
              ].map((heading, index) => (
                <TableCell
                  key={index}
                  sx={{ fontSize: "14px", color: "#667085" }}
                  align="left"
                >
                  <Box sx={{ mb: "-13px" }}>{heading}</Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orphanData?.map((orphan) => (
              <TableRow
                key={`${orphan?.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{ display: "flex", alignItems: "center", ml: "-15px" }}
                  >
                    <Box sx={{ marginLeft: "20px" }}>
                      <Checkbox />
                    </Box>
                    <ImageNameEmailCell
                      image={orphan?.profile_photo}
                      name={`${orphan?.first_name} ${orphan?.last_name}`}
                    gender={orphan.gender}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 600, color: "#3D3B3C" }}
                  >
                    {orphan?.date_of_birth}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#667085",
                    }}
                  >
                    {orphan?.in_school}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#667085",
                    }}
                  >
                    {orphan?.state_of_origin}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <PillWithDot
                    text={orphan?.account_status}
                    bgColor={
                      orphan?.account_status == "APPROVED"
                        ? "#ECFDF3"
                        : orphan?.account_status == "PENDING"
                          ? "#FFF8E4"
                          : orphan?.account_status == "REJECTED"
                            ? "#FFEFEF"
                            : ""
                    }
                    dotColor={
                      orphan?.account_status == "APPROVED"
                        ? "#007A27"
                        : orphan?.account_status == "PENDING"
                          ? "#FFA800"
                          : orphan?.account_status == "REJECTED"
                            ? "#FF0000"
                            : ""
                    }
                    textColor={
                      orphan?.account_status == "APPROVED"
                        ? "#007A27"
                        : orphan?.account_status == "PENDING"
                          ? "#FFA800"
                          : orphan?.account_status == "REJECTED"
                            ? "#FF0000"
                            : ""
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      onClick={() => setOpenViewDetailsModal(true)}
                      sx={{ mr: "20px", cursor: "pointer", mt: "-5px" }}
                    >
                      <Button
                        sx={{
                          textDecoration: "underline",
                          color: "#007A27",
                          fontSize: "15px",
                          fontWeight: 600,
                          ":hover": {
                            borderColor: "#EBEFFF",
                            color: "#3863FA",
                            backgroundColor: "#EBEFFF",
                          },
                        }}
                        onClick={() => handleView(orphan)}
                      >
                        {"View"}
                      </Button>
                    </Box>

                    <Button
                      sx={{
                        borderColor: "white",
                        color: "#3863FA",
                        backgroundColor: "white",
                        ":hover": {
                          borderColor: "#EBEFFF",
                          color: "#3863FA",
                          backgroundColor: "#EBEFFF",
                        },
                      }}
                      onClick={() => handleOpenDelete(orphan)}
                    >
                      <Image
                        width={21}
                        height={21}
                        alt={"Trash Icon"}
                        src={"/trash.svg"}
                      />
                    </Button>
                    <Button
                      sx={{
                        borderColor: "white",
                        color: "#3863FA",
                        backgroundColor: "white",
                        ":hover": {
                          borderColor: "#EBEFFF",
                          color: "#3863FA",
                          backgroundColor: "#EBEFFF",
                        },
                      }}
                      onClick={() => handleEdit(orphan)}
                    >
                      <Image
                        width={21}
                        height={21}
                        alt={"Edit Icon"}
                        src={"/editPen.svg"}
                        color="red"
                      />
                    </Button>

                    <>
                      <Button
                        aria-describedby={id}
                        variant="outlined"
                        onClick={(event) => {
                          handleOpenPopover(event, orphan);
                        }}
                        sx={{
                          borderColor: "white",
                          color: "#3863FA",
                          backgroundColor: "white",
                          ":hover": {
                            borderColor: "#EBEFFF",
                            color: "#3863FA",
                            backgroundColor: "#EBEFFF",
                          },
                        }}
                      >
                        <MoreVert />
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Box sx={{ p: 1 }}>
                          <Button
                            sx={{
                              color: "black",
                              backgroundColor: "white",
                              ":hover": {
                                color: "#3863FA",
                                backgroundColor: "white",
                              },
                            }}
                            onClick={() => handleSponsorshipRequest()}
                          >
                            Add Sponsorship Request
                          </Button>
                        </Box>
                      </Popover>
                    </>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AlertDialog
        open={openDialog}
        onClose={handleClickClose}
        onAgree={handleDelete}
        title={"Delete"}
        deleteColor={true}
        content={
          "Do you wish to delete this orphan? A confirmation will be sent to the admin to confirm your actions."
        }
        disagreeText={"No"}
        agreeText={"Yes, Delete"}
      />
      <ViewOrphanDetailsSideModal
        orphanData={SelectedOrphan}
        open={openViewDetailsModal}
        close={() => setOpenViewDetailsModal(false)}
      />

      <ReasonForDeleteOrphan
        openDeleteReason={openDeleteReason}
        setOpenDeleteReason={setOpenDeleteReason}
        SelectedOrphan={SelectedOrphan}
        onDelete={handleDeleteOrphan}

      />
      <EditOrphanSideModal
        openSideModal={openEditSideModal}
        setOpenSideModal={setEditOpenSideModal}
        SelectedOrphan={SelectedOrphan}
      />
      <AddSponsorshipRequestSideModal
        openSideModal={openSponsorshipSideModal}
        setOpenSideModal={setOpenSponsorshipSideModal}
        SelectedOrphan={SelectedOrphan}
      />
    </>
  );
};

export default OrphanRequestListTable;
