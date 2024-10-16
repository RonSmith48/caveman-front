'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

// project imports
import MainCard from 'components/MainCard';
import { fetcher, fetcherPost, fetcherPatch } from 'utils/axios';

function IPGeneralSettingsForm() {
  const [settings, setSettings] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true);
  const [distValue, setDistValue] = useState(2);

  const fetchSettings = async () => {
    try {
      const data = await fetcher('/settings/ip_general'); // Using the fetcher function
      if (data) {
        setSettings(data.value); // Assuming the setting value is stored in `value`
      } else {
        setSettings({});
      }
    } catch (error) {
      console.error('Error fetching settings:', error); // If the setting does not exist
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  function valuetext(value) {
    return value;
  }

  const handleChange = (event, newValue, valuetext) => {
    setDistValue(newValue);
    console.log('valuetext', valuetext);
  };

  const saveSettings = async (values) => {
    const payload = {
      key: 'ip_general', // Unique key for the setting
      value: values // Save all form fields as JSON
    };

    try {
      if (settings && Object.keys(settings).length > 0) {
        // Update setting if it exists
        await fetcherPatch(`/settings/ip_general/`, payload);
        enqueueSnackbar('IP general settings updated', { variant: 'success' });
      } else {
        // Create new setting if it does not exist
        await fetcherPost('/settings/', payload);
        enqueueSnackbar('IP general settings created', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      enqueueSnackbar('Error saving setting', { variant: 'error' });
    }
  };

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <MainCard title="Integrated Planning General Settings" secondary="help">
      {!loading ? (
        <Formik
          enableReinitialize={true}
          initialValues={{ distValue: settings ? settings.distValue || 2 : 2 }}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            setSubmitting(true);
            saveSettings(values)
              .then(() => {
                setStatus({ success: true });
              })
              .catch((err) => {
                setStatus({ success: false });
                setErrors({ submit: err.message });
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Typography>Max distance allowed between conceptual and designed rings</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Ring threshold Dist (m):</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Slider
                        sx={{ mt: 2.5 }}
                        aria-label="dist-threshold"
                        name="distValue"
                        onChange={handleChange}
                        value={values.distValue}
                        getAriaValueText={valuetext}
                        step={0.1}
                        valueLabelDisplay="on"
                        min={0.1}
                        max={5}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                  <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                    Save
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </Formik>
      ) : (
        <CircularProgress />
      )}
    </MainCard>
  );
}

export default IPGeneralSettingsForm;
