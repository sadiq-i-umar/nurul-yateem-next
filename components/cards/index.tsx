"use client";

import {
  Avatar,
  Box,
  CardHeader,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import { ExportPDFButton, TimePeriodButton } from "../buttons";
import { MonthsSelectOnlyInputBox } from "../input-boxes";
import { SimpleLineChart, BasicPie } from "../charts";
import { ChevronRight, MoreHoriz, MoreVert } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { TopGuardianData } from "../../utils";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const SummaryCard: React.FC<{
  title: string;
  number: number;
  icon: string;
}> = ({ title, number, icon }) => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "15px",
        border: "1px solid #E4E4E7",
      }}
    >
      <Box sx={{ marginBottom: "11px" }}>
        <Typography sx={{ fontSize: "12px", color: "#908E8F" }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          {session ? (
            <Typography sx={{ fontSize: "21px", fontWeight: "bold" }}>
              {number}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              width={40}
              height={25}
              sx={{ mt: 1, display: "block" }}
            />
          )}
        </Box>
        <Box>
          <img src={icon} width="30px" height="30px" />
        </Box>
      </Box>
    </Box>
  );
};

export const SponsorshipsCard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        border: "1px solid #E4E4E7",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ marginBottom: { xs: "10px", md: "0px" } }}>
          <Typography
            sx={{ fontSize: "16px", color: "#18181B", fontWeight: 700 }}
          >
            SPONSORSHIPS
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: "1",
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "10px", md: "0px" },
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}
          >
            <TimePeriodButton period={"Months"} number={12} />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}
          >
            <TimePeriodButton period={"Months"} number={6} />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}
          >
            <TimePeriodButton period={"Weeks"} number={3} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TimePeriodButton period={"Days"} number={7} />
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            alignItems: "center",
            marginRight: "8px",
            marginBottom: "10px",
          }}
        >
          <MonthsSelectOnlyInputBox placeholder="Months" />
        </Box>
        <Box>
          <ExportPDFButton />
        </Box>
      </Box>
      <Box
        sx={{
          mt: "20px",
          ml: { xs: "-10px", sm: "0px" },
          mr: { xs: "-30px", sm: "0px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        {session ? (
          <SimpleLineChart />
        ) : (
          <CircularProgress
            sx={{ mt: { xs: "20px", lg: "100px" }, mb: { xs: "30px" } }}
          />
        )}
      </Box>
    </Box>
  );
};

export const GenderPieChartCard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        border: "1px solid #E4E4E7",
        position: "relative",
        minHeight: "100%",
        paddingTop: "25px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box>
          <Typography
            sx={{ fontSize: "16px", color: "#18181B", fontWeight: 700 }}
          >
            GENDER
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", right: 20 }}>
          <MoreVert />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: { xs: "0px", sm: "25px", md: "25px", lg: "40px" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {session ? (
          <BasicPie />
        ) : (
          <CircularProgress
            sx={{
              mt: { xs: "20px", lg: "79px" },
              mb: { xs: "30px", lg: "128px" },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export const TopGuardian: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        paddingBottom: "10px",
        paddingX: "10px",
        border: "1px solid #E4E4E7",
        position: "relative",
        minHeight: "100%",
        paddingTop: "10px",
      }}
    >
      <CardHeader
        title="TOP GUARDIAN WITH HIGHEST ORPHAN"
        subheader="Sell list of guardian with the highest no. of orphan"
      />
      {TopGuardianData.map((guardian, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            padding: "10px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: { xs: "10px", md: "0px" },
              gap: "10px",
              width: "17rem",
            }}
          >
            <Avatar
              alt={guardian.imageAlt}
              src={guardian.image}
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ maxWidth: "200px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {guardian.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#71717A",
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {guardian.email}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#71717A",
              }}
            >
              {guardian.orphan}
            </Typography>
          </Box>

          <Box>
            <MoreHoriz
              sx={{
                cursor: "pointer",
                color: "#71717A",
              }}
            />
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
          width: "30%",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#007A27",
            textAlign: "start",
            marginLeft: "10px",
          }}
        >
          SEE ALL GUARDIAN
        </Typography>
        <ChevronRight
          sx={{
            color: "#007A27",
          }}
        />
      </Box>
    </Box>
  );
};

export default function BannerCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
    >
      <SwiperSlide>
        <img src="/banner1.svg" alt="Banner 1" width="100%" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner2.svg" alt="Banner 2" width="100%" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner3.svg" alt="Banner 3" width="100%" />
      </SwiperSlide>
    </Swiper>
  );
}
