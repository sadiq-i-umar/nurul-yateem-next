import { Typography } from "@mui/material";
import { Dot } from "../dots";

export const PillWithDot: React.FC<{
  text: string;
  bgColor: string;
  dotColor: string;
  textColor: string;
}> = ({ text, bgColor, dotColor, textColor }) => {
  return (
    <Typography
      sx={{
        borderRadius: "16px",
        color: textColor,
        backgroundColor: bgColor,
        paddingX: "12px",
        fontSize: "12px",
        fontWeight: "500",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <Dot dotColor={dotColor} />
      {text}
    </Typography>
  );
};

export const TextOnlyPill: React.FC<{
  text: string;
  bgColor: string;
  color: string;
  border?: string;
}> = ({ text, bgColor, color, border }) => {
  return (
    <Typography
      sx={{
        backgroundColor: bgColor,
        color: color,
        display: "inline-block",
        paddingX: "10px",
        borderRadius: "10px",
        fontWeight: "400",
        fontSize: "14px",
        width: "fit-content",
        border: border,
      }}
    >
      {text}
    </Typography>
  );
};
