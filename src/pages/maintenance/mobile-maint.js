// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from '../../components/MainCard';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const MobileMaintPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard title="On this page">
          <div>
            <ul>
              <li>Drill service day entries</li>
              <li>Scheduled maintenance time</li>
            </ul>
          </div>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default MobileMaintPage;
