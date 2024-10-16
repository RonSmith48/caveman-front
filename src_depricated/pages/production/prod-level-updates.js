import { useMemo } from 'react';
// material-ui
import { Grid, Alert, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { InfoCircleTwoTone } from '@ant-design/icons';

// project import
import useSWR from 'swr';
import { fetcher } from 'api/axios';
import ProdLevelUpdatesDrilling from 'components/tables/ProdLevelUpdatesDrilling';
//import ProdLevelUpdatesCharging from 'components/tables/ProdLevelUpdatesCharging';
//import ProdLevelUpdatesFiring from 'components/tables/ProdLevelUpdatesFiring';

// ==============================|| REACT TABLE - BASIC ||============================== //

const baseURL = '/api/reports/prodlevelupdates/';

const ProdLevelUpdates = () => {
  const theme = useTheme();
  const { data, isLoading, error, isValidating } = useSWR(baseURL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const plu = useMemo(
    () => ({
      report: data,
      reportLoading: isLoading,
      reportError: error,
      reportValidating: isValidating,
      reportEmpty: !isLoading && !data
    }),
    [data, error, isLoading, isValidating]
  );

  if (plu.reportLoading) return <CircularProgress />;
  if (plu.reportError) return <Alert severity="error">Failed to load data</Alert>;
  if (plu.reportEmpty) return <Alert severity="warning">No data found</Alert>;
  console.log('data:', plu.report.plu);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ marginBottom: '1rem' }}>
        {plu && plu.report.plu.Drilling ? (
          <ProdLevelUpdatesDrilling data={plu.report.plu.Drilling} title={'Drilling'} />
        ) : (
          <Alert color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
            There are no drilling updates
          </Alert>
        )}
      </Grid>

      <Grid item xs={12} style={{ marginBottom: '1rem' }}>
        {plu && plu.Charging ? (
          {
            //<ProdLevelUpdatesCharging data={plu.Charging} />
          }
        ) : (
          <Alert color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
            There are no charging updates
          </Alert>
        )}
      </Grid>

      <Grid item xs={12} style={{ marginBottom: '1rem' }}>
        {plu && plu.Firing ? (
          {
            //<ProdLevelUpdatesFiring data={plu.Firing} />
          }
        ) : (
          <Alert color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
            There are no firing updates
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default ProdLevelUpdates;
