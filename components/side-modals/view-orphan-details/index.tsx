import { Box, Dialog, Divider, Grid, Typography } from "@mui/material";
import { ImageFrameCircular80 } from "../../common/image-frames";
import { PillWithDot, TextOnlyPill } from "../../pills";
import { Close, MoreVert } from "@mui/icons-material";
import { OrphanProps } from "../../../types";

const ViewOrphanDetailsSideModal: React.FC<{
  open: boolean;
  close: () => void;
  orphanData: OrphanProps;
}> = ({ open, close, orphanData }) => {


return (
    <Dialog open={open} onClose={close}>
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
              <ImageFrameCircular80 image={orphanData?.profile?.picture} />
            </Box>
            <Box
  sx={{
    display: "flex",
              flexDirection: "column",
    mx: '10px'
  }}
>
  <Box>
    <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight : 'bold',
        textTransform: "capitalize",
      }}
    >
      {`${orphanData?.profile?.firstName} ${orphanData?.profile?.lastName}`}
    </Typography>
  </Box>
  <Box>
    <TextOnlyPill
      text={orphanData?.profile?.gender}
      bgColor= "blue"
      color="white" 
    />
  </Box>
  <Box sx={{ fontSize: "14px" }}>
    <PillWithDot
      text={new Date(orphanData?.profile?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
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
                content: orphanData?.profile?.localGovernment?.state.name,
              },
              {
                title: "Local Government Area",
                content: orphanData?.profile?.localGovernment?.name,
              },
              { title: "Date of Birth", content: new Date(orphanData?.profile?.dateOfBirth).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
          },
            ],
          },
          {
            groupTitle: "School Information",
            groupContent: [
              { title: "Is he in school",   content: orphanData?.Orphan?.schoolStatus
    ? "In school"
    : "Not in school",},
              { title: "School Name", content: orphanData?.Orphan?.schoolName  ?? "" },
              { title: "School Address", content: orphanData?.Orphan?.schoolAddress ?? ""},
              {
                title: "School Contact Person",
                content: orphanData?.Orphan?.schoolContactPerson ?? "",
              },
              {
                title: "Phone Number of Contact Person",
                content: orphanData?.Orphan?.schoolContactPhone  ?? "sadfdsf",
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

      {!orphanData?.Orphan?.isAccepted ? (
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
      ) : null     }
        
      </Box>
    </Dialog>
  );
};

export default ViewOrphanDetailsSideModal;
