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
  const [detOptions, setDetOptions] = useState([]);
  const [ringNumDrop, setRingNumDrop] = useState([]);
  const [isRecharge, setIsRecharge] = useState(false);
  const [chargedRings, setChargedRings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRings, setLoadingRings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/prod-actual/bdcf/charge/');
        setData(response.data);
        setDropdownOptions(response.data.drilled_drives_list);
        const detTypes = await fetcher('/settings/explosive-types-list');
        if (detTypes){
          setDetOptions(detTypes.data.value);
        }
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
    comment: Yup.string(),
    recharge: Yup.boolean(),
    incomplete: Yup.boolean(),
    charged_short: Yup.boolean(),
    blocked_holes: Yup.boolean(),
    explosive: Yup.string().required('Explosive type is required')
  });

  const formik = useFormik({
    initialValues: {
      pickerDate: dayjs().subtract(1, 'day'),
      shift: 'Day',
      selectOredrive: '',
      selectRing: '',
      comment: '',
      recharge: isRecharge,
      incomplete: false,
      charged_short: false,
      blocked_holes: false,
      explosive: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedDate = formatDate(values.pickerDate);
        const payload = {
          date: formattedDate,
          shift: values.shift,
          location_id: values.selectRing, // Use selectRing as location_id
          comment: values.comment || null,
          recharge: isRecharge,
          incomplete: values.incomplete,
          charged_short: values.charged_short,
          blocked_holes: values.blocked_holes,
          status: 'Charged',
          explosive: values.explosive
        };

        const response = await fetcherPost('/prod-actual/bdcf/charge/', payload);

        enqueueSnackbar(response.data.msg.body, { variant: response.data.msg.type });

        // Optionally reset the form or refetch data
        formik.resetForm();
        const currentOredrive = values.selectOredrive; // Get the current oredrive
        if (currentOredrive) {
          await handleSelectOredrive({ target: { value: currentOredrive } }); // Refetch rings for the current oredrive
        }
      } catch (error) {
        console.error('Error processing ring:', error);
        enqueueSnackbar('Failed to process ring. Please try again.', { variant: 'error' });
      }
    }
  });

  const handleIsRechargeToggle = () => {
    formik.setFieldValue('selectOredrive', '');
    formik.setFieldValue('selectRing', '');
    setIsRecharge(!isRecharge);
    setDropdownOptions(isRecharge ? data.designed_list : data.drilled_list); // Toggle between lists
  };

  const handleIncomplete = () => {
    formik.setFieldValue('incomplete', !formik.values.incomplete);
  };

  const handleBlockedHoles = () => {
    formik.setFieldValue('blocked_holes', !formik.values.blocked_holes);
  };

  const handleChargedShort = () => {
    formik.setFieldValue('charged_short', !formik.values.charged_short);
  };

  const handleSelectOredrive = async (event) => {
    const lvl_od = event.target.value;
    formik.setFieldValue('selectOredrive', lvl_od);
    formik.setFieldValue('selectRing', '');

    setLoadingRings(true);

    try {
      const response = await fetcher(`/prod-actual/bdcf/charge/${lvl_od}/`);
      console.log(response);
      const rings = isRecharge ? response.data.charged : response.data.drilled;

      setChargedRings(response.data.charged_rings);
      setRingNumDrop(rings);
      setChargedRings(response.data.charged_rings || []);
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

  const isSubmitDisabled = () => {
    // Check required fields and conditionally disable button
    return !(formik.values.selectOredrive && formik.values.selectRing && formik.values.explosive && (!formik.values.incomplete || formik.values.comment));
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
                  <FormControlLabel
                    control={<Checkbox checked={formik.values.charged_short} onChange={handleChargedShort} />}
                    label="Charged Short"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={formik.values.blocked_holes} onChange={handleBlockedHoles} />}
                    label="Blocked (No charge)"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={<Checkbox disabled />}
                    label="Is Recharge"
                    labelPlacement="end"
                    onChange={handleIsRechargeToggle}
                  />
                </Grid>
              </FormGroup>
            </FormControl>

            {/* Conditionally render the Drilled Meters input */}
            {formik.values.incomplete && (
              <TextField
                label="Comment"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
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
              <InputLabel id="explosive-dropdown-label">Charged With</InputLabel>
              <Select
                labelId="explosive-dropdown-label"
                value={formik.values.explosive || ''}
                onChange={(event) => formik.setFieldValue('explosive', event.target.value)}
                label="Charged With"
              >
                {detOptions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.explosive && formik.errors.explosive && (
                <Typography variant="body2" color="error">
                  {formik.errors.explosive}
                </Typography>
              )}
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
                ringData={chargedRings}
                handleSelectOredrive={handleSelectOredrive}
              />
            )
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Completion Date</TableCell>
                  <TableCell>Ring</TableCell>
                  <TableCell>Detonator</TableCell>
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
