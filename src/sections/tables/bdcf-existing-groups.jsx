'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { fetcher } from 'utils/axios';
import { enqueueSnackbar } from 'notistack';
import MainCard from 'components/MainCard';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SvgAvatar from 'components/SvgAvatar';

const BDCFExistingGroups = () => {
  const [openHelp, setOpenHelp] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState([true]);
  const SM_AVATAR_SIZE = 32;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/prod-actual/bdcf/groups/existing/');
        setGroups(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching designed rings list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  return (
    <MainCard
      title="Existing Groups"
      secondary={
        <Tooltip title="Help">
          <IconButton onClick={() => setOpenHelp(true)} size="small">
            <HelpOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      sx={{ '& .MuiCardHeader-root': { padding: '16px 16px' } }}
    >
      {/* Collapsible Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Oredrive</TableCell>
              <TableCell>Contributor</TableCell>
              <TableCell>Inspect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && groups.length > 0 ? (
              groups.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {new Date(row.date).getDate().toString().padStart(2, '0')}-
                    {(new Date(row.date).getMonth() + 1).toString().padStart(2, '0')}-{new Date(row.date).getFullYear()}
                  </TableCell>

                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.oredrive}</TableCell>
                  <TableCell>
                    <Tooltip title={row.contributor.full_name}>
                      <div
                        style={{
                          width: SM_AVATAR_SIZE,
                          height: SM_AVATAR_SIZE,
                          backgroundColor: row.contributor?.bg_colour,
                          borderRadius: '50%', // Makes the background a circle
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden' // Ensures the avatar stays inside the circle
                        }}
                      >
                        <SvgAvatar src={row.contributor?.avatar} alt={row.contributor?.full_name} size={SM_AVATAR_SIZE} />
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Inspect">
                      <IconButton onClick={() => handleOpenDialog(row)}>
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {loading ? 'Loading...' : 'No data available'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Help Dialog */}
      <Dialog open={openHelp} onClose={() => setOpenHelp(false)} fullWidth>
        <DialogTitle>How it Works</DialogTitle>
        <DialogContent>
          <p>How it works goes here</p>
        </DialogContent>
      </Dialog>

      {/* Inspect Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen>
        <DialogTitle>Inspection Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <Typography variant="h6">Level: {selectedRow.level}</Typography>
              <Typography variant="subtitle1">Contributor: {selectedRow.contributor.full_name}</Typography>
              <Typography variant="subtitle1">Pooled Rings:</Typography>
              <ul>
                {selectedRow.pooled_rings?.rings.map((ring) => (
                  <li key={ring.location_id}>{ring.alias}</li>
                ))}
              </ul>
              <Typography variant="subtitle1">Group Rings:</Typography>
              <ul>
                {selectedRow.group_rings.map((ring) => (
                  <li key={ring.location_id}>
                    {ring.alias} - {ring.status}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default BDCFExistingGroups;
