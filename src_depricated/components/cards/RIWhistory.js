import PropTypes from 'prop-types';

// fetching
import { fetcher } from 'api/axios';
import useSWR from 'swr';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { HistoryOutlined } from '@mui/icons-material';

import { displayValue } from './DisplayUtils';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#919127',
  transform: 'rotate(25deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.15'
  }
});

// =============================|| Ring Inspector Widget ||============================= //

const RIWhistoryCard = ({ editable, level, drive, ring }) => {
  const IconPrimary = HistoryOutlined;
  const primaryIcon = HistoryOutlined ? <IconPrimary fontSize="large" /> : null;
  const baseURL = '/api/widgets/ring-inspector/';

  const { data, error, isLoading } = useSWR(`${baseURL}${level}/${drive}/${ring}/history/`, fetcher);

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Card elevation={0} sx={{ border: 2, borderColor: '#919127', background: '#FFF', position: 'relative', color: '#000' }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Grid item xs={11}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Grid item sm={12}>
                <Typography variant="h5" align="center" color="inherit">
                  History
                </Typography>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Status
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography align="left" variant="body1" color="secondary">
                        {data?.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Milestones
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Designed
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.design_date)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.designer)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Drilling Complete
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.drill_complete_date)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.drillers)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Charged On
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.charge_date)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.chargers)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Fire by
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.fireby_date)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Fired
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.fired_shift)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Completion Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.bog_complete)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} container justifyContent="flex-end" alignItems="flex-start">
            {editable ? (
              <Tooltip title="Edit" placement="top">
                <IconButton
                  aria-label="edit"
                  component="label"
                  style={{ verticalAlign: 'bottom', paddingBottom: '0.75rem' }}
                  //onClick={handleEdit}
                >
                  <EditOutlinedIcon style={{ fontSize: '1.5rem', color: 'inherit' }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RIWhistoryCard.propTypes = {
  level: PropTypes.string,
  drive: PropTypes.string,
  ring: PropTypes.string,
  editable: PropTypes.bool
};

export default RIWhistoryCard;
