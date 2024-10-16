import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Grid, Stack, TableCell, TableRow, Typography, CircularProgress } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ProdRingsDrillDesMarked from 'components/tables/ProdRingsDrillDesMarked';
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';
import PLUDProgress from 'components/cards/statistics/ProdLUDprogress';
import ProdDrillMPOH from 'components/cards/statistics/ProdDrillMPOH';
import axiosServices from 'utils/axios';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const ExpandingUserDetail = ({ data }) => {
  const [loadingAllocateData, setLoadingAllocateData] = useState(true);
  const [allocateData, setAllocateData] = useState();
  const theme = useTheme();
  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  useEffect(() => {
    const getAllocateData = async (timestamp) => {
      const apiUrl = `/api/widgets/plud-allocate/${timestamp}`;
      try {
        const response = await axiosServices.get(apiUrl);
        const allocate_data = response.data;

        setAllocateData(allocate_data);
        setLoadingAllocateData(false);
      } catch (err) {
        console.log(err);
      }
    };
    // cutting timezone info as the plus symbol will cause problems in the url
    const ts = data.eventdatetime.slice(0, -6);
    getAllocateData(ts);
  }, [data.eventdatetime]);

  //let color = percentage > 45 ? 'warning' : 'primary';

  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={10} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 8 } }}>
          <Grid item xs={12} sm={6} md={6} xl={6.5}>
            {loadingAllocateData ? (
              <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            ) : (
              allocateData && <ProdRingsDrillDesMarked data={allocateData} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={5}>
            <Stack spacing={2.5}>
              <MainCard title="Progress & Performance" secondary="Huh?">
                <PLUDProgress />
                {data.meascode === 'MetresDrilledProd' && (
                  <AnalyticsDataCard title="Meters Drilled / Operating Hour" count="20.3" percentage={1.5} isLoss={false} color="primary">
                    <ProdDrillMPOH />
                  </AnalyticsDataCard>
                )}
              </MainCard>
              <MainCard title="Operator">
                <Typography>{data.operator_description}</Typography>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

ExpandingUserDetail.propTypes = {
  data: PropTypes.any
};

export default ExpandingUserDetail;
