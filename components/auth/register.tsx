'use client';
import { RegisterUser } from '@/src/app/api/service/register';
import { HeroImageFrame, LogoImageFrame } from '../common/image-frames';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoaderBackdrop from '../common/loader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import RegisterSideInfo from './side-info/register';

const Register: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      role: 'guardian',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const selectedValue = watch('role');

  const registerMutation = useMutation({
    mutationFn: RegisterUser,
    onMutate: () => setShowLoader(true),
    onSuccess: (e) => {
      if (e.statusCode == 409) {
        setTimeout(() => {
          setShowLoader(false);
          toast.error(e.message);
        }, 3000);
      } else {
        setTimeout(() => {
          setShowLoader(false);
          toast.success('Registration Successful');
          router.push('/register/success');
        }, 3000);
      }
    },
    onError: (e) =>
      setTimeout(() => {
        setShowLoader(false);
        toast.error(e.message);
      }, 3000),
  });

  return (
    <>
      {showLoader && <LoaderBackdrop />}
      <Box>
        <Box>
          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                position: { xs: 'static', lg: 'fixed' },
                backgroundColor: '#F5F5F5',
                height: { xs: 'auto', lg: '100vh' },
              }}
            >
              <RegisterSideInfo />
            </Grid>
            <Grid container xs={12} lg={12}>
              <Grid item lg={6}></Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    minHeight: '100vh',
                    padding: { xs: '30px', lg: '70px' },
                  }}
                >
                  <Box>
                    <Box sx={{ marginBottom: '15px' }}>
                      <Typography variant='h1'>Get Started</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '50px' }}>
                      <Typography sx={{ fontSize: '16px', color: '#8D8B90' }}>
                        Create your account now
                      </Typography>
                    </Box>
                    <form
                      onSubmit={handleSubmit((values) => {
                        registerMutation.mutateAsync({
                          password: values.password,
                          role: values.role,
                          email: values.email,
                          profile: {
                            firstName: values.firstName,
                            lastName: values.lastName,
                          },
                        });
                      })}
                    >
                      <Box sx={{ marginBottom: '21.5px' }}>
                        <Box
                          sx={{ marginBottom: { xs: '18px', sm: '11.5px' } }}
                        >
                          <Typography>
                            What account are you creating?
                          </Typography>
                        </Box>
                        <RadioGroup
                          value={selectedValue}
                          onChange={(e) => setValue('role', e.target.value)}
                        >
                          <Grid container rowSpacing={3} columnSpacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  cursor: 'pointer',
                                  border: '2px solid',
                                  paddingY: '10px',
                                  paddingX: '15px',
                                  borderRadius: '5px',
                                }}
                              >
                                <FormControlLabel
                                  value='guardian'
                                  control={<Radio />}
                                  label='Guardian'
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  cursor: 'pointer',
                                  border: '2px solid',
                                  paddingY: '10px',
                                  paddingX: '15px',
                                  borderRadius: '5px',
                                }}
                              >
                                <FormControlLabel
                                  value='sponsor'
                                  control={<Radio />}
                                  label='Sponsor'
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Box>
                      <Box sx={{ marginBottom: '21.5px' }}>
                        <Box sx={{ marginBottom: '11.5px' }}>
                          <Typography>Firstname</Typography>
                        </Box>
                        <Box sx={{ borderRadius: '10px' }}>
                          <TextField
                            placeholder='Enter your firstname'
                            sx={{
                              width: '100%',
                              borderRadius: '50px',
                            }}
                            inputProps={{
                              sx: {
                                borderRadius: '10px',
                              },
                            }}
                            {...register('firstName')}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ marginBottom: '21.5px' }}>
                        <Box sx={{ marginBottom: '11.5px' }}>
                          <Typography>Lastname</Typography>
                        </Box>
                        <Box>
                          <TextField
                            placeholder='Enter your lastname'
                            sx={{
                              width: '100%',
                              borderRadius: '10px',
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ marginBottom: '21.5px' }}>
                        <Box sx={{ marginBottom: '11.5px' }}>
                          <Typography>Email Address</Typography>
                        </Box>
                        <Box>
                          <TextField
                            placeholder='Enter your email address'
                            sx={{
                              width: '100%',
                              borderRadius: '10px',
                            }}
                            {...register('email')}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ marginBottom: '21.5px' }}>
                        <Box sx={{ marginBottom: '11.5px' }}>
                          <Typography>Password</Typography>
                        </Box>
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControl fullWidth variant='outlined'>
                              <OutlinedInput
                                id='outlined-adornment-password'
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      edge='end'
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                placeholder='Password'
                                {...register('password')}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ marginBottom: '50px' }}>
                        <Box sx={{ marginBottom: '11.5px' }}>
                          <Typography>Confirm Password</Typography>
                        </Box>
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControl fullWidth variant='outlined'>
                              <OutlinedInput
                                id='outlined-adornment-password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() =>
                                        setShowConfirmPassword(
                                          !showConfirmPassword
                                        )
                                      }
                                      edge='end'
                                    >
                                      {showConfirmPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                placeholder='Password'
                                {...register('confirmPassword')}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ marginBottom: '19px' }}>
                        <Button
                          type='submit'
                          variant='contained'
                          sx={{
                            width: '100%',
                            borderRadius: '1rem',
                            textTransform: 'none',
                            paddingY: '10px',
                            backgroundColor: '#335AE4',
                          }}
                        >
                          Create Account
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <Typography>
                          You already have an account?{' '}
                          <Link
                            href='/login'
                            style={{ color: '#335AE4', textDecoration: 'none' }}
                          >
                            Login
                          </Link>
                        </Typography>
                      </Box>
                    </form>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Register;
