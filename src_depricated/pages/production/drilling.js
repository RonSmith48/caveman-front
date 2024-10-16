import React, { useState, useEffect, useRef } from 'react';
import axios from 'api/axios';
// material-ui
// working version
import { Grid, Button, CircularProgress } from '@mui/material';

import MainCard from 'components/MainCard';
//import PDrillActualsTable from 'components/tables/ProdDrillMtrsTable';

const baseURL = '/api/reports/dailyactuals/';

const ProductionDrillPage = () => {
  const [pda, setPda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [button_date, setButtonDate] = useState(0);
  // Disables the next week button when next week monday reached
  const disabledDate = useRef(null);
  const [nextDisabled, setNextDisabled] = useState(true);

  const prevButton = () => {
    setButtonDate(pda['last monday']);
    setLoading(true);
  };
  const nextButton = () => {
    setButtonDate(pda['next monday']);
    setLoading(true);
  };
  const isLoading = () => {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  };

  useEffect(() => {
    axios
      .get(baseURL + button_date)
      .then((response) => {
        setPda(response.data.pda);
        if (!disabledDate.current) {
          disabledDate.current = response.data.pda['next monday'];
        } else {
          if (disabledDate.current == response.data.pda['next monday']) {
            setNextDisabled(true);
          } else {
            setNextDisabled(false);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [button_date, nextDisabled]);

  // comment: startIcon={<NavigateBefore />}  endIcon={<NavigateNext />}
  const prevNext = () => {
    let navbuttons = [];
    navbuttons.push(
      <>
        <Grid item>
          <Button variant="outlined" onClick={prevButton}>
            Previous Week
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={nextButton} disabled={nextDisabled}>
            Next Week
          </Button>
        </Grid>
      </>
    );
    return navbuttons;
  };
  return (
    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        {!loading && !pda['message'] && prevNext()}
      </Grid>
      <MainCard sx={{ mt: 2, textAlign: 'center' }} content={false}>
        {!loading ? (
          pda['message'] ? (
            <div style={{ fontSize: '2rem' }}>{pda['message']}</div>
          ) : (
            //<PDrillActualsTable data={pda} />
            <Grid></Grid>
          )
        ) : (
          isLoading()
        )}
      </MainCard>
    </Grid>
  );
};

export default ProductionDrillPage;
