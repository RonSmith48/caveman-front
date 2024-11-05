'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

// project imports
import MainCard from 'components/MainCard';
import { fetcher, fetcherPost, fetcherPatch } from 'utils/axios';

function DrillScenarioHeadersSettingsForm() {
  const [headers, setHeaders] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await fetcher('/settings/drill_scenario_file_headers'); // Using the fetcher function
      if (data) {
        setHeaders(data.value); // Assuming the setting value is stored in `value`
      } else {
        setHeaders({});
      }
    } catch (error) {
      console.error('Error fetching settings:', error); // If the setting does not exist
      setHeaders({});
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (values) => {
    const payload = {
      key: 'drill_scenario_file_headers', // Unique key for the setting
      value: values // Save all form fields as JSON
    };

    try {
      if (headers && Object.keys(headers).length > 0) {
        // Update setting if it exists
        await fetcherPatch(`/settings/`, payload);
        enqueueSnackbar('CSV file headers updated', { variant: 'success' });
      } else {
        // Create new setting if it does not exist
        await fetcherPost('/settings/', payload);
        enqueueSnackbar('CSV file headers setting created', { variant: 'success' });
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
    <MainCard title="Drill Scenario CSV File Headers" secondary="help">
      {!loading ? (
        <Formik
          initialValues={{
            id: headers?.id || '',
            level: headers?.level || '',
            name: headers?.name || '',
            x: headers?.x || '',
            y: headers?.y || '',
            z: headers?.z || '',
            start: headers?.start || '',
            finish: headers?.finish || '',
          }}
          validationSchema={Yup.object().shape({
            id: Yup.string().max(50).required('This is a required field.'),
            level: Yup.string().max(50).required('This is a required field.'),
            name: Yup.string().max(50).required('This is a required field.'),
            x: Yup.string().max(50).required('This is a required field.'),
            y: Yup.string().max(50).required('This is a required field.'),
            z: Yup.string().max(50).required('This is a required field.'),
            start: Yup.string().max(50).required('This is a required field.'),
            finish: Yup.string().max(50).required('This is a required field.'),
          })}
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
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>ID :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-id" value={values.id} name="id" onBlur={handleBlur} onChange={handleChange} />
                      {touched.id && errors.id && (
                        <FormHelperText error id="headers-id-helper">
                          {errors.id}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Level :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField
                        fullWidth
                        id="headers-level"
                        value={values.level}
                        name="level"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.level && errors.level && (
                        <FormHelperText error id="headers-level-helper">
                          {errors.level}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Name :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-name" value={values.name} name="name" onBlur={handleBlur} onChange={handleChange} />
                      {touched.name && errors.name && (
                        <FormHelperText error id="headers-name-helper">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>X :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-x" value={values.x} name="x" onBlur={handleBlur} onChange={handleChange} />
                      {touched.x && errors.x && (
                        <FormHelperText error id="headers-x-helper">
                          {errors.x}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Y :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-y" value={values.y} name="y" onBlur={handleBlur} onChange={handleChange} />
                      {touched.y && errors.y && (
                        <FormHelperText error id="headers-y-helper">
                          {errors.y}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Z :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-z" value={values.z} name="z" onBlur={handleBlur} onChange={handleChange} />
                      {touched.z && errors.z && (
                        <FormHelperText error id="headers-z-helper">
                          {errors.z}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Start :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-start" value={values.start} name="start" onBlur={handleBlur} onChange={handleChange} />
                      {touched.start && errors.start && (
                        <FormHelperText error id="headers-start-helper">
                          {errors.start}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Finish :</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                      <TextField fullWidth id="headers-finish" value={values.finish} name="finish" onBlur={handleBlur} onChange={handleChange} />
                      {touched.finish && errors.finish && (
                        <FormHelperText error id="headers-finish-helper">
                          {errors.finish}
                        </FormHelperText>
                      )}
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

export default DrillScenarioHeadersSettingsForm;
