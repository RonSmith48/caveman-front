// material-ui
import { Grid } from '@mui/material';

// project imports
import OrphanedRingsTable from 'components/tables/OrphanedRings';

const OrphanedRingsPage = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <OrphanedRingsTable />
      </Grid>
    </Grid>
  );
};

export default OrphanedRingsPage;
