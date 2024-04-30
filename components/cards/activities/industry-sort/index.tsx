import Button from '@mui/material/Button';
import { listClasses } from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Iconify from '../../../iconify';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: '12-months', label: '12 Months' },
  { value: '6-months', label: '6 Months' },
  { value: '30-days', label: '30 Days' },
  { value: '7-days', label: '7 Days' }
];

export default function IndustriesSort() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState('7-days'); 

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleClick}
        endIcon={<Iconify icon={anchorEl ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '13px',
            lineHeight: 1.3,
            textTransform: 'capitalize'
          }}
        >
          {`Last ${SORT_OPTIONS.find(option => option.value === selectedOption)?.label}`}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0
              }
            }
          }
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedOption}
            onClick={() => handleMenuItemClick(option.value)}
          >
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '13px',
                lineHeight: 1.3,
                textTransform: 'capitalize'
              }}
            >
              {`Last ${option.label}`}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
