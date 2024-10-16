// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from '../../components/MainCard';
import BasicTabs from './SettingsTabPanel';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const SettingsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <MainCard>
          <BasicTabs />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
