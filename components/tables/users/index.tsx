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
import AlertDialog from "../../Reusable-Dialog";

const UsersTable: React.FC<{
  userData: any[];
}> = ({ userData }) => {
  const [openViewDetailsModal, setOpenViewDetailsModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDelete = (data: any) => {
    setSelectedUser(data);
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    setOpenDialog(false);
    // Handle delete logic
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
                  <Box>Name</Box>
                </Box>
              </TableCell>
              {["User Type", "Privilege Level", "Status", ""].map(
                (heading, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontSize: "14px", color: "#667085" }}
                    align="left"
                  >
                    <Box sx={{ mb: "-13px" }}>{heading}</Box>
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((user) => (
              <TableRow
                key={user?.id}
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
                      image={user?.profile_photo}
                      name={`${user?.first_name} ${user?.last_name}`}
                      gender={user.email}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 600, color: "#3D3B3C" }}
                  >
                    {user?.user_type}
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
                    {user?.privilege_level}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <PillWithDot
                    text={user?.status}
                    bgColor={user?.status == "Active" ? "#ECFDF3" : "#FFEFEF"}
                    dotColor={user?.status == "Active" ? "#007A27" : "#FF0000"}
                    textColor={user?.status == "Active" ? "#007A27" : "#FF0000"}
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
                    <Button
                      sx={{ cursor: "pointer", mr: "20px" }}
                      onClick={() => handleOpenDelete(user)}
                    >
                      <Image
                        width={21}
                        height={21}
                        alt={"Trash Icon"}
                        src={"/trash.svg"}
                      />
                    </Button>
                    <Button sx={{ cursor: "pointer", mr: "20px" }}>
                      <Image
                        width={21}
                        height={21}
                        alt={"Edit Icon"}
                        src={"/editPen.svg"}
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
        content={"Do you wish to delete this user?"}
        disagreeText={"No"}
        agreeText={"Yes, Delete"}
      />
    </>
  );
};

export default UsersTable;
