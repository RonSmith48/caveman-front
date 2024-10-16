// material-ui
import Grid from '@mui/material/Grid';

// project imports
import IPGeneralSettingsForm from 'sections/forms/IPGeneralSettings';
import FMFileHeadersSettingsForm from 'sections/forms/FMFileHeadersSettingsForm';
import MainCard from 'components/MainCard';

function FMUpdateUpload() {
  const headers = {};
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <IPGeneralSettingsForm />
      </Grid>
      <Grid item xs={12}>
        <FMFileHeadersSettingsForm />
      </Grid>
    </Grid>
  );
}

export default FMUpdateUpload;
