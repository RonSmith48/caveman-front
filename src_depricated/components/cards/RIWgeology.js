import PropTypes from 'prop-types';
import { useState } from 'react';

// fetching
import { fetcher } from 'api/axios';
import useSWR from 'swr';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { GoldFilled } from '@ant-design/icons';
// project
import EditGeologyModal from './dialog/EditGeologyDialog';
import { displayValue } from './DisplayUtils';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#E8C133',
  transform: 'rotate(5deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.1'
  }
});

// =============================|| Ring Inspector Widget ||============================= //

const RIWgeologyCard = ({ editable, level, drive, ring }) => {
  const IconPrimary = GoldFilled;
  const primaryIcon = GoldFilled ? <IconPrimary fontSize="large" /> : null;
  const baseURL = '/api/widgets/ring-inspector/';
  const [openModal, setOpenModal] = useState(false);

  const { data, error, isLoading } = useSWR(`${baseURL}${level}/${drive}/${ring}/geology/`, fetcher);

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card elevation={0} sx={{ border: 2, borderColor: '#E8C133', background: '#FFF', position: 'relative', color: '#000' }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Grid item xs={11}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Grid item sm={12}>
                <Typography variant="h5" align="center" color="inherit">
                  Geology
                </Typography>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Minerals
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        (Pyrite) FeS<sub>2</sub>&nbsp;&gt;20%
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.has_pyrite)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Hydrology
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Ring in Water Zone
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.in_water_zone)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Ring Making Water
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.making_water)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Geo Control
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Ring in Overdraw Zone
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.in_overdraw_zone)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Overdraw Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.overdraw_amount)} t
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ width: '100%' }} textAlign="left">
                Actions
              </Divider>
              <Grid container spacing={1}>
                <Grid item xs={12} zeroMinWidth>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={7} zeroMinWidth>
                      <Typography align="right" variant="body1">
                        Dome entry
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="left" variant="body1" color="secondary">
                        {displayValue(data?.dome_entry)}
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
                  onClick={handleEdit}
                >
                  <EditOutlinedIcon style={{ fontSize: '1.5rem', color: 'inherit' }} />
                </IconButton>
              </Tooltip>
            ) : null}
            <EditGeologyModal open={openModal} onClose={handleCloseModal} data={data} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RIWgeologyCard.propTypes = {
  level: PropTypes.string,
  drive: PropTypes.string,
  ring: PropTypes.string,
  editable: PropTypes.bool
};

export default RIWgeologyCard;
