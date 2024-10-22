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
import BDCFDrillTable from 'sections/tables/bdcf-drill-table';

function BDCFEntryDrillTab() {
  const [data, setData] = useState([]);
  const [ringList, setRingList] = useState([]);
  const [apiPath, setApiPath] = useState('to-drill');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoggingRings = async () => {
      try {
        const response = await fetcher('/prod-actual/bdcf/drill/');
        setData(response);
      } catch (error) {
        console.error('Error fetching designed rings list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoggingRings();

    // formik.setFieldValue('pickerDate', dayjs().subtract(1, 'day')); // Yesterday's date
    // formik.setFieldValue('shift', 'Day');
  }, []);

  const validationSchema = Yup.object().shape({
    pickerDate: Yup.date().required('Date is required'),
    shift: Yup.string().required('Shift is required'),
    selectOredrive: Yup.string().required('Ore drive is required'),
    selectRing: Yup.string().required('Ring is required'),
    drilled_mtrs: Yup.number(),
    redrill: Yup.boolean(),
    half_drilled: Yup.boolean(),
    lost_rods: Yup.boolean(),
    has_bg: Yup.boolean()
  });

  const formik = useFormik({
    initialValues: {
      pickerDate: dayjs().subtract(1, 'day'),
      shift: 'Day',
      selectOredrive: '',
      selectRing: '',
      drilled_mtrs: '',
      redrill: false,
      half_drilled: false,
      lost_rods: false,
      has_bg: false
    },
    validationSchema, // Add the validation schema here
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    }
  });

  const handleSelectOredrive = async (event) => {
    const lvl_od = event.target.value;
    formik.setFieldValue('selectOredrive', lvl_od);
    formik.setFieldValue('selectRing', '');

    try {
      const response = await fetcher(`/prod-actual/bdcf/${apiPath}/${lvl_od}/`);
      setRingList(response);
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching rings:', error);
      enqueueSnackbar('Error fetching rings', { variant: 'error' });
    }
  };

  const handleSelectRing = async (event) => {
    const selectedRing = event.target.value;
    formik.setFieldValue('selectRing', selectedRing);

    /*     const selectedItem = ringList.find((item) => item.level_oredrive === selectedRing);
    if (selectedItem) {
      formik.setFieldValue('selectedRing', {
        location_id: selectedItem.level_oredrive,
        name: selectedItem.level_oredrive
      });
    } */
  };

  const handleRedrill = () => {
    formik.setFieldValue('half_drilled', !formik.values.half_drilled);
    setApiPath('drilled');
  };

  const isSubmitDisabled = () => {
    // Check required fields and conditionally disable button
    return !(
      (formik.values.selectOredrive && formik.values.selectRing && (!formik.values.half_drilled || formik.values.drilled_mtrs)) // if half_drilled is checked, drilled_mtrs must be filled
    );
  };

  const handleSave = async (values) => {
    const formattedDate = formatDate(formik.values.pickerDate);
    const location_id = formik.values.ringdropdownValue;

    // Prepare the payload with the formatted date
    const payload = {
      date: formattedDate,
      shift: formik.values.shift,
      location_id: formik.values.ringdropdownValue
    };
  };

  return (
    <Grid container spacing={2}>
      {/* Form Section */}
      <Grid item xs={12} md={4}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Activity Date"
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

            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <Grid xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.redrilled}
                        onChange={() => formik.setFieldValue('redrill', !formik.values.redrilled)}
                      />
                    }
                    label="Is Redrill"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={formik.values.half_drilled} onChange={handleRedrill} />}
                    label="Incomplete"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.lost_rods}
                        onChange={() => formik.setFieldValue('lost_rods', !formik.values.lost_rods)}
                      />
                    }
                    label="Has Lost Rods"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={formik.values.has_bg} onChange={() => formik.setFieldValue('has_bg', !formik.values.has_bg)} />
                    }
                    label="BG Reported"
                    labelPlacement="end"
                  />
                </Grid>
              </FormGroup>
            </FormControl>

            {/* Conditionally render the Drilled Meters input */}
            {formik.values.half_drilled && (
              <TextField
                label="Drilled Meters"
                name="drilled_mtrs"
                value={formik.values.drilled_mtrs}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.drilled_mtrs && Boolean(formik.errors.drilled_mtrs)}
                helperText={formik.touched.drilled_mtrs && formik.errors.drilled_mtrs}
                fullWidth
              />
            )}

            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Select Ore Drive</InputLabel>
              <Select
                labelId="dropdown-label"
                value={formik.values.selectOredrive || ''}
                label="Select Ore Drive"
                onChange={handleSelectOredrive}
              >
                {data.map((item) => (
                  <MenuItem key={item.level_oredrive} value={item.level_oredrive}>
                    {item.level_oredrive}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Select Ring</InputLabel>
              <Select labelId="dropdown-label" value={formik.values.selectRing || ''} label="Select Ring" onChange={handleSelectRing}>
                {ringList.map((item) => (
                  <MenuItem key={item.location_id} value={item.location_id}>
                    {item.ring_number_txt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitDisabled()}>
              Process Drill Return
            </Button>
          </Box>
        </form>
      </Grid>

      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          {formik.values.dropdownValue ? (
            <BDCFDrillTable location_id={formik.values.selectedRing?.location_id} ringName={formik.values.selectedRing?.name} /> // This will trigger a re-render on change
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Ring</TableCell>
                  <TableCell>Status</TableCell>
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

export default BDCFEntryDrillTab;

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
