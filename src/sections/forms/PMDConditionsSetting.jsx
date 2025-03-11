'use client';

import React, { useState, useEffect } from 'react';

// Material-UI
import {
  Box,
  Grid,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Third-party
import { Formik } from 'formik';
import { enqueueSnackbar } from 'notistack';

// Project imports
import MainCard from 'components/MainCard';
import { fetcher, fetcherPost, fetcherPatch } from 'utils/axios';

function RingConditionList() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [states, setStates] = useState([]); // Store all ring states
  const [selectedPriState, setSelectedPriState] = useState(''); // Selected primary state
  const [secStates, setSecStates] = useState([]);

  const fetchSettings = async () => {
    try {
      const data = await fetcher('/settings/ring-conditions-list/');
      if (data) {
        setSettings(data.data.value || []);
      } else {
        setSettings([]);
        setIsNew(true);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setSettings([]);
      setIsNew(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatesList = async () => {
    try {
      const statesData = await fetcher('/prod_actual/ring-states/');
      if (statesData) {
        setStates(statesData);
      }
    } catch (error) {
      console.error('Error fetching states list:', error);
    }
  };

  const saveSettings = async (values) => {
    const payload = {
      key: 'ring-conditions-list',
      value: values
    };

    try {
      if (isNew) {
        await fetcherPost('/settings/', payload);
        enqueueSnackbar('Ring conditions list created', { variant: 'success' });
      } else {
        await fetcherPatch('/settings/ring-conditions-list/', payload);
        enqueueSnackbar('Ring conditions list settings updated', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      enqueueSnackbar('Error saving setting', { variant: 'error' });
    }
  };

  const addItem = () => {
    if (newItem.trim()) {
      setSettings((prev) => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    setSettings((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchSettings();
    fetchStatesList();
  }, []);

  useEffect(() => {
    if (selectedPriState) {
      const filteredSecStates = states.filter((state) => state.pri_state === selectedPriState);
      setSecStates(filteredSecStates);
    } else {
      setSecStates([]);
    }
  }, [selectedPriState, states]);

  return (
    <MainCard title="Ring Conditions" secondary="Help">
      {!loading ? (
        <Formik
          enableReinitialize
          initialValues={{ explosiveTypes: settings }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            saveSettings(values.explosiveTypes).finally(() => setSubmitting(false));
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Form Section */}
                <Grid item xs={12} md={5}>
                  <Stack spacing={2}>
                    <Select fullWidth value={selectedPriState} onChange={(e) => setSelectedPriState(e.target.value)} displayEmpty>
                      <MenuItem value="" disabled>
                        Select Primary State
                      </MenuItem>
                      {Array.from(new Set(states.map((state) => state.pri_state))).map((priState, index) => (
                        <MenuItem key={index} value={priState}>
                          {priState}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField fullWidth label="New Ring Condition" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                    <Button variant="contained" onClick={addItem} disabled={!newItem.trim()}>
                      Add
                    </Button>
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" disabled={isSubmitting || settings.length === 0}>
                      Save
                    </Button>
                  </Stack>
                </Grid>

                {/* Table Section */}
                <Grid item xs={12} md={7}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Condition</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>Actions</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {settings.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item}</TableCell>
                            <TableCell align="right">
                              <IconButton edge="end" onClick={() => removeItem(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      ) : (
        <CircularProgress />
      )}
    </MainCard>
  );
}

export default RingConditionList;
