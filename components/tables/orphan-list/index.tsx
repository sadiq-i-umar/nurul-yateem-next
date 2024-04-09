import { Box, Button, Checkbox, Typography } from "@mui/material";
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

const OrphanListTable: React.FC<{
  orphanData: any[];
}> = ({ orphanData }) => {
  const [openViewDetailsModal, setOpenViewDetailsModal] = React.useState(false);
  const [SelectedOrphan, setSelectedOrphan] = React.useState<any>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteReason, setOpenDeleteReason] = React.useState(false);
  const [openEditSideModal, setEditOpenSideModal] = React.useState(false);

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
                      email={orphan.gender}
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
                      <Link href="#">
                        <Typography
                          sx={{
                            textDecoration: "underline",
                            color: "#007A27",
                            fontSize: "15px",
                            fontWeight: 600,
                          }}
                        >
                          {"View"}
                        </Typography>
                      </Link>
                    </Box>
                    <ViewOrphanDetailsSideModal
                      orphanData={orphan}
                      open={openViewDetailsModal}
                      close={() => setOpenViewDetailsModal(false)}
                    />
                    <Button
                      sx={{ cursor: "pointer", mr: "20px" }}
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
                      sx={{ cursor: "pointer", mr: "20px" }}
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
                    <Box sx={{ cursor: "pointer" }}>
                      <MoreVert />
                    </Box>
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
      <ReasonForDeleteOrphan
        openDeleteReason={openDeleteReason}
        setOpenDeleteReason={setOpenDeleteReason}
        SelectedOrphan={SelectedOrphan}
      />
      <EditOrphanSideModal
        openSideModal={openEditSideModal}
        setOpenSideModal={setEditOpenSideModal}
        SelectedOrphan={SelectedOrphan}
      />
    </>
  );
};

export default OrphanListTable;
