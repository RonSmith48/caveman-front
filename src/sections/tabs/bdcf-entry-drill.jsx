'use client';

import React, { useState } from 'react';

// material-ui
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';

// third party
import dayjs from 'dayjs';

// project imports

function BDCFEntryDrillTab() {
  const [pickerDate, setPickerDate] = useState(() => dayjs());
  const [pickValue, setPickValue] = useState(() => formatDate(new Date()));

  const handleDateChange = (val) => {
    setPickerDate(dayjs(val)); // whole date
    setPickValue(formatDate(val)); // formatted date for API
  };

  return (
    <Box sx={{ paddingBottom: '10px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Drill Complete Date"
          format="DD/MM/YYYY"
          disableFuture={true}
          value={pickerDate}
          onChange={handleDateChange}
          textField={(params) => <TextField {...params} sx={{ width: '10rem' }} />}
        />
      </LocalizationProvider>
    </Box>
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
