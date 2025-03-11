// material-ui
import Grid from '@mui/material/Grid';

// project imports
import ExplosiveTypes from 'sections/forms/PMDExplosiveTypeSetting';
import RingConditionList from 'sections/forms/PMDConditionsSetting';
import SingleFileUpload from 'components/third-party/dropzone/DupeDropzone';
import DupeFileDateAlert from 'components/alerts/dupeFileDateAlert';

function TabPMD() {
  const headers = {};
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={6}>
        <SingleFileUpload />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <DupeFileDateAlert />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <ExplosiveTypes />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <RingConditionList />
      </Grid>
    </Grid>
  );
}

export default TabPMD;
