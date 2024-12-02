// material-ui
import Grid from '@mui/material/Grid';

// project imports
import DupeUpload from 'sections/forms/PMDDupeUpdateSettings';
import ExplosiveTypes from 'sections/forms/PMDExplosiveTypeSetting';

function TabPMD() {
  const headers = {};
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DupeUpload />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <ExplosiveTypes />
      </Grid>
    </Grid>
  );
}

export default TabPMD;
