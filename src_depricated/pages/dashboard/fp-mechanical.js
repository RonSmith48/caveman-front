// material-ui
import { Typography, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { enqueueSnackbar } from 'notistack';

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardFPMechanical = () => {
  return (
    <MainCard title="Default Dash Card">
      <Typography variant="body2">Fixed plant mechanical dashboard</Typography>
      {/* variants: 'success', 'info', 'warning', 'error' (no variant is default blue) */}
      <Button variant="outlined" onClick={() => enqueueSnackbar('This is warning message', { variant: 'warning' })}>
        My button
      </Button>
    </MainCard>
  );
};

export default DashboardFPMechanical;
