import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const AddOrphanSuccess: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "70px",
        }}
      >
        <Box>
          <Image
            src={"/reg_message.svg"}
            width={103}
            height={123}
            alt={"Registration Success"}
          />
        </Box>
        <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", color: "#007A27" }}
          >
            Your orphan account creation was successful!
          </Typography>
        </Box>

        {pathname == "/dashboard/add-an-orphan" && (
          <Box>
            <Box sx={{ marginBottom: "25px" }}>
              <Box
                sx={{ marginBottom: { xs: "5px", sm: "0px" }, marginX: "25px" }}
              >
                <Typography sx={{ fontSize: "16px", textAlign: "center" }}>
                  While you await approval, feel free to explore our dashboard.
                  Once approved, you&apos;ll have full access to your portal.
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  boxShadow: "none",
                  width: "100%",
                  borderRadius: "6px",
                  textTransform: "none",
                  paddingY: "10px",
                  paddingX: "70px",
                }}
                onClick={() => router.push("/dashboard/guardian/home")}
              >
                Go to Dashboard
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddOrphanSuccess;
