import React, { useState } from 'react';
// material-ui
import { Grid, Alert, AlertTitle, Link, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { WarningFilled } from '@ant-design/icons';

// project imports
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/DupeDropzone';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const DupeUploadPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLearnMoreClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard>
          <SingleFileUpload />
        </MainCard>
      </Grid>
      <Grid item xs={6}>
        <Grid>
          <Alert color="warning" variant="border" icon={<WarningFilled />}>
            <AlertTitle variant="h5">SET THE DUPE FILE DATE FIRST</AlertTitle>
            <p>
              As soon as you drop the Dupe.csv file, it will upload using the <b>Dupe File Date</b>
              <br />
              as the reference date.
            </p>
            <p>
              <Link href="#" onClick={() => handleLearnMoreClick('paper')} sx={{ mr: 1, ml: 1, mb: 1, mt: 1 }}>
                Learn more
              </Link>
            </p>
          </Alert>
        </Grid>
        <Grid>
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
              <Grid item>
                <DialogTitle>PMD Dupe Dropzone</DialogTitle>
              </Grid>
              <Grid item sx={{ mr: 1.5 }}>
                <IconButton color="secondary" onClick={handleCloseDialog}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
            </Grid>
            <DialogContent dividers>
              <DialogContentText>What it does and how it works goes here.</DialogContentText>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DupeUploadPage;
