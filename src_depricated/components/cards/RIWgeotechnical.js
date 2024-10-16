import PropTypes from 'prop-types';
import axios from 'api/axios';
import { useEffect, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { ReactComponent as stoneWallIcon } from 'assets/images/icons/stone-wall.svg';
import { displayValue } from './DisplayUtils';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#A8A8A8',
  transform: 'rotate(25deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.1'
  }
});

// =============================|| Ring Inspector Widget ||============================= //

const RIWgeotechnicalCard = ({ editable, level, drive, ring }) => {
  const IconPrimary = stoneWallIcon;
  const primaryIcon = stoneWallIcon ? <IconPrimary fontSize="large" /> : null;
  const baseURL = '/api/widgets/ring-inspector/';
  const [tabledata, setTabledata] = useState();

  useEffect(() => {
    // Fetch levels data on component mount
    axios
      .get(baseURL + level + '/' + drive + '/' + ring + '/geotechnical/')
      .then((response) => {
        setTabledata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching levels:', error);
      });
  }, [level, drive, ring]);

  return (
    <Card elevation={0} sx={{ border: 2, borderColor: '#A8A8A8', background: '#FFF', position: 'relative', color: '#000' }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Grid item xs={11}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Grid item sm={12}>
                <Typography variant="h5" align="center" color="inherit">
                  Geotechnical
                </Typography>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Ground Support
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Cable Bolted
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.cable_bolted)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Area Rehab
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.area_rehab)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Driller Hazards
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Ungrouted Diamond <br />
                        Drill Holes
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.ungrouted_ddh)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Fault
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.fault)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Within 15m of void
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.prox_to_void)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Driller Reports
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Redrilled
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.redrilled)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Broken Ground (BG)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.bg_report)}
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

RIWgeotechnicalCard.propTypes = {
  level: PropTypes.string,
  drive: PropTypes.string,
  ring: PropTypes.string,
  editable: PropTypes.bool
};

export default RIWgeotechnicalCard;
