'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Box,
  Checkbox,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography
} from '@mui/material';

// third party
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

// project imports
import { fetcher, fetcherPost } from 'utils/axios';
import BDCFFireTable from 'sections/tables/bdcf-fire-table';

function BDCFEntryFireTab() {
  const [levelOptions, setLevelOptions] = useState([]);
  const [driveRingOptions, setdriveRingOptions] = useState([]);
  const [firedRings, setFiredRings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRings, setLoadingRings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fireResponse = await fetcher('/prod-actual/bdcf/fire/');
        setLevelOptions(fireResponse.data);
      } catch (error) {
        console.error('Error fetching charged rings list:', error);
        enqueueSnackbar('Error fetching levels containing charged rings', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    pickerDate: Yup.date().required('Date is required'),
    shift: Yup.string().required('Shift is required')
  });

  const formik = useFormik({
    initialValues: {
      pickerDate: dayjs().subtract(1, 'day'),
      shift: 'Day',
      selectLevel: '',
      selectRing: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedDate = formatDate(values.pickerDate);

        const payload = {
          date: formattedDate,
          shift: values.shift,
          location_id: values.selectRing // Use selectRing as location_id
        };

        const response = await fetcherPost('/prod-actual/bdcf/fire/', payload);

        enqueueSnackbar(response.data.msg.body, { variant: response.data.msg.type });

        // Optionally reset the form or refetch data
        formik.resetForm();
        const currentLevel = values.selectLevel; // Get the current oredrive
        if (currentLevel) {
          await handleSelectLevel({ target: { value: currentLevel } }); // Refetch rings for the current oredrive
        }
      } catch (error) {
        console.error('Error processing ring:', error);
        enqueueSnackbar('Failed to process ring. Please try again.', { variant: 'error' });
      }
    }
  });

  const handleSelectLevel = async (event) => {
    const lvl = event.target.value;
    formik.setFieldValue('selectLevel', lvl);
    formik.setFieldValue('selectRing', '');

    setLoadingRings(true);

    try {
      const response = await fetcher(`/prod-actual/bdcf/fire/${lvl}/`);
      setFiredRings(response.data.fired_rings || []);
      setdriveRingOptions(response.data.charged_rings);
      setLoadingRings(false);
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching rings:', error);
      enqueueSnackbar('Error fetching rings', { variant: 'error' });
      setLoadingRings(false);
    }
  };

  const isSubmitDisabled = () => {};

  return (
    <Grid container spacing={2}>
      {/* Form Section */}
      <Grid item xs={12} md={4}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fire Date"
                  format="DD/MM/YYYY"
                  disableFuture
                  value={formik.values.pickerDate}
                  onChange={(date) => formik.setFieldValue('pickerDate', date)}
                  textField={(params) => <TextField {...params} sx={{ width: '10rem' }} />}
                />
              </LocalizationProvider>

              <RadioGroup row value={formik.values.shift} onChange={(event) => formik.setFieldValue('shift', event.target.value)}>
                <FormControlLabel value="Day" control={<Radio />} label="Day" />
                <FormControlLabel value="Night" control={<Radio />} label="Night" />
              </RadioGroup>
            </Box>

            {/* Level Dropdown */}
            <TextField select label="Select Level" value={formik.values.selectLevel} onChange={handleSelectLevel} fullWidth>
              {levelOptions.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select DriveRing"
              value={formik.values.selectRing}
              onChange={(event) => formik.setFieldValue('selectRing', event.target.value)}
              fullWidth
              disabled={!formik.values.selectLevel} // Disable until Level is selected
            >
              {driveRingOptions.map((ring) => (
                <MenuItem key={ring.location_id} value={ring.location_id}>
                  {ring.alias}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitDisabled()}>
              Process Ring
            </Button>
          </Box>
        </form>
      </Grid>

      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          {formik.values.selectLevel ? (
            loadingRings ? (
              <Typography variant="body2">Loading rings...</Typography>
            ) : (
              <BDCFFireTable level={formik.values.selectLevel} ringData={firedRings} handleSelectLevel={handleSelectLevel} />
            )
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Alias</TableCell>
                  <TableCell>Contributor</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          )}
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default BDCFEntryFireTab;

// ============= Functions ====================

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
