import PropTypes from 'prop-types';
import axios from 'api/axios';
import { useEffect, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// project
import { ReactComponent as weightIcon } from 'assets/images/icons/weight.svg';
import ProdTonnesCalcs from 'components/cards/dialog/ProdTonnesCalcsDialog';
import { displayValue } from './DisplayUtils';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#ECEC49',
  transform: 'rotate(25deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.1'
  }
});

// =============================|| Ring Inspector Widget ||============================= //

const RIWproductionCard = ({ editable, level, drive, ring }) => {
  const IconPrimary = weightIcon;
  const primaryIcon = weightIcon ? <IconPrimary fontSize="large" /> : null;
  const baseURL = '/api/widgets/ring-inspector/';
  const [tabledata, setTabledata] = useState();
  const [openCalcs, setOpenCalcs] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${level}/${drive}/${ring}/production/`);
        setTabledata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchData();
  }, [level, drive, ring]);

  const handleOpenCalcs = () => {
    setOpenCalcs(true);
  };

  const handleCloseCalcs = () => {
    setOpenCalcs(false);
  };

  const handleEdit = () => {};

  return (
    <Card elevation={0} sx={{ border: 2, borderColor: '#ECEC49', background: '#FFF', position: 'relative', color: '#000' }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={7} align="right">
            <Typography variant="h5" color="inherit">
              Production
            </Typography>
          </Grid>
          <Grid item xs={5} justifyContent="flex-end" align="right">
            <Tooltip title="Tonnes Explained" placement="top">
              <IconButton
                aria-label="calc"
                component="label"
                style={{ verticalAlign: 'bottom', paddingBottom: '0.75rem' }}
                onClick={handleOpenCalcs}
              >
                <IconPrimary style={{ fontSize: '1.5rem', color: 'inherit' }} />
              </IconButton>
            </Tooltip>
            {editable ? (
              <Tooltip title="Edit" placement="top">
                <IconButton
                  aria-label="edit"
                  component="label"
                  style={{ verticalAlign: 'bottom', paddingBottom: '0.75rem' }}
                  onClick={handleEdit}
                >
                  <EditOutlinedIcon style={{ fontSize: '1.5rem', color: 'inherit' }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Grid item xs={11}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Actuals
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Tonnes to Bog
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.to_bog)} t
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Bogged Tonnes
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.bogged)} t
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Remaining Tonnes
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="h5" color="secondary">
                        {displayValue(tabledata?.remaining_tonnes)} t
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Charging
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Has Blocked Holes
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.has_blocked_holes)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Detonator Type
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.detonator_type)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Designed kg Emulsion
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.designed_kg_emulsion)} kg
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Holes Recharged
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.holes_recharged)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Bogging Hazards
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Foreign Object
                      </Typography>
                      <Typography align="right" variant="caption" fontStyle="italic">
                        <span style={{ display: 'block', textAlign: 'right' }}>eg. Drill Steel</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(tabledata?.foreign_object)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Divider sx={{ width: '100%' }} textAlign="left">
                Comments
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={2} zeroMinWidth>
                      avatar
                    </Grid>
                    <Grid item xs={10}>
                      <Typography align="left" variant="body1" color="secondary">
                        text
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} container direction="row" justifyContent="flex-end" alignItems="flex-start"></Grid>
        </Grid>
      </CardContent>
      <ProdTonnesCalcs open={openCalcs} onClose={handleCloseCalcs} />
    </Card>
  );
};

RIWproductionCard.propTypes = {
  level: PropTypes.string,
  drive: PropTypes.string,
  ring: PropTypes.string,
  editable: PropTypes.bool
};

export default RIWproductionCard;
