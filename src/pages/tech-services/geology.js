// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from '../../components/MainCard';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const GeologyPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard title="On this page">
          <div>
            <ul>
              <li>Information for Geology about expected inspections</li>
              <li>Where the cave goes into overdraw</li>
              <li>sleepers</li>
            </ul>
          </div>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default GeologyPage;
