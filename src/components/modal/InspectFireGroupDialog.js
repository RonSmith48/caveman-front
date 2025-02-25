import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'components/MainCard';

const InspectionDialog = ({ open, onClose, selectedRow }) => {
  console.log('selectedRow', selectedRow);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: { overflowX: 'hidden' }
      }}
    >
      <DialogTitle>
        Inspection Details
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ overflowX: 'hidden' }}>
        <MainCard title="Aggregated Rings" secondary="Initial Status">
          {selectedRow && (
            <ul>
              {selectedRow.pooled_rings?.rings.map((ring) => (
                <li key={ring.location_id}>{ring.alias}</li>
              ))}
            </ul>
          )}
        </MainCard>
        <MainCard title="Custom Rings from Group">
          <ul>
            {selectedRow.group_rings.map((ring) => (
              <li key={ring.location_id}>
                {ring.alias} - {ring.status}
              </li>
            ))}
          </ul>
        </MainCard>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InspectionDialog;
