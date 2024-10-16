import PropTypes from 'prop-types';

// fetching
import { fetcher } from 'api/axios';
import useSWR from 'swr';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ArchitectureOutlined } from '@mui/icons-material';

import { displayValue } from './DisplayUtils';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#E6951B',
  transform: 'rotate(25deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.15'
  }
});

// =============================|| Ring Inspector Widget ||============================= //

const RIWengineeringCard = ({ editable, level, drive, ring }) => {
  const IconPrimary = ArchitectureOutlined;
  const primaryIcon = ArchitectureOutlined ? <IconPrimary fontSize="large" /> : null;
  const baseURL = '/api/widgets/ring-inspector/';

  const { data, error, isLoading } = useSWR(`${baseURL}${level}/${drive}/${ring}/engineering/`, fetcher);

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Card elevation={0} sx={{ border: 2, borderColor: '#E6951B', background: '#FFF', position: 'relative', color: '#000' }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Grid item xs={11}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Grid item sm={12}>
                <Typography variant="h5" align="center" color="inherit">
                  Engineering
                </Typography>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Weights & Measures
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        In Situ Tonnes
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.designed_tonnes)} t
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Draw Percentage
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {parseFloat(data?.draw_percentage || '0') * 100} %
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Draw Deviation
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.draw_deviation)} t
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Drill Design
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Dump
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.dump)} &deg;
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Azimuth
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.azimuth)} &deg;
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Number of Holes
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.holes)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Hole Diameters
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.diameters)} mm
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Drill Meters
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.drill_meters)} m
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Drill Look Direction
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.drill_look_direction)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Designed for
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.designed_to_suit)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Burden
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.burden)} m
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Deswik
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Volume
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.blastsolids_volume)} m<sup>3</sup>
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

RIWengineeringCard.propTypes = {
  level: PropTypes.string,
  drive: PropTypes.string,
  ring: PropTypes.string,
  editable: PropTypes.bool
};

export default RIWengineeringCard;
