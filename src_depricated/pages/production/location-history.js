// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

const LocationHistory = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard></MainCard>
      </Grid>
    </Grid>
  );
};

export default LocationHistory;
