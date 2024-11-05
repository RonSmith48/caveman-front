import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import axiosServices from 'utils/axios';

// material-ui
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';

// third-party
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { enqueueSnackbar } from 'notistack';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { fetcher } from 'utils/axios';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

const SingleFileUpload = ({ error, file, sx }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [expectedHeaders, setExpectedHeaders] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const fetchRun = useRef(false);

  const fetchHeadersFromSettings = async () => {
    if (fetchRun.current) return; // Prevent double fetch
    fetchRun.current = true;

    try {
      const data = await fetcher('/settings/drill_scenario_file_headers');
      if (data && data.value) {
        // Set the values of the headers from the JSON object
        setExpectedHeaders(data.value);
      }
    } catch (error) {
      enqueueSnackbar('Ensure that you set csv headers before upload', {variant: 'info'});
    }
  };

  // Fetch settings on component mount
  useEffect(() => {
    fetchHeadersFromSettings();
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const onDrop = (acceptedFiles) => {
    if (!expectedHeaders || Object.keys(expectedHeaders).length === 0) {
      enqueueSnackbar('Upload not allowed: No CSV headers found in settings', { variant: 'error' });
      return; // Prevent upload if settings are empty
    }
    const fileToUpload = acceptedFiles[0];
    setSelectedFile(fileToUpload);

    Papa.parse(fileToUpload, {
      complete: (result) => {
        let errors = [];

        // FILE VALIDATION
        const headers = result.data.length > 0 ? Object.keys(result.data[0]) : [];
        const expectedUserHeaders = Object.values(expectedHeaders);
        const missingHeaders = expectedUserHeaders.filter((header) => !headers.includes(header));

        if (missingHeaders.length > 0) {
          errors.push(
            `The file headers do not match the expected headers. Un-matched headers: ${missingHeaders.join(', ')}. Fix column header name(s) and try again.`
          );
        } else {
          // drive
          result.data.forEach((row, index) => {
            const driveRaw = row[expectedHeaders['drive']]?.trim();
            const driveValue = parseInt(driveRaw, 10);

            // id
            if (!isNaN(driveValue)) {
              if (row[expectedHeaders['id']]?.trim().length === 0) {
                errors.push(`Row ${index + 2}: ID field cannot be blank.`);
              } else if (row[expectedHeaders['id']]?.trim().length > 30) {
                errors.push(`Row ${index + 2}: ID field exceeds maximum length.`);
              } else if (row[expectedHeaders['id']]?.length < 20) {
                enqueueSnackbar(`Row ${index + 2}: ID field could be incorrectly formed.`, { variant: 'warning' });
              }

              // level
              const levelRaw = row[expectedHeaders['level']]?.trim();
              const levelValue = parseInt(levelRaw, 10);
              if (Number.isNaN(levelValue) || levelValue.toString() !== levelRaw) {
                errors.push(`Row ${index + 2}: Level must be an integer.`);
              }

              // name
              if (row[expectedHeaders['name']]?.trim().length === 0) {
                errors.push(`Row ${index + 2}: Name field cannot be blank.`);
              }

              // x
              const xptValue = parseFloat(row[expectedHeaders['x']]?.trim());
              if (Number.isNaN(xptValue)) {
                errors.push(`Row ${index + 2}: X must be a number.`);
              }

              // y
              const yptValue = parseFloat(row[expectedHeaders['y']]?.trim());
              if (Number.isNaN(yptValue)) {
                errors.push(`Row ${index + 2}: Y must be a number.`);
              }

              // z
              const zptValue = parseFloat(row[expectedHeaders['z']]?.trim());
              if (Number.isNaN(zptValue)) {
                errors.push(`Row ${index + 2}: Z must be a number.`);
              }
            }
          });
        }

        if (errors.length > 0) {
          setSelectedFile(null);
          setDialogMsg(errors.join('\n'));
          setDialogOpen(true);
          return;
        }
        proceedWithFileUpload(fileToUpload);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        enqueueSnackbar('Error parsing CSV file', { variant: 'error' });
        setSelectedFile(null);
      },
      skipEmptyLines: true,
      header: true
    });
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false,
    onDrop
  });

  const proceedWithFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosServices.post('/whatif/drilling/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(progress);
          if (progress === 100) {
            setUploadComplete(true);
          }
        }
      });

      setSelectedFile(null);
      setProgress(0);
      enqueueSnackbar(response.data.msg.body, { variant: response.data.msg.type });
    } catch (error) {
      console.error('Upload error:', error);
      setSelectedFile(null);
      setProgress(0);
      enqueueSnackbar('Upload failed', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
    <Box sx={{ paddingBottom: '10px' }}>
    <TextField id="scenario-name" label="Scenario Name (Optional)" variant="outlined" />
      </Box>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && {
            padding: '12% 0'
          })
        }}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div>
            {uploadComplete ? (
              <div>
                Processing
                <LinearProgress />
              </div>
            ) : (
              <div>
                Uploading {selectedFile.name}
                <LinearWithLabel variant="determinate" value={progress} />
              </div>
            )}
          </div>
        ) : (
          <PlaceholderContent />
        )}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: '1px solid {theme.palette.divider}' }}
        >
          <Grid item>
            <DialogTitle>YOUR FILE HAS AN ERROR</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={handleCloseDialog}>
              <CloseOutlined />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent>
          <DialogContentText>
            {dialogMsg.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line} <br />
              </React.Fragment>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

SingleFileUpload.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.array,
  setFieldValue: PropTypes.func,
  sx: PropTypes.object
};

export default SingleFileUpload;
