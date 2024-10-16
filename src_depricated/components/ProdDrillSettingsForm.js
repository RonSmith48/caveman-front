import React, { useState, useEffect } from 'react';
import axios from 'api/axios';
import { TextField, Button, Grid, Autocomplete, Alert, Snackbar, CircularProgress, Box, Divider, Chip } from '@mui/material';

// TODO: Make this a table lookup
const manual_mtr_code = ['MetresDrilledProd', 'DrilledHoledProd', 'HOLESDRILLED', 'Mdrilled', 'MTR102MMDOWN'];
const auto_mtr_code = ['Auto Mtrs'];
const cleanout_mtr_code = ['CLEANOUTMTR'];

const ProdDrillSettingsForm = () => {
  const [manMtrsCode, setManMtrsCode] = useState('');
  const [autoMtrsCode, setAutoMtrsCode] = useState('');
  const [nonProdMtrsCode, setNonProdMtrsCode] = useState('');
  const [cleanoutMtrsCode, setCleanoutMtrsCode] = useState('');

  const [createRecord, setCreateRecord] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const formData = {
    manual_mtrs_code: manMtrsCode,
    auto_mtrs_code: autoMtrsCode,
    nonprod_mtrs_code: nonProdMtrsCode,
    cleanout_mtrs_code: cleanoutMtrsCode
  };

  const fetchCurrentSettings = async () => {
    try {
      const key = 'production_drill_settings';
      const response = await axios.get(`/api/settings/${key}/`);
      const currentSettings = response.data.value;
      console.log(currentSettings);

      setManMtrsCode(currentSettings.manual_mtrs_code);
      setAutoMtrsCode(currentSettings.auto_mtrs_code);
      setNonProdMtrsCode(currentSettings.nonprod_mtrs_code);
      setCleanoutMtrsCode(currentSettings.cleanout_mtrs_code);

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCreateRecord(true);
      } else {
        console.error('Error fetching settings:', error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentSettings();
  }, []);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const key = 'production_drill_settings';

      if (createRecord) {
        const response = await axios.post('/api/settings/', {
          key: 'production_drill_settings',
          value: formData
        });
        console.log('New record created:', response);
      } else {
        const response = await axios.put(`/api/settings/${key}/`, {
          key: 'production_drill_settings',
          value: formData
        });
        console.log('Settings updated:', response);
      }
      handleSnackbarOpen('Save successful', 'success');
    } catch (error) {
      console.error('Error:', error);
      handleSnackbarOpen('Settings save failed', 'error');
    }
  };

  return (
    <div>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Chip label="Production Drill Actuals" />
              </Divider>
            </Grid>
            <Grid item xs={4} textAlign={'right'}></Grid>
            <Grid item xs={8}>
              Pitram measure codes for summing productive meters drilled
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
              Manual Mtrs Code
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                options={manual_mtr_code}
                id="MANUAL_MTR_CODE"
                value={manMtrsCode}
                onChange={(event, newValue) => {
                  setManMtrsCode(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" name="MANUAL_MTRS" />}
              />
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
              Auto Mtrs Code
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                options={auto_mtr_code}
                id="AUTO_MTR_CODE"
                value={autoMtrsCode}
                onChange={(event, newValue) => {
                  setAutoMtrsCode(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" name="AUTO_MTRS" />}
              />
            </Grid>
            <Grid item xs={4} textAlign={'right'}></Grid>
            <Grid item xs={8}>
              Pitram measure code for summing non-productive meters. Measure code can be the same as productive meters. Parent status is
              Non-Productive Drilling.
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
              Non-Productive Mtrs Code
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                options={manual_mtr_code}
                id="NONPROD_MTR_CODE"
                value={nonProdMtrsCode}
                onChange={(event, newValue) => {
                  setNonProdMtrsCode(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" name="NONPROD_MTRS" />}
              />
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
              Cleanout Mtrs Code
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                options={cleanout_mtr_code}
                id="CLEANOUT_MTR_CODE"
                value={cleanoutMtrsCode}
                onChange={(event, newValue) => {
                  setCleanoutMtrsCode(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" name="CLEANOUT_MTRS" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" type="submit" color="primary">
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000} // Duration to display the Snackbar (5 seconds)
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProdDrillSettingsForm;
