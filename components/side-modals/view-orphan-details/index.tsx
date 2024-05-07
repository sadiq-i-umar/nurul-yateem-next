import { Box, Dialog, Divider, Grid, Typography } from "@mui/material";
import { ImageFrameCircular80 } from "../../common/image-frames";
import { PillWithDot, TextOnlyPill } from "../../pills";
import { Close, MoreVert } from "@mui/icons-material";
import { Orphan } from "../../../types";

const ViewOrphanDetailsSideModal: React.FC<{
  open: boolean;
  close: () => void;
  orphanData: Orphan;
}> = ({ open, close, orphanData }) => {

  return (
    <Dialog open={open} onClose={close} >
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
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Box>
              <ImageFrameCircular80
                image={
                  orphanData?.profile_photo
                }
              />
            </Box>
            <Box>
              <Box>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                >{`${orphanData?.first_name} ${orphanData?.last_name}`}</Typography>
              </Box>
              <Box>
                <TextOnlyPill
                  text={orphanData?.gender}
                  bgColor={""}
                  color={""}
                />
              </Box>
              <Box>
                <PillWithDot
                  text={`created at ${orphanData?.created_at}`}
                  bgColor=""
                  dotColor=""
                  textColor=""
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box>
              <MoreVert />
            </Box>
            <Box>
              <span style={{ cursor: "pointer" }} onClick={close}>
                <Close />
              </span>
            </Box>
          </Box>
        </Box>
        {[
          {
            groupTitle: "Personal Details",
            groupContent: [
              {
                title: "State of Origin",
                content: orphanData?.state_of_origin,
              },
              {
                title: "Local Government Area",
                content: orphanData?.local_government,
              },
              { title: "Date of Birth", content: orphanData?.date_of_birth },
            ],
          },
          {
            groupTitle: "School Information",
            groupContent: [
              { title: "Is he in school", content: orphanData?.in_school },
              { title: "School Name", content: orphanData?.school_name },
              { title: "School Address", content: orphanData?.school_address },
              {
                title: "School Contact Person",
                content: orphanData?.school_contact_person,
              },
              {
                title: "Phone Number of Contact Person",
                content: orphanData?.phone_number_of_contact_person,
              },
            ],
          },
        ].map((item) => (
          <>
            <Box
              sx={{
                border: "1px solid #DFDFDF",
                borderRadius: "10px",
                padding: "20px",
                mb: "40px",
              }}
            >
              <Box sx={{ mb: "20px" }}>
                <Typography variant="h3">{item.groupTitle}</Typography>
              </Box>
              <Divider sx={{ mb: "20px" }} />
              {/* <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}> */}
              <Grid container>
                {item.groupContent.map((item) => (
                  <Grid key={item.title} item xs={12} sm={6} md={4}>
                    <Box key={item.title} sx={{ mr: "20px" }}>
                      <Box>
                        <Typography>{item.title}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4">{item.content}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {/* </Box> */}
            </Box>
            <Divider sx={{ mb: "20px" }} />
          </>
        ))}
        <Box
          sx={{
            backgroundColor: "#FFF4E5",
            color: "#663C00",
            padding: "16px",
            borderRadius: "4px",
          }}
        >
          <Box sx={{ marginBottom: "8px" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Pending Approval
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "14px" }}>
              Your Application is undergoing review by the portal coordinator,
              and the decision of your labelling process will be determined
              soon.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ViewOrphanDetailsSideModal;
