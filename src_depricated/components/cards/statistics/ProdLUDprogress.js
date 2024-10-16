// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import LinearWithLabelGreyBg from 'components/@extended/progress/LinearWithLabelGreyBg';
import MainCard from 'components/MainCard';

// ==============================|| LABELLED TASKS ||============================== //

function PLUDProgress() {
  return (
    <Grid item xs={12}>
      <MainCard sx={{ width: '100%' }}>
        <Grid container spacing={1.25}>
          <Grid item xs={5}>
            <Typography>{}</Typography>
          </Grid>
          <Grid item xs={7}>
            <LinearWithLabelGreyBg value={70} />
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
}

export default PLUDProgress;
