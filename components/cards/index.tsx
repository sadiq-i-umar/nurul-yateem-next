import { Box, Typography } from "@mui/material";
import { ExportPDFButton, TimePeriodButton } from "../buttons";
import { MonthsSelectOnlyInputBox } from "../input-boxes";
import { SimpleLineChart, BasicPie } from "../charts";
import { MoreVert } from "@mui/icons-material";

export const SummaryCard: React.FC<{ title: string; number: number; icon: string }> = ({
    title,
    number,
    icon
  }) => {
  
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '15px',
          border: '1px solid #E4E4E7'
        }}
      >
        <Box sx={{ marginBottom: '11px' }}>
          <Typography sx={{ fontSize: '12px', color: '#908E8F' }}>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: '21px', fontWeight: 'bold' }}>{number}</Typography>
          </Box>
          <Box>
            <img src={icon} width="30px" height="30px" />
          </Box>
        </Box>
      </Box>
    );
  };

  export const SponsorshipsCard: React.FC = () => {
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #E4E4E7',
          minHeight: "100%"
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ marginBottom: { xs: '10px', md: '0px' } }}>
            <Typography
              sx={{ fontSize: '16px', color: '#18181B', fontWeight: 700 }}
            >
              SPONSORSHIPS
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: '1',
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: { xs: '10px', md: '0px' },
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}
            >
              <TimePeriodButton period={'Months'} number={12} />
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}
            >
              <TimePeriodButton period={'Months'} number={6} />
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}
            >
              <TimePeriodButton period={'Weeks'} number={3} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TimePeriodButton period={'Days'} number={7} />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'block', sm: 'none' },
              alignItems: 'center',
              marginRight: '8px',
              marginBottom: '10px',
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
            mt: '20px',
            ml: { xs: '-10px', sm: '0px' },
            mr: { xs: '-30px', sm: '0px' },
          }}
        >
          <SimpleLineChart />
        </Box>
      </Box>
    );
  };

  export const GenderPieChartCard: React.FC = () => {

    return (
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #E4E4E7',
          position: "relative",
          minHeight: "100%",
          paddingTop: '30px'
        }}
      >
        <Box sx={{ display: 'flex'}}>
          <Box>
            <Typography
              sx={{ fontSize: '16px', color: '#18181B', fontWeight: 700 }}
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
            marginTop: {xs: '0px', sm: '25px', md: '25px', lg: '40px'}
          }}
        >
          <BasicPie />
        </Box>
      </Box>
    );
  }