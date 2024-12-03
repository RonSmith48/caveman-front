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
import BDCFChargeTable from 'sections/tables/bdcf-charge-table';

function BDCFEntryChargeTab() {
  const [data, setData] = useState({ drilled_list: [], designed_list: [] });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [ringNumDrop, setRingNumDrop] = useState([]);
  const [isRedrill, setIsRedrill] = useState(false);
  const [drilledRings, setDrilledRings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRings, setLoadingRings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/prod-actual/bdcf/charge/');
        setData(response.data);
        setDropdownOptions(response.data.drilled_drives_list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching designed rings list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    has_bg: Yup.boolean(),
    making_water: Yup.boolean()
  });

  const formik = useFormik({
    initialValues: {
      pickerDate: dayjs().subtract(1, 'day'),
      shift: 'Day',
      selectOredrive: '',
      selectRing: '',
      drilled_mtrs: '',
      redrill: isRedrill,
      half_drilled: false,
      lost_rods: false,
      has_bg: false,
      making_water: false
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedDate = formatDate(values.pickerDate);
        const payload = {
          date: formattedDate,
          shift: values.shift,
          location_id: values.selectRing, // Use selectRing as location_id
          drilled_mtrs: values.drilled_mtrs || null,
          redrill: isRedrill,
          half_drilled: values.half_drilled,
          lost_rods: values.lost_rods,
          has_bg: values.has_bg,
          making_water: values.making_water,
          status: 'Drilled'
        };

        const response = await fetcherPost('/prod-actual/bdcf/drill/', payload);

        enqueueSnackbar(response.data.msg.body, { variant: response.data.msg.type });

        // Optionally reset the form or refetch data
        formik.resetForm();
        const currentOredrive = values.selectOredrive; // Get the current oredrive
        if (currentOredrive) {
          await handleSelectOredrive({ target: { value: currentOredrive } }); // Refetch rings for the current oredrive
        }
      } catch (error) {
        console.error('Error processing drill return:', error);
        enqueueSnackbar('Failed to process drill return. Please try again.', { variant: 'error' });
      }
    }
  });

  const handleIsRedrillToggle = () => {
    formik.setFieldValue('selectOredrive', '');
    formik.setFieldValue('selectRing', '');
    setIsRedrill(!isRedrill);
    setDropdownOptions(isRedrill ? data.designed_list : data.drilled_list); // Toggle between lists
  };

  const handleSelectOredrive = async (event) => {
    const lvl_od = event.target.value;
    formik.setFieldValue('selectOredrive', lvl_od);
    formik.setFieldValue('selectRing', '');

    setLoadingRings(true);

    try {
      const response = await fetcher(`/prod-actual/bdcf/charged/${lvl_od}/`);
      const rings = isRedrill ? response.data.drilled : response.data.designed;

      setDrilledRings(response.data.drilled_rings);
      setRingNumDrop(rings);
      setDrilledRings(response.data.drilled_rings || []);
      setLoadingRings(false);
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching rings:', error);
      enqueueSnackbar('Error fetching rings', { variant: 'error' });
      setLoadingRings(false);
    }
  };

  const handleSelectRing = async (event) => {
    const selectedRing = event.target.value;
    formik.setFieldValue('selectRing', selectedRing);
  };

  const handleIncomplete = () => {
    formik.setFieldValue('Incomplete', !formik.values.incomplete);
  };

  const isSubmitDisabled = () => {
    // Check required fields and conditionally disable button
    return !(formik.values.selectOredrive && formik.values.selectRing && (!formik.values.charge_short || formik.values.drilled_mtrs));
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
                  label="Charge Date"
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
                    control={<Checkbox checked={formik.values.incomplete} onChange={handleIncomplete} />}
                    label="Incomplete"
                    labelPlacement="end"
                  />
                  <FormControlLabel control={<Checkbox checked={formik.values.incomplete} />} label="Charged Short" labelPlacement="end" />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={formik.values.blocked} onChange={() => formik.setFieldValue('blocked', !formik.values.blocked)} />
                    }
                    label="Blocked (No charge)"
                    labelPlacement="end"
                  />
                  <FormControlLabel control={<Checkbox disabled />} label="Is Recharge" labelPlacement="end" />
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
                {dropdownOptions.map((item) => (
                  <MenuItem key={item.level_oredrive} value={item.level_oredrive}>
                    {item.level_oredrive}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Select Ring</InputLabel>
              <Select labelId="dropdown-label" value={formik.values.selectRing || ''} label="Select Ring" onChange={handleSelectRing}>
                {ringNumDrop.map((item) => (
                  <MenuItem key={item.location_id} value={item.location_id}>
                    {item.ring_number_txt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Charged With</InputLabel>
              <Select labelId="dropdown-label" value={formik.values.explosive || ''} label="Charged With">
                {ringNumDrop.map((item) => (
                  <MenuItem key={item.location_id} value={item.location_id}>
                    {item.ring_number_txt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitDisabled()}>
              Process Ring
            </Button>
          </Box>
        </form>
      </Grid>

      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          {formik.values.selectOredrive ? (
            loadingRings ? (
              <Typography variant="body2">Loading rings...</Typography>
            ) : (
              <BDCFChargeTable
                oredrive={formik.values.selectOredrive}
                ringData={drilledRings}
                handleSelectOredrive={handleSelectOredrive}
              />
            )
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Ring</TableCell>
                  <TableCell>Conditions</TableCell>
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

export default BDCFEntryChargeTab;

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
