import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, Grid, Divider } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';

// assets
import { CloseOutlined } from '@ant-design/icons';

// ==============================|| Production Tonnes - How they are derived ||============================== //

function ProdTonnesCalcs({ onClose, selectedValue, open }) {
  const theme = useTheme();

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Grid item>
          <DialogTitle>How Production Tonnes Are Derived</DialogTitle>
        </Grid>
        <Grid item sx={{ mr: 1.5 }}>
          <IconButton color="secondary" onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs sx={{ padding: 4 }}>
          <p>
            (In Situ Tonnes x Draw Percentage)
            <br />
            + Draw Deviation
            <br />+ Overdraw Amount
            <br />
            <b>= Tonnes to Bog</b>
          </p>
        </Grid>
        <Divider orientation="vertical" flexItem>
          OR
        </Divider>
        <Grid item xs sx={{ padding: 4 }}>
          <p>
            (Flow Tonnes x Draw Percentage)
            <br />
            + Draw Deviation
            <br />+ Overdraw Amount
            <br />
            <b>= Tonnes to Bog</b>
          </p>
        </Grid>
      </Grid>
      <Grid sx={{ padding: 4 }}>
        <h4>In Situ Tonnes vs Flow Tonnes</h4>
        <p>
          In situ tonnes is the estimated weight of what was fired in the ring. Flow tonnes takes into account ore that has been left from
          rings above. Flow tonnes are in effect when there are 3 or more levels above.
        </p>
        <p>
          We must use one method or the other for each ring. Either the In situ tonnes or the Flow tonnes must be set to zero, otherwise the
          Tonnes to Bog amount will be incorrect!
        </p>
      </Grid>
    </Dialog>
  );
}

ProdTonnesCalcs.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default ProdTonnesCalcs;
