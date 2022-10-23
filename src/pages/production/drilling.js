import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../../components/MainCard';
import PDrillActualsTable from '../../components/tables/ProdDrillMtrsTable';
//import DataFetching from '../../components/DataFetching3';

const ProductionDrillPage = () => {
  const [pda, setPda] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('http://localhost:8000/api/reports/dailyactuals/2021-12-28')
        .then((response) => {
          setPda(response.data.pda);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(loading);
  return (
    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>{!loading && <Typography variant="h5">{pda['last monday']}</Typography>}</Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        {!loading && <PDrillActualsTable dates={pda['day month dates']} mtrs={pda.drill_mtrs} />}
      </MainCard>
    </Grid>
  );
};

export default ProductionDrillPage;
