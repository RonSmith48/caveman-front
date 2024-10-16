import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'api/axios';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, Dialog, DialogContent, DialogTitle, DialogContentText, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';

// third-party
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import { enqueueSnackbar } from 'notistack';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

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

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const onDrop = (acceptedFiles) => {
    const fileToUpload = acceptedFiles[0];
    setSelectedFile(fileToUpload);

    Papa.parse(fileToUpload, {
      complete: (result) => {
        let errors = [];
        // Validate CSV file headers and structure
        const expectedHeaders = [
          'ID',
          'LEVEL',
          'HEADING',
          'DRIVE',
          'Name',
          'LOC',
          'X',
          'Y',
          'Z',
          'PGCA_Modelled Tonnes',
          'DRAW_ZONE',
          'Density',
          'PGCA_Modelled Au',
          'PGCA_Modelled Cu'
        ];

        // FILE VALIDATION
        const headers = result.data.length > 0 ? Object.keys(result.data[0]) : [];
        const headerCheck = expectedHeaders.every((header) => headers.includes(header));
        if (!headerCheck) {
          errors.push('The file headers do not match the expected headers.  Fix column header name(s) and try again.');
        } else {
          result.data.forEach((row, index) => {
            const driveRaw = row['DRIVE'].trim();
            const driveValue = parseInt(driveRaw, 10);
            if (!isNaN(driveValue)) {
              if (row['ID'].trim().length == 0) {
                errors.push(`Row ${index + 2}: ID field cannot be blank.`);
              } else if (row['ID'].trim().length > 30) {
                errors.push(`Row ${index + 2}: ID field exceeds maximum length.`);
              } else if (row['ID'].length < 20) {
                enqueueSnackbar(`Row ${index + 2}: ID field could be incorrectly formed.`, { variant: 'warning' });
              }

              const levelRaw = row['LEVEL'].trim();
              const levelValue = parseInt(levelRaw, 10);
              if (Number.isNaN(levelValue) || levelValue.toString() !== levelRaw) {
                errors.push(`Row ${index + 2}: Level must be an integer.`);
              }

              if (row['Name'].trim().length == 0) {
                errors.push(`Row ${index + 2}: Name field cannot be blank.`);
              }

              const driveRaw = row['DRIVE'].trim();
              const driveValue = parseInt(driveRaw, 10);
              if (driveValue < 100 && row['LOC'].trim().length != 2) {
                errors.push(`Row ${index + 2}: Loc field must be exactly 2 characters long.`);
              }

              const xptRaw = row['X'].trim();
              const xptValue = parseFloat(xptRaw);
              if (Number.isNaN(xptValue)) {
                errors.push(`Row ${index + 2}: X must be a number.`);
              }

              const yptRaw = row['Y'].trim();
              const yptValue = parseFloat(yptRaw);
              if (Number.isNaN(yptValue)) {
                errors.push(`Row ${index + 2}: Y must be a number.`);
              }

              const zptRaw = row['Z'].trim();
              const zptValue = parseFloat(zptRaw);
              if (Number.isNaN(zptValue)) {
                errors.push(`Row ${index + 2}: Z must be a number.`);
              }

              const densityValue = parseFloat(row['Density']);
              if (densityValue >= 5.0 || densityValue >= 5.0) {
                errors.push(`Row ${index + 2}: Rock density out of range (SG between 1 and 5).`);
              } else if (isNaN(densityValue)) {
                errors.push(`Row ${index + 2}: Density value is not a number. Delete row or use 0, not blank.`);
              }

              const tonnesValue = parseFloat(row['PGCA_Modelled Tonnes']);
              if (tonnesValue >= 100000) {
                errors.push(`Row ${index + 2}: PGCA Modelled Tonnes over 99999.99 tonnes.`);
              } else if (tonnesValue > 10000) {
                enqueueSnackbar(`Row ${index + 2}: PGCA Modelled Tonnes greater than 10,000 tonnes`, { variant: 'warning' });
              } else if (isNaN(tonnesValue)) {
                errors.push(`Row ${index + 2}: PGCA Modelled Tonnes value is not a number. Delete row or use 0, not blank.`);
              }

              const auGrade = parseFloat(row['PGCA_Modelled Au']);
              if (auGrade >= 100) {
                errors.push(`Row ${index + 2}: Modelled Au over 100g/tonne.`);
              } else if (auGrade > 10) {
                enqueueSnackbar(`Row ${index + 2}: Modelled Au over 10g/tonne.`, { variant: 'warning' });
              } else if (isNaN(auGrade)) {
                errors.push(`Row ${index + 2}: Au value is not a number. Delete row or use 0, not blank.`);
              }

              const cuGrade = parseFloat(row['PGCA_Modelled Cu']);
              if (cuGrade >= 100) {
                errors.push(`Row ${index + 2}: Modelled Cu over 100%.`);
              } else if (cuGrade > 10) {
                enqueueSnackbar(`Row ${index + 2}: Modelled Cu over 10%`, { variant: 'warning' });
              } else if (isNaN(cuGrade)) {
                errors.push(`Row ${index + 2}: Cu value is not a number. Delete row or use 0, not blank.`);
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
      const response = await axios.post('/api/uploads/concept-rings/', formData, {
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

      console.log(response); //=============
      setSelectedFile(null);
      setProgress(0);
      enqueueSnackbar(response.data.msg, { variant: response.data.msg_type });
    } catch (error) {
      console.error('Upload error:', error);
      setSelectedFile(null);
      setProgress(0);
      enqueueSnackbar('Upload failed', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
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
