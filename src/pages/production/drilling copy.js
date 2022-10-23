// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../../components/MainCard';
// import PDrillActualsTable from '../../components/tables/ProdDrillMtrsTable';
import DataFetching from '../../components/DataFetching3';

const ProductionDrillPage = () => {
  return (
    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">EDL203</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <DataFetching />
        {/* <PDrillActualsTable /> */}
      </MainCard>
    </Grid>
  );
};

export default ProductionDrillPage;
