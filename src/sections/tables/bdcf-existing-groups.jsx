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

const BDCFExistingGroups = () => {
  const [openHelp, setOpenHelp] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/prod-actual/bdcf/groups/existing/');
        setGroups(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching designed rings list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Total Volume</TableCell>
              <TableCell>Total Tonnage</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*             {groups.map((group) => (
              <Row key={group.multifire_group_id} row={group} />
            ))} */}
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
    </MainCard>
  );
};

export default BDCFExistingGroups;
