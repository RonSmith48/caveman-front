'use client';

import React, { useState } from 'react';
// material-ui
import {
  Grid,
  Alert,
  AlertTitle,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { WarningFilled } from '@ant-design/icons';

// third party
import { Formik } from 'formik';

// project imports
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/DrillingScenarioDropzone';
import DrillScenarioHeadersSettingsForm from 'sections/forms/DrillScenarioHeadersSettingsForm';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const ScheduleUploadPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLearnMoreClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {/* Form Section */}
      <Grid item xs={12} md={4}>

          <Box sx={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Drilling Scenario Comparator</Typography>
          <Grid>
          <Alert color="warning" variant="border" icon={<WarningFilled />}>
            <AlertTitle variant="h5">ABOUT YOUR SCHEDULE FILE</AlertTitle>
            Your file must be of CSV type and requires the headers named exactly to work. Your file may contain other headers, but they will
            be ignored.
            <Link href="#" onClick={() => handleLearnMoreClick('paper')} sx={{ mr: 1, ml: 1, mb: 1, mt: 1 }}>
              Learn more
            </Link>
          </Alert>
        </Grid>
        <Grid>
        <MainCard>
          <SingleFileUpload />
        </MainCard>
        </Grid>
        <Grid item sx={{ mt: 2 }}>
            <DrillScenarioHeadersSettingsForm />
          </Grid>
            </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
  

          </TableContainer>
        </Grid>
      </Grid>
  );
};

export default ScheduleUploadPage;
