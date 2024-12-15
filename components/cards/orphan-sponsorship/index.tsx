'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Ensure correct import
import { PillWithDot, TextOnlyPill } from '../../pills';
import { ImageFrameCircular60 } from '../../common/image-frames';

interface CardData {
  id: number;
  name: string;
  date: string;
  status: string;
  needs: string[];
  amountGotten: string;
  amountToGo: string;
  progress: number;
}

interface OrphanSponsorshipCardProps {
  cardData: CardData[];
}

const OrphanSponsorshipCard: React.FC<OrphanSponsorshipCardProps> = ({
  cardData,
}) => {
  const [open, setOpen] = useState(false);
  const [orphan, setOrphan] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState({
    clothing: false,
    education: false,
    health: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeOrphan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrphan(event.target.value as string);
  };

  const handleChangeAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as string);
  };

  const handleChangeDonationType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDonationType({
      ...donationType,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box
      sx={{
        paddingTop: '10px',
        paddingRight: '0px',
        paddingBottom: '10px',
        paddingLeft: '0px',
      }}
    >
      <Grid container spacing={2}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Paper
              elevation={10}
              sx={{ backgroundColor: 'white', padding: '20px' }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ mr: '20px' }}>
                  <ImageFrameCircular60 image='' />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: '16px', wordWrap: 'break-word' }}
                      >
                        {card.name}
                      </Typography>
                    </Box>
                    <Box>
                      <PillWithDot
                        text={card.date}
                        bgColor='transparent'
                        dotColor='#908E8F'
                        textColor='#908E8F'
                      />
                    </Box>
                  </Box>
                  <Box sx={{ ml: '-12px' }}>
                    <PillWithDot
                      text={card.status}
                      bgColor='transparent'
                      dotColor='#2846B2'
                      textColor='#2846B2'
                    />
                  </Box>
                  <Box sx={{ mb: '5px' }}>
                    <Typography sx={{ fontSize: '12px', color: '#237A00' }}>
                      Needs
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: '20px' }}>
                    {card.needs.map((need) => (
                      <Box key={need}>
                        <TextOnlyPill
                          text={need}
                          bgColor='#EFF8FF'
                          color='#175CD3'
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ mb: '20px' }}>
                    <Box sx={{ mb: '2px' }}>
                      <LinearProgress
                        variant='determinate'
                        value={card.progress}
                        sx={{
                          borderRadius: '100px',
                          backgroundColor: '#F0F2F5',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#A3B7FD',
                          },
                          height: '8px',
                          color: '#A3B7FD',
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: '-10px',
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{ color: '#475367', fontSize: '10px' }}
                            >
                              Amount gotten
                            </Typography>
                          </Box>
                          <Box>
                            <PillWithDot
                              text={card.amountGotten}
                              bgColor='transparent'
                              dotColor='#98A2B3'
                              textColor='#475367'
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box>
                            <Typography
                              sx={{ color: '#475367', fontSize: '10px' }}
                            >
                              Amount to go
                            </Typography>
                          </Box>
                          <Box>
                            <PillWithDot
                              text={card.amountToGo}
                              bgColor='transparent'
                              dotColor='#98A2B3'
                              textColor='#475367'
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>{card.progress}%</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', pt: '20px' }}
              >
                <Box sx={{ mr: '20px' }}>
                  <Button
                    sx={{
                      color: '#344054',
                      backgroundColor: '#F2F4F7',
                      borderRadius: '100px',
                      textTransform: 'none',
                      px: '20px',
                    }}
                  >
                    View
                  </Button>
                </Box>
                <Box>
                  <Button
                    onClick={handleClickOpen}
                    sx={{
                      color: 'white',
                      backgroundColor: '#3863FA',
                      borderRadius: '100px',
                      textTransform: 'none',
                      px: '20px',
                    }}
                  >
                    Donate
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ position: 'relative', fontSize: '24px' }}>
          Make a Donation
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              minWidth: 'auto',
              p: '0',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='orphan-label'>Select Orphan</InputLabel>
              <Select
                labelId='orphan-label'
                id='orphan'
                value={orphan}
                // onChange={handleChangeOrphan}
                fullWidth
              >
                <MenuItem value='Orphan 1'>Orphan 1</MenuItem>
                <MenuItem value='Orphan 2'>Orphan 2</MenuItem>
                <MenuItem value='Orphan 3'>Orphan 3</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin='dense'
              id='guardian-name'
              label="Guardian's Name"
              type='text'
              fullWidth
              variant='outlined'
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin='dense'
                  id='account-number'
                  label="Guardian's Account Number"
                  type='number'
                  fullWidth
                  variant='outlined'
                  placeholder='1234567890'
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: null,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin='dense'
                  id='bank-name'
                  label="Guardian's Bank Name"
                  type='text'
                  fullWidth
                  variant='outlined'
                  placeholder='Bank Name'
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </Grid>
            </Grid>

            <FormControl fullWidth margin='normal'>
              <InputLabel id='amount-label'>Select Amount</InputLabel>
              <Select
                labelId='amount-label'
                id='amount'
                value={amount}
                // onChange={handleChangeAmount}
                fullWidth
                sx={{ position: 'relative' }}
              >
                <MenuItem value='1000'>1000 NGN</MenuItem>
                <MenuItem value='2000'>2000 NGN</MenuItem>
                <MenuItem value='5000'>5000 NGN</MenuItem>
                <MenuItem value='10000'>10000 NGN</MenuItem>
              </Select>
              <Typography
                variant='caption'
                sx={{
                  position: 'absolute',
                  right: '16px',
                  top: '10px',
                  color: '#3863FA',
                }}
              >
                NGN
              </Typography>
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography variant='body1' sx={{ mt: '12px' }}>
                Select orphan needs to donate to
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={donationType.clothing}
                      onChange={handleChangeDonationType}
                      name='clothing'
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '13px' }}>Clothing</Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={donationType.education}
                      onChange={handleChangeDonationType}
                      name='education'
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '13px' }}>Education</Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={donationType.health}
                      onChange={handleChangeDonationType}
                      name='health'
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '13px' }}>Health</Typography>
                  }
                />
              </FormGroup>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleClose}
            sx={{
              width: '480px',
              height: '48px',
              borderRadius: '30px',
              backgroundColor: '#3863FA',
              color: 'white',
              textTransform: 'none',
            }}
          >
            Send Donations
          </Button>
        </DialogActions>
        <Box
          sx={{ p: 2, textAlign: 'center', color: '#475367', fontSize: '14px' }}
        >
          You will be redirected to a Third-party app where you will be charged
          for your donations. Be rest assured that allyour details are safe.{' '}
        </Box>
      </Dialog>
    </Box>
  );
};

export default OrphanSponsorshipCard;
