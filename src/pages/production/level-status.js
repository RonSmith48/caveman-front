import { useMemo } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project import
import BasicTable from '../../components/tables/p-level-status-table';
import makeData from '../../data/react-table';

// ==============================|| REACT TABLE - BASIC ||============================== //

const Basic = () => {
  const data = useMemo(() => makeData(20), []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BasicTable title="Level:" data={data.slice(0, 9)} />
      </Grid>
      <Grid item xs={12}>
        <BasicTable title="Level:" data={data.slice(10, 19)} />
      </Grid>
      <Grid item xs={12}>
        <BasicTable title="Level:" data={data.slice(20, 29)} />
      </Grid>
    </Grid>
  );
};

export default Basic;
