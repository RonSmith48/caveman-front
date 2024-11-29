'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, TextField, Select, MenuItem, Button, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';

// third party
import dayjs from 'dayjs';

// project imports
import { fetcher } from 'utils/axios';

function BDCFEntryChargeTab() {
  const [pickerDate, setPickerDate] = useState(() => dayjs());
  const [pickValue, setPickValue] = useState(() => formatDate(new Date()));
  const [dropdownValue, setDropdownValue] = useState('');
  const [textInput, setTextInput] = useState('');
  const [shift, setShift] = useState('Day');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoggingRings = async () => {
      try {
        const response = await fetcher('/prod/bdcf/charging/');
        setData(JSON.parse(response.data));
      } catch (error) {
        console.error('Error fetching active rings list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoggingRings();
  }, []);

  const handleDateChange = (val) => {
    setPickerDate(dayjs(val)); // whole date
    setPickValue(formatDate(val)); // formatted date for API
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleSave = () => {
    // Perform save action
    console.log('Save clicked');
    console.log('Date:', pickValue);
    console.log('Shift:', shift);
    console.log('Dropdown Value:', dropdownValue);
    console.log('Text Input:', textInput);
  };

  return (
    <Box sx={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Charge Date"
            format="DD/MM/YYYY"
            disableFuture={true}
            value={pickerDate}
            onChange={handleDateChange}
            textField={(params) => <TextField {...params} sx={{ width: '10rem' }} />}
          />
        </LocalizationProvider>

        <RadioGroup row value={shift} onChange={handleShiftChange}>
          <FormControlLabel value="Day" control={<Radio />} label="Day" />
          <FormControlLabel value="Night" control={<Radio />} label="Night" />
        </RadioGroup>
      </Box>

      <FormControl fullWidth>
        <InputLabel id="dropdown-label">Select Ring</InputLabel>
        <Select labelId="dropdown-label" value={dropdownValue} label="Select Ring" onChange={handleDropdownChange}>
          {data.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Detonator" value={textInput} onChange={handleTextInputChange} fullWidth />

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
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
