'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Autocomplete,
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
import BDCFChargeTable from 'sections/tables/bdcf-charge-table';

function BDCFEntryFireTab() {
  const [data, setData] = useState({ drilled_list: [], designed_list: [] });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [detOptions, setDetOptions] = useState([]);
  const [ringNumDrop, setRingNumDrop] = useState([]);
  const [isRecharge, setIsRecharge] = useState(false);
  const [chargedRings, setChargedRings] = useState([]);
  const [rings, setRings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRings, setLoadingRings] = useState(false);
  const [oredriveValue, setOredriveValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chargeResponse, detTypes] = await Promise.all([
          fetcher('/prod-actual/bdcf/charge/'),
          fetcher('/settings/explosive-types-list/')
        ]);

        setData(chargeResponse.data);
        setDropdownOptions(chargeResponse.data.drilled_drives_list);
        if (detTypes) {
          setDetOptions(detTypes.data.value);
        }
      } catch (error) {
        console.error('Error fetching designed rings list:', error);
        enqueueSnackbar('Check explosive list types', { variant: 'error' });
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
    conditions: Yup.array().of(Yup.string()),
    explosive: Yup.string().required('Explosive type is required')
  });

  const formik = useFormik({
    initialValues: {
      pickerDate: dayjs().subtract(1, 'day'),
      shift: 'Day',
      selectOredrive: '',
      selectRing: '',
      comment: '',
      recharged: isRecharge,
      incomplete: false,
      charged_short: false,
      blocked_holes: false,
      explosive: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedDate = formatDate(values.pickerDate);

        // Construct the conditions list
        const conditions = [];
        if (values.recharged) conditions.push('Recharged Holes');
        if (values.incomplete) conditions.push('Incomplete');
        if (values.charged_short) conditions.push('Charged Short');
        if (values.blocked_holes) conditions.push('Blocked Holes');

        const payload = {
          date: formattedDate,
          shift: values.shift,
          location_id: values.selectRing, // Use selectRing as location_id
          comment: values.comment || null,
          conditions: conditions, // Send conditions as a list
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

  const handleSelectOredrive = async (event) => {
    const lvl_od = event.target.value;
    formik.setFieldValue('selectOredrive', lvl_od);
    formik.setFieldValue('selectRing', '');

    setLoadingRings(true);

    try {
      const response = await fetcher(`/prod-actual/bdcf/charge/${lvl_od}/`);
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
    const { selectOredrive, selectRing, explosive, blocked_holes, incomplete, comment } = formik.values;

    // Check if mandatory fields are filled
    const mandatoryFieldsFilled = selectOredrive && selectRing;

    // Check if explosive is required and valid
    const explosiveValid = blocked_holes || explosive;

    // Check if blocked_holes or incomplete require a comment
    const commentValid = (!blocked_holes && !incomplete) || comment;

    // Return the final condition
    return !(mandatoryFieldsFilled && explosiveValid && commentValid);
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
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Level</FormLabel>
              <Select
                name="level"
                value={formik.values.level}
                onChange={(e) => handleSelectLevel(e, values, setFieldValue, setTouched)}
                disabled={levels.length === 0}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Rings Autocomplete */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                disableClearable
                options={rings}
                getOptionLabel={(option) => option.alias}
                value={formik.values.ring || []}
                onChange={(_, newValue) => setFieldValue('ring', newValue)}
                renderOption={(props, option, { selected }) => (
                  <li key={option.alias} {...props} style={{ backgroundColor: selected ? '#f0f0f0' : 'transparent' }}>
                    {option.alias}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="Select Rings" variant="outlined" />}
                disabled={rings.length === 0}
              />
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
                  <TableCell>Completed</TableCell>
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
