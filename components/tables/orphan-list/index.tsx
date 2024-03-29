import { Box, Checkbox, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PillWithDot } from '../../pills';
import { ImageNameEmailCell } from '../cells';

function createData(
  image: string,
  name: string,
  email: string,
  industry: string,
  dateOfApplication: string,
  founder: string,
  status: string,
) {
  return { image, name, email, industry, dateOfApplication, founder, status };
}

const rows = Array(8).fill(
  createData(
    '/assets/images/avatar.png',
    'Dinko Concept LTD',
    'dinkoconcept@tech.com',
    'Technology',
    '22 Jan 2022',
    '20 Dec 2022',
    'Approved',
  ),
);

export default function OrphanListTable() {
  return (
    <TableContainer sx={{ backgroundColor: 'white' }}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '14px', color: '#667085' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: '-13px',
                  ml: '-15px',
                }}
              >
                <Box sx={{ marginLeft: '20px' }}>
                  <Checkbox />
                </Box>
                <Box>Name of startup</Box>
              </Box>
            </TableCell>
            {[
              'Industry',
              'Date of Application',
              'Application Deadline',
              'Status',
              'Action',
            ].map((heading, index) => (
              <TableCell
                key={index}
                sx={{ fontSize: '14px', color: '#667085' }}
                align="left"
              >
                <Box sx={{ mb: '-13px' }}>{heading}</Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box
                  sx={{ display: 'flex', alignItems: 'center', ml: '-15px' }}
                >
                  <Box sx={{ marginLeft: '20px' }}>
                    <Checkbox />
                  </Box>
                  <ImageNameEmailCell
                    image={row.image}
                    name={row.name}
                    email={row.email}
                  />
                </Box>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{ fontSize: '14px', fontWeight: 600, color: '#3D3B3C' }}
                >
                  {row.industry}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#667085' }}
                >
                  {row.dateOfApplication}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#667085' }}
                >
                  {row.founder}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <PillWithDot
                  text={row.status}
                  bgColor={'#ECFDF3'}
                  dotColor={'#12B76A'}
                  textColor={'#12B76A'}
                />
              </TableCell>
              <TableCell align="left">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: '20px', cursor: 'pointer', mt: '-5px' }}>
                    <Link href="#">
                      <Typography
                        sx={{
                          textDecoration: 'underline',
                          color: '#007A27',
                          fontSize: '15px',
                          fontWeight: 600,
                        }}
                      >
                        {'View'}
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ cursor: 'pointer' }}>
                    <Image
                      width={21}
                      height={21}
                      alt={'Trash Icon'}
                      src={'/trash.svg'}
                    />
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}