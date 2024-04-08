"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { TextOnlyPill } from "../pills";
import { ActionButtonOne, ActionButtonTwo, FilterButton } from "../buttons";
import { SearchBar } from "../search-bar/one";

interface Props {
  title: string;
  subtitle: string;
  itemCount: number | undefined;
  itemCountLabel: string;
  buttonOneIcon?: string;
  buttonOneText?: string;
  buttonTwoClick?: (data?: any) => any;
  buttonTwoIcon?: string;
  buttonTwoText?: string;
  pageHasTable: boolean;
  searchQuery?: (data: string) => void;
}

const SubHeader: React.FC<Props> = ({
  title,
  subtitle,
  itemCount,
  itemCountLabel,
  buttonOneIcon,
  buttonOneText,
  buttonTwoClick,
  buttonTwoIcon,
  buttonTwoText,
  pageHasTable,
  searchQuery,
}) => {
  return (
    <Paper
      sx={{
        backgroundColor: "white",
        marginX: "-30px",
        paddingX: "30px",
        paddingTop: "20px",
        ...(pageHasTable
          ? { paddingBottom: "10px" }
          : { paddingBottom: "30px" }),
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
          >
            <Box sx={{ marginRight: "8px" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: 600, color: "black" }}
              >
                {title}
              </Typography>
            </Box>
            <Box>
              {itemCount && (
                <TextOnlyPill
                  text={itemCount?.toString() + " " + itemCountLabel}
                  bgColor="#F1F7E8"
                  color="#007A27"
                />
              )}
            </Box>
          </Box>
          <Box sx={{ marginBottom: { xs: "10px", sm: "21px" } }}>
            <Typography sx={{ color: "#667085" }}>{subtitle}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", paddingTop: "10px" }}>
          {buttonOneText && buttonOneIcon && (
            <Box sx={{ mr: { xs: "6px", sm: "12px" } }}>
              <ActionButtonOne
                icon={buttonOneIcon ? buttonOneIcon : ""}
                text={buttonOneText ? buttonOneText : ""}
              />
            </Box>
          )}
          <Box
            sx={{ mt: { xs: "0px", sm: "0px" }, mb: { xs: "20px", sm: "0px" } }}
          >
            {buttonTwoText && buttonTwoIcon && (
              <Box
                onClick={() => buttonTwoClick && buttonTwoClick()}
                sx={{ mr: { xs: "6px", sm: "12px" } }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "30px",
                    paddingX: "20px",
                    paddingY: "10px",
                    backgroundColor: "#3863FA",
                    zIndex: 0,
                    "&:hover": {
                      backgroundColor: "#3863FA",
                    },
                  }}
                  startIcon={
                    buttonTwoIcon ? (
                      <img src={buttonTwoIcon} alt="Button Icon" />
                    ) : null
                  }
                  onClick={() => buttonTwoClick && buttonTwoClick()}
                >
                  {buttonTwoText}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          mt: "15px",
          mb: "-25px",
        }}
      >
        <Box
          sx={{
            marginRight: "12px",
            width: "400px",
            marginBottom: { xs: "15px", sm: "10px" },
          }}
        >
          <SearchBar
            sendQuery={(data: string) => searchQuery && searchQuery(data)}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
        >
          <FilterButton initialFilter={"Filters"} />
        </Box>
      </Box>
    </Paper>
  );
};

export default SubHeader;
