import { FilterList } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

export const TimePeriodButton: React.FC<{ period: string; number: number }> = ({
    period,
    number,
  }) => {
    return (
      <Button
        sx={{
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'none',
          color: '#18181B',
          borderRadius: '5px',
          border: '1px solid #A1A1AA',
          paddingX: '10px',
          paddingY: '8px',
        }}
      >
        {number} {period}
      </Button>
    );
  };

  export const ExportPDFButton: React.FC = () => {
    return (
      <Button
        variant="outlined"
        sx={{ borderRadius: '5px', fontWeight: 'bold', textTransform: 'none' }}
      >
        <Image
          style={{ marginRight: '4px' }}
          width={20}
          height={20}
          alt={'Export PDF Icon'}
          src="/download_doc.svg"
        />{' '}
        Export PDF
      </Button>
    );
  };

  export const ActionButtonOne: React.FC<{ icon: string; text: string }> = ({
    icon,
    text,
  }) => {
    return (
      <Button
        variant="outlined"
        sx={{ border: '1px solid #E7E7E7', borderRadius: '8px', py: 1 }}
      >
        {icon !== '' && (
          <Image
            style={{ marginRight: 10 }}
            width={24}
            height={24}
            alt={'Button One Icon'}
            src={icon}
          />
        )}
        <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: '500' }}>
          {text}
        </Typography>
      </Button>
    );
  };
  
  export const ActionButtonTwo: React.FC<{ icon: string; text: string }> = ({
    icon,
    text,
  }) => {
    return (
      <Button variant="contained" sx={{ borderRadius: '8px', py: 1 }}>
        {icon !== '' && (
          <Image
            style={{ marginRight: 5 }}
            width={24}
            height={24}
            alt={'Button Two Icon'}
            src={icon}
          />
        )}
        <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
          {text}
        </Typography>
      </Button>
    );
  };

  interface FilterButtonProps {
    initialFilter: string;
  }

  export const FilterButton: React.FC<FilterButtonProps> = ({
    initialFilter,
  }) => {
    return (
      <Button
        variant="outlined"
        style={{
          display: 'block',
          borderRadius: '8px',
          background: 'white',
          textTransform: 'none',
          color: '#344054',
          border: '1px solid #E7E7E7',
          fontWeight: 500,
          float: 'left',
        }}
      >
        <FilterList sx={{ verticalAlign: 'middle', mr: '4px' }} />
        {initialFilter}
      </Button>
    );
  };
  