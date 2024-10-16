import PropTypes from 'prop-types';

// fetching
import { fetcher } from 'api/axios';
import useSWR from 'swr';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CompassOutlined } from '@ant-design/icons';

import { displayValue } from './DisplayUtils';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#B48031',
  transform: 'rotate(25deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.15'
  }
});

// =============================|| Ring Inspector Widget ||============================= //

const RIWsurveyCard = ({ editable, level, drive, ring }) => {
  const IconPrimary = CompassOutlined;
  const primaryIcon = CompassOutlined ? <IconPrimary fontSize="large" /> : null;
  const baseURL = '/api/widgets/ring-inspector/';

  const {
    data: planning_data,
    error: planning_error,
    isLoading: planning_isLoading
  } = useSWR(`${baseURL}${level}/${drive}/${ring}/planning/`, fetcher);
  const {
    data: survey_data,
    error: survey_error,
    isLoading: survey_isLoading
  } = useSWR(`${baseURL}${level}/${drive}/${ring}/survey/`, fetcher);

  if (survey_error || planning_error) return <div>Error fetching data</div>;
  if (survey_isLoading || planning_isLoading) return <div>Loading...</div>;

  const calc_dist = (planning_data, survey_data) => {
    if (!planning_data || !survey_data) {
      return null; // or handle the case when data is not available
    }

    const { x: x1, y: y1 } = planning_data;
    const { avg_x: x2, avg_y: y2 } = survey_data;

    const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const roundedDist = parseFloat(dist.toFixed(2));

    return roundedDist;
  };

  return (
    <Card elevation={0} sx={{ border: 2, borderColor: '#B48031', background: '#FFF', position: 'relative', color: '#000' }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Grid item xs={11}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Grid item sm={12}>
                <Typography variant="h5" align="center" color="inherit">
                  Survey
                </Typography>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Markup
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Markup for
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.markup_for)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Markup Date
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.markup_date)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Location
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Avg x
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.avg_x)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Avg y
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.avg_y)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Avg z
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.avg_z)} RL
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Dist from conceptual ring
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {calc_dist(planning_data, survey_data)} m
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Hole Data
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        No
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Tram Distances
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        To WOP
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.to_wop)} m
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        To EOP
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(survey_data?.to_eop)} m
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Comments
              </Divider>
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

RIWsurveyCard.propTypes = {
  level: PropTypes.string,
  drive: PropTypes.string,
  ring: PropTypes.string,
  editable: PropTypes.bool
};

export default RIWsurveyCard;
