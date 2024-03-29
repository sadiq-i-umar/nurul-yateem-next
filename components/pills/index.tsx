import { Typography } from '@mui/material';
import { Dot } from '../dots';

export const PillWithDot: React.FC<{
  text: string;
  bgColor: string;
  dotColor: string;
  textColor: string;
}> = ({ text, bgColor, dotColor, textColor }) => {
  return (
    <Typography
      sx={{
        borderRadius: '16px',
        color: textColor,
        backgroundColor: bgColor,
        paddingX: '12px',
        fontSize: '12px',
        fontWeight: '500',
        alignItems: 'center',
        width: 'fit-content',
      }}
    >
      <Dot dotColor={dotColor} />
      {text}
    </Typography>
  );
};