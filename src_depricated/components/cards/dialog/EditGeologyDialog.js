// material-ui
import { Button, Divider, CardContent, Modal, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| Edit Geology Modal ||============================== //

export default function EditGeologyModal({ open, onClose, data }) {
  const handleSave = () => {
    console.log('Saving data', data);
    //TODO: save data
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <MainCard title="Edit Geology Attributes" modal darkTitle content={false}>
        <CardContent>
          <Typography id="modal-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
        </CardContent>
        <Divider />
        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ px: 2.5, py: 2 }}>
          <Button color="error" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleSave}>
            Save Changes
          </Button>
        </Stack>
      </MainCard>
    </Modal>
  );
}
