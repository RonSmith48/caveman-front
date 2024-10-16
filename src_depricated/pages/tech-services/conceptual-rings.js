import React, { useState } from 'react';
// material-ui
import {
  Grid,
  Alert,
  AlertTitle,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { WarningFilled } from '@ant-design/icons';

// project imports
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/ConceptRingDrop';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const ConceptualRingsUploadPage = () => {
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
        <Typography variant="h3">Flow Model Link File Dropzone</Typography>
        <br />
        <MainCard>
          <SingleFileUpload />
        </MainCard>
      </Grid>
      <Grid item xs={6}>
        <Grid>
          <Alert color="warning" variant="border" icon={<WarningFilled />}>
            <AlertTitle variant="h5">ABOUT YOUR FLOW MODEL LINK FILE</AlertTitle>
            <p>
              Your file must be of CSV type and requires the headers named exactly as below to work. Your file may contain other headers,
              but they will be ignored.
              <br />
              <ul>
                <li>ID eg. 1175_OREDRV_20_NE_O_b19e7f2b</li>
                <li>LEVEL</li>
                <li>HEADING eg. OREDRV</li>
                <li>DRIVE</li>
                <li>Name eg. 1175__OREDRV_20_NE_O</li>
                <li>LOC</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
                <li>PGCA_Modelled Tonnes</li>
                <li>DRAW_ZONE</li>
                <li>Density</li>
                <li>PGCA_Modelled Au</li>
                <li>PGCA_Modelled Cu</li>
              </ul>
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
                <DialogTitle>Flow Model Link File Dropzone</DialogTitle>
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

export default ConceptualRingsUploadPage;
