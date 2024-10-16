import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'api/axios';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
//import toast from 'utils/ToastNotistack';
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
  const [pickerDate, setPickerDate] = useState(() => new Date());
  const [pickValue, setPickValue] = useState(() => formatDate(new Date()));
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const fileToUpload = acceptedFiles[0];
      setSelectedFile(fileToUpload);

      try {
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('date', pickValue);

        const response = await axios.post('/api/uploads/dupe/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setProgress(progress);
            if (progress == 100) {
              setUploadComplete(true);
            }
          }
        });
        console.log(response);
        setSelectedFile(null);
        setProgress(0);
        // toast(response.data.msg, { variant: response.data.msg_type });
      } catch (error) {
        console.error('Upload error:', error);
        setSelectedFile(null);
        setProgress(0);
        // toast('Upload failed', { variant: 'error' });
      }
    }
  });

  const handleDateChange = (val) => {
    setPickerDate(val); // whole date
    setPickValue(formatDate(val)); // formatted date for API
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ paddingBottom: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Dupe File Date"
            format="dd/MM/yyyy"
            disableFuture={true}
            value={pickerDate}
            onChange={handleDateChange}
            textField={(params) => <TextField {...params} sx={{ width: '10rem' }} />}
          />
        </LocalizationProvider>
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
