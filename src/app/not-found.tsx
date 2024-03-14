"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";

import IllusNotFound from "../../public/404.png";

function NotFound() {
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          minHeight: "20vh",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
            }}
          >
            <Image
              src={IllusNotFound}
              alt="404"
              width={459}
              height={300}
              quality={97}
              layout="responsive"
            />
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 30, md: 50 },
                mt: 1,
                mb: 1,
                lineHeight: 1,
                fontWeight: "bold",
              }}
            >
              Page Not Found
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: { xs: 16, md: 28 }, mb: 2, lineHeight: 1.5 }}
              gutterBottom
            >
              The page you’re looking for doesn’t exist.
            </Typography>
            <Link href="/">
              <Button
                color="primary"
                size={matchMobileView ? "small" : "large"}
              >
                Back Home
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default NotFound;
