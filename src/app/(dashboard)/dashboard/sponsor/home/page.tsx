import { Box, Grid } from "@mui/material";
import {
  GenderPieChartCard,
  SponsorshipsCard,
  SummaryCard,
} from "../../../../../../components/cards";
import { summaryCardData } from "../../../../../../data/summary-card";
import HeaderSection from "../../../../../../components/GreetingSectionWithButton/HeaderSection";
import Activities from "../../../../../../components/cards/activities";

export default function GuardianDashboard() {
  return (
    <Box>
      <Box>
        <HeaderSection />
      </Box>
      <Box sx={{ marginBottom: "31px" }}>
        <Grid container spacing={3}>
          {summaryCardData.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <SummaryCard
                icon={card.icon}
                title={card.title}
                number={card.number}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mb: "20px" }}>
        <Grid container spacing={4}>
          <Grid sx={{ minHeight: "100%" }} item xs={12} lg={8}>
            <Box sx={{ height: "100%", overflow: "hidden" }}>
              <SponsorshipsCard />
            </Box>
          </Grid>
          <Grid sx={{ minHeight: "100%" }} item xs={12} lg={4}>
            <Activities
              title="ORPHANS NEEDS"
              subheader="View orphan needs breakdown "
              industries={[
                {
                  sector: "Education",
                  total: 1900,
                  progress: 70,
                  des: "NO OF ORPHANS",
                  size: 12,
                },
                {
                  sector: "Health",
                  total: 1500,
                  progress: 50,
                  des: "NO OF ORPHANS",
                  size: 14,
                },
                {
                  sector: "Clothing",
                  total: 1200,
                  progress: 30,
                  des: "NO OF ORPHANS",
                  size: 2,
                },
                {
                  sector: "Feeding",
                  total: 800,
                  progress: 89,
                  des: "NO OF ORPHANS",
                  size: 122,
                },
              ]}
            />
            {/* <Box sx={{ height: "100%", overflow: "hidden" }}>
              <GenderPieChartCard />
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
