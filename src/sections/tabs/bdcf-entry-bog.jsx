'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
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

// project imports
import { fetcher } from 'utils/axios';
import BDCFBogTable from 'sections/tables/bdcf-bog-table';

function BDCFEntryBogTab() {
  const [pickerDate, setPickerDate] = useState(() => dayjs());
  const [pickValue, setPickValue] = useState(() => formatDate(new Date()));
  const [dropdownValue, setDropdownValue] = useState('');
  const [textInput, setTextInput] = useState('');
  const [shift, setShift] = useState('Day');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRing, setSelectedRing] = useState({ location_id: '', name: '' });

  useEffect(() => {
    const fetchBoggingRings = async () => {
      try {
        const response = await fetcher('/prod-actual/bdcf/bog/');
        setData(response);
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
    const selectedValue = event.target.value;
    setDropdownValue(selectedValue);

    // Find the selected item in the data
    const selectedItem = data.find((item) => item.location_id === selectedValue);
    if (selectedItem) {
      // Update the selected ring state to pass as props
      setSelectedRing({
        location_id: selectedItem.location_id,
        name: selectedItem.value // Assuming 'value' is the human-readable name
      });
      console.log('Selected Ring:', selectedItem.location_id, selectedItem.value);
    }
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
    <Grid container spacing={2}>
      {/* Form Section */}
      <Grid item xs={12} md={4}>
        <Box sx={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Movement Date"
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
                <MenuItem key={item.location_id} value={item.location_id}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Tonnes" value={textInput} onChange={handleTextInputChange} fullWidth />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Add Bogging Record
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          {selectedRing?.location_id && selectedRing?.name ? (
            <BDCFBogTable location_id={selectedRing.location_id} ringName={selectedRing.name} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Tonnes</TableCell>
                  <TableCell>Entered (timestamp)</TableCell>
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

export default BDCFEntryBogTab;

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
