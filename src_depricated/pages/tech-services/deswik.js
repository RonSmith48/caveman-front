// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
//import NoUpload from 'components/third-party/dropzone/DeswikDrop';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const DeswikPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <MainCard title="Deswik Ring and Hole Data">{/* <NoUpload /> */}</MainCard>
      </Grid>
      <Grid item xs={6}>
        <MainCard title="Stope Summary">This panel will generate stope summary sheets for your ring designs</MainCard>
      </Grid>
    </Grid>
  );
};

export default DeswikPage;
